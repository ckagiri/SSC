import R from 'ramda';
import _ from 'lodash';
import { ObjectId } from 'mongodb';
import pluralize from 'pluralize';
import { BadRequest } from '@feathersjs/errors';
import {
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLID,
  GraphQLEnumType,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLObjectType,
  GraphQLInterfaceType,
  GraphQLNonNull,
  GraphQLScalarType,
} from 'graphql';
import { GraphQLDate, GraphQLTime, GraphQLDateTime } from 'graphql-iso-date';
import GraphQLJSON from 'graphql-type-json';
import {
  nodeDefinitions,
  globalIdField,
  fromGlobalId,
  connectionArgs,
  connectionDefinitions,
  // connectionFromPromisedArray,
  mutationWithClientMutationId,
} from 'graphql-relay';

import { connection } from './connection';
// eslint-disable-next-line
import { makeDebug, log } from '../../bin/helpers';

const debug = makeDebug('graphql:type');
const isEmpty = o => R.or(R.isNil(o), R.isEmpty(o));
const notEmpty = R.complement(isEmpty);

const getScalar = name => {
  switch (name.toLowerCase()) {
    case 'string':
    case 'text':
      return GraphQLString;
    case 'boolean':
      return GraphQLBoolean;
    case 'int':
      return GraphQLInt;
    case 'float':
    case 'number':
      return GraphQLFloat;
    case 'date':
      return GraphQLDate;
    case 'time':
      return GraphQLTime;
    case 'datetime':
      return GraphQLDateTime;
    case 'objectid':
    case 'id':
      return GraphQLID;
    default:
      return null;
  }
};
export default ({ models = {}, enums = {} }) => {
  // Generate enums values
  const types = {};

  const getModel = name => models && models[_.lowerFirst(name)];
  const isPersistentModel = model => model && model.persistent;
  const isEnumValue = (typeName, value) =>
    R.any(
      R.pipe(
        R.prop('value'),
        R.equals(value),
      ),
    )(enums[_.lowerFirst(typeName)].values);

  const getReferValue = typeName => value =>
    getModel(typeName)
      .model.get(value)
      .then(data => data && value)
      .catch(e => {
        debug(e);
        throw new BadRequest(`${value} is not a valid value for ${_.lowerFirst(typeName)}`, {
          errors: {
            message: `${value} is not a valid value`,
          },
        });
      });

  const { nodeInterface, nodeField } = nodeDefinitions(
    async (globalId, context) => {
      let { type } = fromGlobalId(globalId);
      const { id } = fromGlobalId(globalId);
      const model = getModel(type);
      if (!model) return null;
      let data = (await getModel(type).model.get(id)) || {};
      if (model.getType) {
        type = model.getType(data);
      }
      data = getModel(type).fromData(data, context);
      data._type = type; // eslint-disable-line
      return data;
    },
    obj => (obj._type ? types.base[_.upperFirst(obj._type)] : null),
  );

  const getType = (name, kind = 'base') => {
    switch (kind) {
      case 'filter':
      case 'sort':
      case 'connection':
      case 'query':
      case 'mutation':
      case 'refer':
      case 'list':
      case 'enums':
        return generateType(name, kind); //eslint-disable-line
      case 'base':
      case 'update':
      case 'input':
        return (
          getScalar(name) ||
          generateType(name, kind) || //eslint-disable-line
          GraphQLJSON
        );
      default:
        return null;
    }
  };

  const getInputType = name => getType(name, 'input');
  const getUpdateType = name => getType(name, 'update');
  const getFilterType = name => getType(name, 'filter');
  const getSortType = name => getType(name, 'sort');
  const getConnectionType = name => getType(name, 'connection');
  const getEnumType = name => getType(name, 'enums');
  const getReferredType = name => getType(name, 'refer');
  const getListType = name => getType(name, 'list');
  // const getQueryType = name => getType(name, 'query');
  // const getMutationType = name => getType(name, 'mutation');

  const generateType = (name, kind = 'base', property) => {
    // eslint disable no-use-before-define
    const generators = {
      base: getBaseFields, // eslint-disable-line no-use-before-define
      input: getInputFields, // eslint-disable-line no-use-before-define
      update: getUpdateFields, // eslint-disable-line no-use-before-define
      filter: getFilterFields, // eslint-disable-line no-use-before-define
      sort: getSortFields, // eslint-disable-line no-use-before-define
      connection: () => ({}), // eslint-disable-line
      refer: getReferValue,
      enums: () => ({}), // eslint-disable-line no-use-before-define
      list: getListFields, // eslint-disable-line no-use-before-define
      query: getQueriesFields, // eslint-disable-line no-use-before-define
      mutation: getMutationsFields, // eslint-disable-line no-use-before-define
    };
    let typeName = '';

    switch (kind) {
      case 'list':
      case 'enums':
        typeName = `${_.upperFirst(name)}`;
        break;
      case 'refer':
        typeName = name;
        break;
      default:
        typeName = `${_.upperFirst(name)}${property ? _.upperFirst(property.name) : ''}`;
    }
    // Reset types object

    if (!types[kind]) types[kind] = {};
    if (types[kind][typeName]) return types[kind][typeName];

    debug('Generate type of', kind, 'for', typeName);
    const model = getModel(name);

    if (!R.contains(kind, ['enums', 'refer', 'list']) && _.isEmpty(model)) return null;

    // Generate new type
    let type = null;
    let fields = {};
    switch (kind) {
      case 'base':
        if (model.getType) {
          type = new GraphQLInterfaceType({
            name: `${typeName}`,
            fields: () => generators[kind](model),
            resolveType: obj => types.base[_.upperFirst(model.getType(obj))],
          });
        } else {
          type = new GraphQLObjectType({
            name: `${typeName}`,
            fields: () => generators[kind](model),
            interfaces:
              isPersistentModel(model) &&
              (model.definition.types
                ? R.reduce((i, t) => R.append(getType(t), i), [nodeInterface])(
                    model.definition.types,
                  )
                : [nodeInterface]),
          });
        }

        break;
      case 'update':
      case 'input':
        type = new GraphQLInputObjectType({
          name: `${typeName}${_.upperFirst(kind)}`,
          fields: () => generators[kind](model),
        });
        break;
      case 'filter':
        fields = generators[kind](model);
        if (_.isEmpty(fields)) return null;
        type = new GraphQLInputObjectType({
          name: `${typeName}${_.upperFirst(kind)}`,
          fields: () => generators[kind](model),
        });
        break;
      case 'sort':
        fields = generators[kind](model);
        if (_.isEmpty(fields)) return null;
        type = new GraphQLEnumType({
          name: `${typeName}OrderBy`,
          values: generators[kind](model, property),
        });
        break;
      case 'list':
        fields = generators[kind](name);
        if (_.isEmpty(fields)) return null;
        type = new GraphQLObjectType({
          name: `${typeName}Values`,
          fields: generators[kind](name),
        });
        break;
      case 'refer':
        type = new GraphQLScalarType({
          name: `${typeName}Code`,
          parseValue: value => value,
          // parseValue: getReferValue(typeName),
          // do not check data that is already stored in database
          serialize: value => value,
          parseLiteral({ value }) {
            return getReferValue(typeName)(value);
          },
        });
        break;
      case 'enums':
        type = new GraphQLScalarType({
          name: `${typeName}Value`,
          parseValue(value) {
            if (isEnumValue(typeName, value)) return value;
            throw new BadRequest(`${value} is not a valid value for ${_.lowerFirst(typeName)}`, {
              errors: {
                message: `${value} is not a valid value`,
              },
            });
          },
          serialize(value) {
            if (isEnumValue(typeName, value)) return value;
            throw new BadRequest(`${value} is not a valid value for ${_.lowerFirst(typeName)}`, {
              errors: {
                message: `${value} is not a valid value`,
              },
            });
          },
          parseLiteral({ value }) {
            if (isEnumValue(typeName, value)) return value;
            throw new BadRequest(`${value} is not a valid value for ${_.lowerFirst(typeName)}`, {
              errors: {
                message: `${value} is not a valid value`,
              },
            });
          },
        });
        break;
      case 'connection':
        type = connectionDefinitions({
          name: `${typeName}`,
          nodeType: getType(model.name),
          connectionFields: {
            totalCount: {
              type: GraphQLInt,
              description: 'Total number of items',
              resolve: connection => connection.total,
            },
          },
        }).connectionType;
        break;

      case 'query':
        fields = generators[kind](model);
        if (_.isEmpty(fields)) return null;
        type = new GraphQLObjectType({
          name: `${typeName}${isPersistentModel(model) ? _.upperFirst(kind) : ''}`,
          fields: () => generators[kind](model),
        });
        break;
      case 'mutation':
        fields = generators[kind](model);
        if (_.isEmpty(fields)) return null;
        type = new GraphQLObjectType({
          name: `${typeName}${_.upperFirst(pluralize(kind))}`,
          fields: () => generators[kind](model),
        });
        break;
      default:
        return null;
    }
    types[kind][typeName] = type;
    return type;
  };

  // Generate field from Field config
  const generateField = getFieldType => field => {
    if (!field) return null;
    let { type } = field;
    const { isList, required, referred, enum: enumType } = field;
    if (enumType) {
      type = getEnumType(field.name);
    }
    if (typeof type === 'string') {
      if (referred) {
        type = getReferredType(type);
      } else {
        type = getFieldType(type);
      }
    }

    if (!type) return null;

    type = isList ? new GraphQLList(type) : type;

    // Not null type
    type = required ? new GraphQLNonNull(type) : type;

    return Object.assign(
      {},
      field,
      { type },
      field.default && { defaultValue: field.default },
      (field.resolve || field.get) && {
        resolve:
          field.resolve || (field.get && ((root, args, context) => field.get(root, context))),
      },
    );
  };

  const generateFields = getFieldType => fields => {
    const list = {};
    _.forEach(fields, field => {
      list[field.name] = generateField(getFieldType)(field);
    });
    return list;
  };

  const strToRegex = value => _.words(value).reduce((str, word) => `${str}.*${word}`, '');

  const generateConnectionQuery = ({
    type,
    description,
    pagination = false,
    query: filter = {},
    args: queryArgs = {},
    sort = {},
    getFilter,
    find,
  }) => ({
    description,
    type: pagination ? getConnectionType(type) : new GraphQLList(getType(type)),
    args: Object.assign(
      {},
      !R.isEmpty(queryArgs) && R.map(generateField(getInputType))(queryArgs),
      getFilterType(type) && {
        filter: { type: getFilterType(type) },
      },
      getSortType(type) && {
        orderBy: {
          type: new GraphQLList(getSortType(type)),
        },
      },
      pagination ? connectionArgs : {},
    ),
    resolve: async (root, args, context) => {
      const baseQuery = typeof filter === 'function' ? filter(root, args, context) : filter;
      const fnQuery =
        (typeof getFilter === 'function' ? getFilter(args, context) : getFilter) || {};
      const argsQuery = _.reduce(
        args.filter || {},
        (q, value, field) =>
          Object.assign(
            {},
            q,
            typeof value === 'string' && R.startsWith('*', value)
              ? {
                  [field]: RegExp(`/${strToRegex(R.tail(value))}/`, 'gi'),
                }
              : { [field]: value },
          ),
        {},
      );

      const query = Object.assign(
        {},
        baseQuery,
        fnQuery,
        argsQuery,
        R.omit(['first', 'last', 'before', 'after', 'orderBy', 'filter'])(args),
      );
      query.$sort = Object.assign({}, sort, R.into({}, m => m, args.orderBy || []));
      const queryContext = _.merge({}, context, { query });
      return pagination
        ? connection(getModel(type), find, query, args, context)
        : find(queryContext);
    },
  });

  const getByIdField = model => ({
    [_.lowerFirst(model.name)]: {
      type: getType(model.name),
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: (root, args, context) => {
        const { id } = fromGlobalId(args.id);
        return model.get(id, context);
      },
    },
  });

  const processRelatedField = property =>
    (property.related &&
      Object.assign(
        {},
        property,
        { hidden: getModel(property.type).hidden },
        {
          resolve: (root, args, context) =>
            root[property.foreignKey] &&
            getModel(property.type)
              .get(root[property.foreignKey], context)
              .then(data => data, () => null),
        },
      )) ||
    property;

  const processQueryField = property =>
    (property.linked &&
      property.isList &&
      Object.assign(
        {},
        R.pick(['name', 'hidden'], property),
        generateConnectionQuery(
          Object.assign(
            {},
            R.pick(['sort', 'filter', 'pagination'], getModel(property.type).definition),
            property,
            {
              query: (root, args, context) =>
                R.merge(
                  typeof (property.query || getModel(property.type).definition.query) === 'function'
                    ? property.query(args, context) ||
                        getModel(property.type).definition.query(args, context)
                    : property.query || getModel(property.type).definition.query,
                  property.foreignKey && {
                    [property.foreignKey]: root[getModel(property.type).id],
                  },
                ),
            },
          ),
        ),
      )) ||
    property;
  const processQuery = query =>
    (query.linked &&
      query.isList &&
      Object.assign(
        {},
        R.pick(['name', 'hidden'], query),
        generateConnectionQuery(
          Object.assign(
            {},
            R.pick(['sort', 'filter', 'pagination'], getModel(query.type).definition),
            query,
            {
              query: (root, args, context) =>
                R.merge(
                  typeof (query.query || getModel(query.type).definition.query) === 'function'
                    ? query.query(args, context) ||
                        getModel(query.type).definition.query(args, context)
                    : query.query,
                  getModel(query.type).definition.scope,
                ),
            },
          ),
        ),
      )) ||
    query;
  const processBaseField = property =>
    R.pipe(
      processRelatedField,
      processQueryField,
      generateField(getType),
    )(property);

  const getBaseFields = model =>
    Object.assign(
      {},
      isPersistentModel(model) && {
        id: globalIdField(
          (model.definition.types && model.definition.types[0]) || model.name,
          obj => obj[model.id],
        ),
      }, //eslint-disable-line
      R.pipe(
        R.map(processBaseField),
        R.filter(notEmpty),
        R.filter(R.complement(R.prop('hidden'))),
      )(model.definition.properties || {}),
      model.definition.includes &&
        R.mergeAll(
          model.definition.includes.map(
            // eslint-disable-next-line
            name => getIncludesFields(getModel(name)),
          ),
        ),
      R.map(processQuery)(model.definition.queries),
    );

  const processRelatedInputField = property =>
    (property.related && {
      name: property.foreignKey,
      foreignKey: property.foreignKey,
      description: property.description,
      type: GraphQLID,
    }) ||
    property;

  const isQueryField = property => property.linked && property.isList;

  const processDefaultInputField = property =>
    property.default ? Object.assign({}, property, { required: false }) : property;

  const processInputField = property =>
    R.pipe(
      R.omit(['resolve', 'get']),
      processDefaultInputField,
      processRelatedInputField,
    )(property);

  const processFilterField = property =>
    (property.type && getScalar(property.type)) || property.enum || property.referred
      ? property
      : Object.assign({}, property, {
          name: property.foreignKey || `${property.name}Id`,
          type: 'String',
        });

  const getInputFields = model =>
    R.pipe(
      R.filter(R.complement(isQueryField)),
      R.map(processInputField),
      R.filter(R.complement(R.prop('readOnly'))),
      generateFields(getInputType),
    )(model.definition.properties);

  const getUpdateFields = model =>
    R.pipe(
      R.filter(R.complement(isQueryField)),
      R.map(processInputField),
      R.filter(R.complement(R.prop('readOnly'))),
      R.map(R.omit('required')),
      generateFields(getUpdateType),
    )(model.definition.properties);

  // Generate Filter for each model
  const getFilterFields = model =>
    _.reduce(
      R.pipe(
        R.filter(R.prop('search')),
        // R.filter(p=> notEmpty(p.type)),
        R.map(processFilterField),
        R.map(R.omit('required')),
        R.map(R.omit('default')),
        R.map(generateField(getScalar)),
      )(model.definition.properties || {}),
      (result, value) => Object.assign({}, result, { [value.name]: value }),
      {},
    );

  // Generate orderBy for each model
  const getSortFields = model =>
    _.reduce(
      R.pipe(
        R.filter(R.prop('sortable')),
        R.filter(R.complement(R.prop('isList'))),
      )(model.definition.properties || {}),
      (enumValues, field) =>
        Object.assign({}, enumValues, {
          [`${field.name.toUpperCase()}_ASC`]: {
            name: `${field.name.toUpperCase()}_ASC`,
            value: { [field.name]: 1 },
          },
          [`${field.name.toUpperCase()}_DESC`]: {
            name: `${field.name.toUpperCase()}_DESC`,
            value: { [field.name]: -1 },
          },
        }),
      {},
    );

  const getAllField = model => ({
    [`${pluralize(model.name)}`]: generateConnectionQuery(
      Object.assign({}, model.definition, {
        type: model.name,
        find: model.find.bind(model),
      }),
    ),
  });

  // Generate Unique fields search for each model
  const getUniqueFields = model =>
    _.reduce(
      R.pipe(
        R.filter(R.prop('unique')),
        R.filter(p => notEmpty(p.type)),
        R.map(R.omit('required')),
        R.map(R.omit('default')),
        R.map(generateField(getScalar)),
      )(model.definition.properties || {}),
      (result, value) => Object.assign({}, result, { [value.name]: value }),
      null,
    );

  // Search by unique field
  const getByUniqueFields = model =>
    notEmpty(getUniqueFields(model)) && {
      [`${_.lowerFirst(model.name)}By`]: {
        type: getType(model.name),
        args: getUniqueFields(model),
        resolve: (root, args, context) => {
          if (isEmpty(args)) return null;
          const params = R.merge(context, {
            query: {
              $or: _.reduce(args, (con, val, key) => _.concat(con, { [key]: val }), []),
            },
          });
          return model.find(params).then(data => {
            if (data && data.length === 1) {
              return data[0];
            }
            return null;
          });
        },
      },
    };

  const getQueriesFields = model =>
    Object.assign(
      {},
      isPersistentModel(model) && !model.definition.hidden && getAllField(model),
      isPersistentModel(model) && !model.definition.hidden && getByIdField(model),
      isPersistentModel(model) && !model.definition.hidden && getByUniqueFields(model),
      !isPersistentModel(model) && !model.definition.hidden && getBaseFields(model),
    );

  const getIncludesFields = model =>
    (isPersistentModel(model) &&
      Object.assign({}, getByIdField(model), getByUniqueFields(model))) ||
    null;

  const toObjectId = (data, property) => {
    if (
      data &&
      isPersistentModel(getModel(property.type)) &&
      !property.isList &&
      data[property.foreignKey]
    ) {
      // eslint-disable-next-line
      const id = fromGlobalId(data[property.foreignKey]).id;
      data[property.foreignKey] = ObjectId.isValid(id) ? ObjectId(id) : id;
    }
    return data;
  };

  const normalizeInput = (data, modelName) =>
    _.reduce(
      getModel(modelName) ? getModel(modelName).definition.properties : {},
      (d, property) => toObjectId(d, property),
      data,
    );

  const normalizeSingleArg = (args = {}) =>
    args.type
      ? {
          [_.lowerFirst(args.type)]: Object.assign({ name: [_.lowerFirst(args.type)] }, args),
        }
      : args;

  const generateInputFields = args =>
    args &&
    R.map(arg =>
      arg.required ? generateField(getInputType)(arg) : generateField(getUpdateType)(arg),
    )(normalizeSingleArg(args));

  const generateOutputFields = args =>
    args &&
    R.map(arg =>
      Object.assign(generateField(getType)(arg), {
        resolve: o => o[arg.name],
      }),
    )(normalizeSingleArg(args));

  const fromGlobalIdFields = (input, args) =>
    !R.isEmpty(args) &&
    R.map(arg =>
      (input[arg.name] && arg.type && arg.type.toLowerCase()) === 'id'
        ? fromGlobalId(input[arg.name]).id
        : input[arg.name],
    )(args);

  const getMethodField = controller => method =>
    method &&
    mutationWithClientMutationId({
      name: `${_.upperFirst(method.name)}${_.upperFirst(controller.name)}`,
      inputFields: generateInputFields(method.args),
      outputFields: generateOutputFields(method.return),
      mutateAndGetPayload: (input, baseContext = {}) => {
        const context = baseContext;
        const rawArgs = fromGlobalIdFields(input, normalizeSingleArg(method.args));

        if (rawArgs && rawArgs.clientMutationId) {
          context.clientMutationId = rawArgs.clientMutationId;
          delete rawArgs.clientMutationId;
        }
        // translate globalId to ObjectId for related property
        const args = R.pipe(R.map(arg => normalizeInput(rawArgs[arg.name], arg.type)))(method.args);

        if (!method.return) {
          if (method.args) {
            method.fn(method.args.type ? args[_.lowerFirst(method.args.type)] : args, context);
          } else {
            method(context);
          }
          return null;
        }

        if (method.args) {
          return method.return.type
            ? {
                [_.lowerFirst(method.return.type)]: method.fn(
                  method.args.type ? args[_.lowerFirst(method.args.type)] : args,
                  context,
                ),
              }
            : method.fn(method.args.type ? args[_.lowerFirst(method.args.type)] : args, context);
        }
        return method.return.type
          ? {
              [_.lowerFirst(method.return.type)]: method.fn(context),
            }
          : method.fn(context);
      },
    });

  const getCreateField = model => ({
    create: mutationWithClientMutationId({
      name: `Create${_.upperFirst(model.name)}`,
      inputFields: {
        [_.lowerFirst(model.name)]: {
          type: getInputType(model.name),
        },
      },
      outputFields: {
        [_.lowerFirst(model.name)]: {
          type: getType(model.name),
          resolve: payload => payload[_.lowerFirst(model.name)],
        },
      },
      mutateAndGetPayload: (input, context) => ({
        [_.lowerFirst(model.name)]: model.create(
          normalizeInput(input[_.lowerFirst(model.name)], model.name),
          context,
        ),
      }),
    }),
  });

  const getUpdateField = model => ({
    update: mutationWithClientMutationId({
      name: `Update${_.upperFirst(model.name)}`,
      inputFields: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        [_.lowerFirst(model.name)]: {
          type: getUpdateType(model.name),
        },
      },
      outputFields: {
        [_.lowerFirst(model.name)]: {
          type: getType(model.name),
          resolve: payload => payload[_.lowerFirst(model.name)],
        },
      },
      mutateAndGetPayload: (input, context) => ({
        [_.lowerFirst(model.name)]: model.update(
          fromGlobalId(input.id).id,
          normalizeInput(input[_.lowerFirst(model.name)], model.name),
          context,
        ),
      }),
    }),
  });

  const getUpsertField = model => ({
    upsert: mutationWithClientMutationId({
      name: `Upsert${_.upperFirst(model.name)}`,
      inputFields: Object.assign({}, getUniqueFields(model), {
        [_.lowerFirst(model.name)]: {
          type: getUpdateType(model.name),
        },
      }),
      outputFields: {
        [_.lowerFirst(model.name)]: {
          type: getType(model.name),
          resolve: payload => payload[_.lowerFirst(model.name)],
        },
      },
      mutateAndGetPayload: (input, context) => {
        const query = R.omit([_.lowerFirst(model.name)])(input);
        if (isEmpty(query)) return null;
        return {
          [_.lowerFirst(model.name)]: model.upsert(
            query,
            normalizeInput(input[_.lowerFirst(model.name)], model.name),
            context,
          ),
        };
      },
    }),
  });

  const getDeleteField = model => ({
    delete: mutationWithClientMutationId({
      name: `Delete${_.upperFirst(model.name)}`,
      inputFields: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      outputFields: {
        [_.lowerFirst(model.name)]: {
          type: getType(model.name),
          resolve: payload => payload[_.lowerFirst(model.name)],
        },
      },
      mutateAndGetPayload: ({ id }, context) => ({
        [_.lowerFirst(model.name)]: model.delete(fromGlobalId(id).id, context),
      }),
    }),
  });

  const getMutationsFields = model =>
    Object.assign(
      {},
      isPersistentModel(model) && !model.definition.readOnly && getCreateField(model),
      isPersistentModel(model) && !model.definition.readOnly && getUpdateField(model),
      isPersistentModel(model) &&
        !model.definition.readOnly &&
        getUniqueFields(model) &&
        getUpsertField(model),
      isPersistentModel(model) && !model.definition.readOnly && getDeleteField(model),
      R.map(getMethodField(model))(model.definition.methods || {}),
      model.includes &&
        _.reduce(
          model.includes,
          (i, name) =>
            Object.assign(
              {},
              i,
              getModel(name) && {
                // eslint-disable-next-line
                [`${_.lowerFirst(
                  name,
                  // eslint-disable-next-line
                )}Mutation`]: getSchemaField('mutation')(getModel(name)),
              }, //eslint-disable-line
            ),
          {},
        ),
    );

  const getSchemaField = R.curry(
    (kind, model) =>
      getType(model.name, kind) && {
        type: getType(model.name, kind),
        resolve: () => ({}),
      },
  );

  const getListFields = name => ({
    value: {
      type: typeof name === 'string' ? getScalar(name) : GraphQLString,
      resolve: obj => obj.value,
    },
    title: {
      type: GraphQLString,
      resolve: obj => obj.title || obj.description || obj.value,
    },
    description: {
      type: GraphQLString,
      resolve: obj => obj.description || obj.title || obj.value,
    },
  });

  const generateEnumLists = () =>
    _.reduce(
      enums,
      (lists, list, name) => {
        lists[pluralize(name)] = {
          type: new GraphQLList(getListType(list.type || 'String')),
          resolve: () => list.values,
        };
        return lists;
      },
      {},
    );

  return {
    nodeField,
    getType,
    getSchemaField,
    getBaseFields,
    generateEnumLists,
  };
};
