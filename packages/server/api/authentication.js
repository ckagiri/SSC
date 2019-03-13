import { LocalVerifier, JWTVerifier } from './bin/verifier';
// import { log } from './bin/helpers';

const authentication = require('@feathersjs/authentication');
const jwt = require('@feathersjs/authentication-jwt');
const local = require('@feathersjs/authentication-local');
// const logger = require('./hooks/logger');

module.exports = function authenticate() {
  const app = this;
  const config = app.get('authentication');

  // Set up authentication with the secret
  app.configure(authentication(config));

  // app.configure(jwt());
  app.configure(jwt({ Verifier: JWTVerifier }));
  app.configure(local({ Verifier: LocalVerifier }));
  // app.configure(local(config.local));

  // The `authentication` service is used to create a JWT.
  // The before `create` hook registers strategies that can be used
  // to create a new valid JWT (e.g. local or oauth2)
  app.service('authentication').hooks({
    before: {
      create: [
        hook => {
          // delete hook.params.headers.authorization;
          delete hook.params.authenticated;
          // hook.params.headers.authenticated = false;
          // console.log(hook.params);
          return hook;
        },
        authentication.hooks.authenticate(config.strategies)
      ],
      remove: []
    },
    after: {
      create: [
        hook => {
          hook.result[config.entity] = hook.params[config.entity];
        }
      ]
    }
  });
};
