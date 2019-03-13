import R from 'ramda';
import _ from 'lodash';
import { Service } from 'feathers-mongodb';
import { processField, processArgs, processReturn } from './field';
import { log } from './helpers';

// debug = debug('model');
// service.Model & this.Model: mongodb model, service.model: this model

const addFntoProperty = model => property =>
  !property.get && typeof model[`get${_.upperFirst(property.name)}`] === 'function'
    ? Object.assign({}, property, {
        get: model[`get${_.upperFirst(property.name)}`].bind(model)
      })
    : property;

const addFntoQuery = model => query =>
  !query.find && typeof model[`find${_.upperFirst(query.name)}`] === 'function'
    ? Object.assign({}, query, {
        find: model[`find${_.upperFirst(query.name)}`].bind(model)
      })
    : query;

const addFntoMethod = model => method =>
  !method.fn && model[method.name]
    ? Object.assign({}, method, {
        fn: model[method.name].bind(model)
      })
    : method;

const readOnlyProperty = property =>
  property.get ? Object.assign({}, property, { readOnly: true }) : property;

const processProperty = model => (property, name) =>
  R.pipe(
    processField(name),
    addFntoProperty(model),
    readOnlyProperty,
    processArgs
  )(property);

const processQuery = model => (query, name) =>
  R.pipe(
    processField(name),
    addFntoQuery(model),
    readOnlyProperty,
    processArgs
  )(query);

const processMethod = model => (method, name) =>
  R.pipe(
    processField(name),
    processArgs,
    processReturn,
    addFntoMethod(model)
  )(method);

const processModelDefinition = model => {
  const definition = Object.assign({}, model.definition, {
    properties: R.mapObjIndexed(processProperty(model))(model.definition.properties),
    queries: R.mapObjIndexed(processQuery(model))(model.definition.queries),
    methods: R.pipe(
      R.mapObjIndexed(processMethod(model)),
      R.filter(R.prop('fn'))
    )(model.definition.methods)
  });
  return definition;
};

class Model extends Service {
  constructor(app, options = {}, def = {}) {
    super({});
    this.app = app;
    this.hooks = options.hooks;
    this.filters = options.filters;
    // Getting model definition & service options
    const definition = R.mergeDeepRight(options.definition, def);
    this.definition = {};
    _.forEach(definition, (value, key) => {
      if (!R.isNil(value)) this.definition[key] = value;
    });
    this.definition = processModelDefinition(this);
    // Connect to database to Model property of both this and service
    if (definition.collection) {
      this.persistent = true;
      // this.definition.properties = R.mergeDeepLeft(this.definition.properties, auditFields);
      app
        .get('mongoClient')
        .then(db => {
          this.Model = db.collection(definition.collection);
        })
        .catch(() =>
          console.error(`error: Cannot connect to database for collection ${definition.collection}`)
        );
    }
  }

  get(id, params) {
    if (params) return params.loaders[this.name].load(this._objectifyId(id));
    return this._get(id, params);
  }

  // Update changes only, not replacing the model
  update(id, data, params) {
    if (typeof id === 'object') {
      id = id._id || id;
    }
    if (data.$set) return super.update(id, data, params);
    return super.update(this._objectifyId(id), { $set: data }, params);
  }

  upsert(query, data, params) {
    return this.Model.findOne(Object.assign({}, query, params && params.query)).then(result => {
      if (!result) {
        return this.create(data, params);
      }
      return this.update(result[this.id], data, params);
    });
  }

  findOne(query, params) {
    return this.Model.findOne(query, params);
  }
}

export default Model;
