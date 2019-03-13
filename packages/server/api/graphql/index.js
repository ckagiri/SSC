// Initializes the `graphql` service on path `/graphql`

import { graphqlExpress } from 'apollo-server-express';
// import bodyParser from 'body-parser';
import R from 'ramda';
import makeDebug from 'debug';
import generateSchema from './schema';

const debug = makeDebug('graphql');

module.exports = function initGraphQL() {
  const app = this;
  // Base context for GraphQL

  const registerGraphql = scope => {
    const path = scope ? `/${scope}` : '';

    const { enums, entities: models } = app;

    const graphQLContext = {
      provider: 'graphql'
    };

    debug('register graphql for', scope || 'main');
    app.use(
      `${path}/graphql`,
      graphqlExpress(req => ({
        schema: generateSchema({ models, enums }),
        context: Object.assign({}, req.feathers, graphQLContext),
        rootValue: Object.assign(
          {},
          R.pick(['authenticated'])(req.feathers),
          R.prop('user')(req.feathers)
        )
      }))
    );

    // app.use('/graphiql', graphiqlExpress({ endpointURL: `${path}/graphql` }));
    app.use(`${path}/graphiql`, (req, res) => {
      res.sendFile(`${__dirname}/graphiql.html`);
    });
  };

  // create public GraphQL endpoint
  registerGraphql();

  // create GraphQL endpoint for Consultant
  // registerGraphql('consultant');
};
