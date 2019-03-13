import R from 'ramda';
import entity from './bin/entity';
import { makeDebug } from './bin/helpers';

const debug = makeDebug('entities');

// eslint-disable-next-line
const registerService = entity => {
  const { app } = entity;
  if (!entity.persistent) return entity;
  // Initialize our service at path serviceName with any options it requires
  const servicePath = `${app.get('rootApi')}${entity.name}`;
  debug(servicePath);
  app.use(servicePath, entity);
  // Config the service at path serviceName with any options it requires
  const service = app.service(servicePath);
  if (entity.hooks) service.hooks(entity.hooks);
  if (entity.filter) {
    service.filter(entity.filters);
  }

  // link model to the service
  // eslint-disable-next-line
  entity.model.service = service;
  return service;
};

const enums = {};

const getEnums = entities =>
  R.map(
    R.pipe(
      R.path(['definition', 'properties']),
      R.filter(R.prop('enum')),
      R.map(property => {
        // Initialize enum list
        debug('Generate enum for', property.name);
        if (!enums[property.name]) enums[property.name] = { values: [] };

        R.map(item => {
          // Setting type of enums, if property type is not set, then enum type can only be String or Int,
          // list of default types (Int or String) may be extend in the future if needed
          if (!enums[property.name].type)
            enums[property.name].type =
              property.type ||
              (typeof item.value === 'number' ? 'Int' : 'String');
          // Insert value in the enum list of there is not value there yet
          if (
            R.none(
              R.pipe(
                R.prop('value'),
                R.equals(item.value)
              )
            )(enums[property.name].values)
          )
            enums[property.name].values.push(item);
          return null;
        })(property.enum);
        return property;
      })
    )
  )(entities);

module.exports = function entities() {
  const app = this;
  const { generateEntity } = entity(app.models);
  app.entities = R.map(model => registerService(generateEntity(model)))(
    app.models
  );
  getEnums(app.entities);
  app.enums = enums;
};
