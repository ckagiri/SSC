import { Ability } from '@casl/ability';
import * as _ from 'lodash';
import R from 'ramda';
// import { Forbidden } from '@feathersjs/errors';
import { makeDebug } from './helpers';

const debug = makeDebug('ability');

const manageActions = ['create', 'read', 'update', 'delete', 'execute'];

const defaultAbility = [
  {
    subject: 'all',
    actions: ['manage'],
    inverted: true
  },
  {
    subject: 'all',
    actions: ['read']
  }
];

Ability.addAlias('manage', manageActions);
// NAMING CONVENTION
// strActions: 'action, action, action'
// role: 'holder:strActions',
// permit: {subject, actions, fields, inverted}
// permissions: {holder:permit}
// ability: {[permit]}
// ablitities: {holder:[permit]}
// field: property, query or methods

// convert actions string format to array format
const parseActions = strActions =>
  strActions
    ? R.map(
        R.pipe(
          R.trim,
          R.toLower
        )
      )(R.split(',', strActions))
    : manageActions;

const modelPermissions = model =>
  model &&
  model.definition &&
  model.definition.roles &&
  !R.isEmpty(model.definition.roles) &&
  debug('model', model.name, 'roles', model.definition.roles)
    ? R.reduce(
        (ability, role) => {
          const [holder, strActions] = R.split(':')(role);
          // eslint-disable-next-line
          ability[_.lowerFirst(holder.trim())] = {
            subject: model.name,
            actions: parseActions(strActions)
          };
          debug(holder, ':', ability[_.lowerFirst(holder.trim())]);
          return ability;
        },
        {
          default: { subject: model.name, actions: ['manage'], inverted: true }
        }
      )(model.definition.roles)
    : null;

const addModelPermissions = (modelAbilities, modelPermissions) =>
  modelPermissions
    ? _.reduce(
        modelPermissions,
        (abilities, permit, holder) =>
          Object.assign({}, abilities, {
            [holder]: (abilities[holder] || []).concat(permit)
          }),
        modelAbilities
      )
    : modelAbilities;

const fieldPermissions = (modelAbilities, model, field, fieldName) =>
  model && field && field.roles && !R.isEmpty(field.roles)
    ? // && debug('model', model.name, 'field', field.name, 'roles', field.roles)
      R.reduce((ability, role) => {
        // eslint-disable-next-line
        let [holder, strActions] = R.split(':')(role);
        holder = _.lowerFirst(holder.trim());
        let modelAbility = _.find(
          modelAbilities[holder],
          ability => ability.subject === model.name
        );
        if (modelAbility) {
          if (
            modelAbility.actions === 'manage' ||
            _.indexOf(modelAbility.actions, 'manage') > -1
          ) {
            modelAbility = Object.assign({}, modelAbility, {
              actions: manageActions
            });
          }
        } else {
          modelAbility = { actions: [] };
        }

        return Object.assign({}, ability, {
          [holder]: {
            subject: model.name,
            actions: modelAbility
              ? _.intersection(modelAbility.actions, parseActions(strActions))
              : parseActions(strActions),
            fields: [fieldName]
          }
        });
      }, {})(field.roles)
    : null;

// eslint-disable-next-line
const addFieldPermissions = (fieldAbilities, fieldPermissions) =>
  fieldPermissions
    ? _.reduce(
        fieldPermissions,
        (abilities, permit, holder) => {
          if (!abilities[holder])
            return Object.assign({}, abilities, { [holder]: [permit] });
          const index = _.findIndex(
            abilities[holder],
            p =>
              p.subject === permit.subject &&
              _.isEqual(p.actions, permit.actions)
          );
          if (index === -1) {
            return Object.assign({}, abilities, {
              [holder]: abilities[holder].concat(permit)
            });
          }
          abilities[holder][index] = Object.assign(
            {},
            abilities[holder][index],
            { fields: abilities[holder][index].fields.concat(permit.fields) }
          );
          return Object.assign({}, abilities);
        },
        fieldAbilities
      )
    : fieldAbilities;

const generateFieldForbidden = fieldAbilities => {
  // remove holders => create list of permits
  const permits = _.reduce(
    fieldAbilities,
    (permits, ability) => permits.concat(ability),
    []
  );

  // generate list of fields for each subject
  const forbiddens = _.reduce(
    permits,
    (forbiddens, permit) =>
      Object.assign({}, forbiddens, {
        [permit.subject]: _.union(
          forbiddens[permit.subject] || [],
          permit.fields
        )
      }),
    {}
  );

  // convert to array of permits
  return _.reduce(
    forbiddens,
    (acc, fields, subject) =>
      acc.concat({ subject, actions: ['manage'], fields, inverted: true }),
    []
  );
};

const getModelFields = model =>
  model &&
  model.definition &&
  Object.assign(
    {},
    model.definition.properties,
    model.definition.queries,
    model.definition.methods
  );

const mergeAbilities = (modelAbilities, fieldAbilities, fieldForbiddens) => (
  ...holders
) => {
  const modelAbility = _.reduce(
    holders,
    (ability, holder) =>
      holder && modelAbilities[holder.toLowerCase()]
        ? ability.concat(modelAbilities[holder.toLowerCase()])
        : ability,
    []
  );
  const fieldAbility = _.reduce(
    holders,
    (ability, holder) =>
      holder && fieldAbilities[holder.toLowerCase()]
        ? ability.concat(fieldAbilities[holder.toLowerCase()])
        : ability,
    []
  );
  return _.concat(
    modelAbilities.default || [],
    modelAbility || [],
    fieldForbiddens || [],
    fieldAbilities.default || [],
    _.filter(fieldAbility, permit => !_.isEmpty(permit.actions)) || []
  );
};

const generateAbilities = models => {
  const modelAbilities = _.reduce(
    models,
    (abilities, model) =>
      addModelPermissions(abilities, modelPermissions(model)),
    { default: defaultAbility }
  );
  debug('Model ablitities', modelAbilities);

  const fieldAbilities = _.reduce(
    models,
    (abilities, model) =>
      _.reduce(
        getModelFields(model),
        (previousAbilities, field, fieldName) =>
          addFieldPermissions(
            previousAbilities,
            fieldPermissions(modelAbilities, model, field, fieldName)
          ),
        abilities
      ),
    {}
  );

  debug('Field ablitities', fieldAbilities);

  const fieldForbiddens = generateFieldForbidden(fieldAbilities);
  debug('Field forbidden', fieldForbiddens);

  const getAbility = user => {
    const { category, position } = user || {};
    debug(user);
    return new Ability(
      mergeAbilities(modelAbilities, fieldAbilities, fieldForbiddens)(
        user && 'authenticate',
        category,
        position
      )
    );
  };

  return { getAbility };
};

export default generateAbilities;
