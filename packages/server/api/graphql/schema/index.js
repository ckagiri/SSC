import { GraphQLSchema } from 'graphql';
import generateTypes from './types';
import getSchema from './schema';
import { makeDebug } from '../../bin/helpers';

const debug = makeDebug('graphql:schema');
export default ({ models, enums }) => {
  const types = generateTypes({ models, enums });
  debug('Types is generated');
  const { query, mutation } = getSchema(types, models);
  debug('Schema is generated');

  return new GraphQLSchema({
    query,
    mutation
  });
};
