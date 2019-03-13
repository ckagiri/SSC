// Application hooks that run for every service
// import { NotFound } from '@feathersjs/errors';

// const hooks = require('feathers-authentication-hooks');
// const { authenticate } = require('@feathersjs/authentication').hooks;
// const commonHooks = require('feathers-hooks-common');
// const logger = require('./hooks/logger');

module.exports = {
  before: {
    all: [
      // hooks => {
      //   if (hooks.params.provider==='rest') {
      //     throw new NotFound();
      //   }
      // }
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
