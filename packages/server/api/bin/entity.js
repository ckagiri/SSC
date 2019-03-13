import R from 'ramda';
import * as _ from 'lodash';
import { permittedFieldsOf } from '@casl/ability/extra';
import { Forbidden } from '@feathersjs/errors';
// eslint-disable-next-line
import { makeDebug, log } from './helpers';

const debug = makeDebug('entity');

const auditFields = {
  createdAt: {
    name: 'createdAt',
    type: 'DateTime',
    readOnly: true,
  },
  updatedAt: {
    name: 'updatedAt',
    type: 'DateTime',
    readOnly: true,
  },
  deletedAt: {
    name: 'deletedAt',
    type: 'DateTime',
    readOnly: true,
  },
  createdBy: {
    name: 'createdById',
    foreignKey: 'createdById',
    type: 'Contact',
    readOnly: true,
    linked: true,
    related: true,
  },
  updatedBy: {
    name: 'updatedById',
    foreignKey: 'updatedById',
    type: 'Contact',
    readOnly: true,
    linked: true,
    related: true,
  },

  deletedBy: {
    name: 'deletedById',
    foreignKey: 'deletedById',
    type: 'Contact',
    readOnly: true,
    linked: true,
    related: true,
  },
};

export default models => {
  const isPersistent = name => models[_.lowerFirst(name)] && models[_.lowerFirst(name)].persistent;

  const isLinkedProperty = property =>
    property.type && !property.referred && !property.enum && isPersistent(property.type)
      ? Object.assign({}, property, { linked: true })
      : property;

  const processRelatedProperty = property =>
    property.linked && !property.isList && !property.get
      ? Object.assign({}, property, {
          foreignKey: property.foreignKey || `${property.name}Id`,
          name: property.foreignKey || `${property.name}Id`,
          related: true,
        })
      : property;

  const processListProperty = model => property =>
    property.linked && property.isList && !property.get
      ? Object.assign({}, property, {
          foreignKey: property.foreignKey || `${model.name}Id`,
          // eslint-disable-next-line
          find: authorizeEntity('read', property.type)(
            property.find ||
              models[_.lowerFirst(property.type)].find.bind(models[_.lowerFirst(property.type)]),
          ),
        })
      : property;

  const processProperty = model => property =>
    R.pipe(
      isLinkedProperty,
      processRelatedProperty,
      processListProperty(model),
    )(property);

  const processQuery = model => query =>
    Object.assign(
      {},
      R.pick(['sort', 'filter', 'pagination'])(models[_.lowerFirst(query.type)].definition),
      processProperty(model)(query),
    );

  const getTypes = ({ definition }) => {
    if (
      definition.type &&
      models[_.lowerFirst(definition.type)] &&
      models[_.lowerFirst(definition.type)].getType
    ) {
      return (getTypes(models[_.lowerFirst(definition.type)]) || []).concat([
        _.upperFirst(definition.type),
      ]);
    }
    return null;
  };

  const getEntityDefinition = model => {
    let definition = Object.assign({}, model.definition, {
      properties: R.map(processProperty(model))(model.definition.properties),
      queries: R.map(processQuery(model))(model.definition.queries),
    });
    if (definition.type && models[_.lowerFirst(definition.type)]) {
      const parent = getEntityDefinition(models[_.lowerFirst(definition.type)]);
      definition.includes = (definition.includes || []).concat(parent.includes);
      definition = R.mergeDeepRight(R.pick(['properties', 'queries'])(parent), definition);
    }
    return definition;
  };

  const getQueryFields = (entity, ability) => {
    const fields = _.reduce(
      R.pipe(R.filter(R.complement(R.prop('hidden'))))(entity.definition.properties),
      (select, p) => (p ? select.concat(p.name) : select),
      [],
    );
    return [entity.id].concat(
      permittedFieldsOf(ability, 'read', entity.name, {
        fieldsFrom: rule => rule.fields || fields,
      }),
    );
  };

  const getUpdateFields = (action, entity, ability) => {
    const fields = _.reduce(
      R.pipe(
        // R.filter(R.complement(R.prop('isList'))),
        R.filter(R.complement(R.prop('readOnly'))),
      )(entity.definition.properties),
      (select, p) => select.concat(p.name),
      [],
    );
    return permittedFieldsOf(ability, action, entity.name, {
      fieldsFrom: rule => rule.fields || fields,
    });
  };

  const authorizeEntity = (action, entityName) => func => (...args) => {
    let callback;
    let params;
    let data;
    if (typeof args[args.length - 1] === 'function') {
      callback = args[args.length - 1];
      params = Object.assign({}, args[args.length - 2]);
      data = R.dropLast(2, args);
    } else {
      params = Object.assign({}, args[args.length - 1]);
      data = R.init(args);
    }
    const { ability } = params;

    if (!ability || ability.cannot(action, _.lowerFirst(entityName))) return null;
    return callback ? func(...data, params, callback) : func(...data, params);
  };

  const authorize = (action, entity, name) => func => (...args) => {
    debug('Authorize:', action, entity.name, name);
    let callback;
    let params;
    let data;
    if (typeof args[args.length - 1] === 'function') {
      callback = args[args.length - 1];
      params = Object.assign({}, args[args.length - 2]);
      data = R.dropLast(2, args);
    } else {
      params = Object.assign({}, args[args.length - 1]);
      data = R.init(args);
    }
    let { ability } = params;
    const { user } = params;

    // Property methods
    if (name) {
      if (!ability || ability.cannot(action, entity.name, name)) return null;
      return callback ? func(...data, params, callback) : func(...data, params);
    }
    let $select;
    let input;
    // Entity methods
    switch (action) {
      case 'read':
        // $select = getQueryFields(entity, ability);
        // $select =
        //   params.query && params.query.$select
        //     ? R.intersection(params.query.$select, $select)
        //     : $select;
        // if (R.isEmpty($select)) {
        //   ability = null;
        // } else {
        params.query = Object.assign(
          {},
          params.query,
          entity.definition.scope && typeof entity.definition.scope === 'function'
            ? entity.definition.scope(params)
            : entity.definition.scope,
          { $select },
        );
        // }
        break;
      case 'create':
      case 'update':
        input = R.pick(getUpdateFields(action, entity, ability))(data && data[data.length - 1]);

        if (R.isEmpty(input)) {
          ability = null;
        } else {
          // eslint-disable-next-line
          input.updatedById = user && user._id;
          input.updatedAt = new Date();
          if (action === 'create') {
            // eslint-disable-next-line
            input.createdById = user && user._id;
            input.createdAt = new Date();
          }
          data[data.length - 1] = input;
        }
        break;
      case 'delete':
        data[1] = {
          deletedAt: new Date(),
          // eslint-disable-next-line
          deletedById: user && user._id,
        };
        break;
      default:
    }

    if (!ability || ability.cannot(action, entity.name)) throw new Forbidden('Not allowed!');
    return (callback ? func(...data, params, callback) : func(...data, params)).then(result => {
      const data = _.isArray(result)
        ? result.map(item => entity.fromData(item, params))
        : entity.fromData(result, params);

      R.pipe(
        R.filter(R.prop('get')),
        R.map(p => {
          if (ability.can('read', entity.name, p.name)) {
            if (_.isArray(data)) {
              R.mapObjIndexed((item, index) => {
                data[index][p.name] = p.get(item, params);
              })(data);
            } else {
              data[p.name] = p.get(data, params);
            }
          }
          return null;
        }),
      )(entity.definition.properties);
      return data;
    });
  };

  const generateEntity = model => {
    let entity = R.pick(['app', 'id', 'name', 'root', 'paginate', 'persistent', 'hooks', 'filter'])(
      model,
    );
    debug(model.name);

    entity.model = model;
    entity.definition = getEntityDefinition(model);

    // Entity Auditing
    if (entity.persistent) {
      entity.definition.properties = R.mergeDeepLeft(entity.definition.properties, auditFields);
    }

    entity = _.reduce(
      entity.definition.properties,
      (entity, property, name) => {
        if (property.get) {
          debug(entity.name, `get${_.upperFirst(name)}`);
          entity[`get${_.upperFirst(name)}`] = authorize('read', entity, name)(property.get);
          entity.definition.properties[name] = Object.assign({}, property, {
            get: entity[`get${_.upperFirst(name)}`],
          });
        }
        if (property.find) {
          debug(entity.name, `get${_.upperFirst(name)}`);
          entity[`get${_.upperFirst(name)}`] = authorize('read', entity, name)(property.find);
          entity.definition.properties[name] = Object.assign({}, property, {
            get: entity[`get${_.upperFirst(name)}`],
          });
        }
        return entity;
      },
      entity,
    );

    entity = _.reduce(
      entity.definition.queries,
      (entity, query, name) => {
        if (query.find) {
          debug(entity.name, `find${_.upperFirst(name)}`);
          entity[`find${_.upperFirst(name)}`] = authorize('read', entity, name)(query.find);
          entity.definition.queries[name] = Object.assign(
            {},
            // entity.definition,
            query,
            {
              find: entity[`find${_.upperFirst(name)}`],
            },
          );
        }
        return entity;
      },
      entity,
    );

    entity = _.reduce(
      entity.definition.methods,
      (entity, method, name) => {
        if (method.fn) {
          debug(entity.name, name);
          entity[name] = authorize('execute', entity, name)(method.fn);
          entity.definition.methods[name].fn = entity[name];
        }
        return entity;
      },
      entity,
    );
    entity.definition.types = getTypes(model);
    entity.fromData = authorize('read', entity)((data, context) => ({
      then: () =>
        entity.getType
          ? R.pick(
              getQueryFields(
                entity.app.entities[_.lowerFirst(entity.getType(data))],
                context.ability,
              ),
            )(data)
          : R.pick(getQueryFields(entity, context.ability))(data),
    }));
    if (model.getType) {
      entity.getType = obj => {
        let type = entity.name;
        while (entity.app.models[_.lowerFirst(type)].getType) {
          type = entity.app.models[_.lowerFirst(type)].getType(obj);
        }
        return _.upperFirst(type);
      };
    }
    entity.find = authorize('read', entity)(model.find.bind(model));
    entity.get = authorize('read', entity)(model.get.bind(model));
    entity.create = authorize('create', entity)(model.create.bind(model));
    entity.upsert = authorize('create', entity)(model.upsert.bind(model));
    entity.delete = authorize('delete', entity)(model.update.bind(model));
    entity.update = authorize('update', entity)(model.update.bind(model));
    return entity;
  };

  return { generateEntity };
};
