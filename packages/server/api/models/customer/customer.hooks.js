import sendApiMessenger from './send-api-messenger.hooks';

// const { authenticate } = require('@feathersjs/authentication').hooks;
// const commonHooks = require('feathers-hooks-common');
// const { restrictToOwner } = require('feathers-authentication-hooks');
// const { hashPassword } = require('@feathersjs/authentication-local').hooks;

module.exports = {
  before: {
    all: [],
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
    create: [sendApiMessenger()],
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
