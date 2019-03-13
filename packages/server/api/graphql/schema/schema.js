import R from 'ramda';
import _ from 'lodash';
import { GraphQLObjectType } from 'graphql';

// import { log } from '../../bin/helpers';

const isEmpty = o => R.or(R.isNil(o), R.isEmpty(o));
const notEmpty = R.complement(isEmpty);

export default (types = {}, baseModels = {}) => {
  const { nodeField, getSchemaField, getBaseFields, generateEnumLists } = types;

  const getRootFields = (models, kind) =>
    Object.assign(
      {},
      kind === 'query' && {
        node: nodeField
      },
      kind === 'query' && getBaseFields(baseModels.root),
      _.reduce(
        R.filter(R.path(['definition', 'root']))(models),
        (q, model) =>
          Object.assign(
            {},
            q,
            getSchemaField(kind)(model) && {
              [`${_.lowerFirst(model.name)}${_.upperFirst(
                kind
              )}`]: getSchemaField(kind)(model)
            }
          ),
        {}
      ),
      kind === 'query' && {
        lists: {
          type: new GraphQLObjectType({
            name: 'Lists',
            fields: generateEnumLists()
          }),
          resolve: obj => obj
        }
      }
    );

  const getRootType = (models, kind) =>
    (notEmpty(getRootFields(models, kind)) &&
      new GraphQLObjectType({
        name: `Root${_.upperFirst(kind)}`,
        fields: () => getRootFields(models, kind),
        resolve: root => root
      })) ||
    null;
  return {
    query: getRootType(R.omit('root')(baseModels), 'query'),
    mutation: getRootType(baseModels, 'mutation')
  };
};
