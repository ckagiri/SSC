const { authenticate } = require('@feathersjs/authentication').hooks;
// const commonHooks = require('feathers-hooks-common');
const { restrictToOwner } = require('feathers-authentication-hooks');
const { hashPassword } = require('@feathersjs/authentication-local').hooks;
// import { log } from '../../bin/helpers';

const restrict = [
  authenticate('jwt'),
  restrictToOwner({
    idField: '_id',
    ownerField: '_id'
  })
];

module.exports = {
  before: {
    all: [],
    find: [
      // ...restrict
    ],
    get: [
      // ...restrict
    ],
    create: [hashPassword()],
    update: [hashPassword()],
    patch: [...restrict, hashPassword()],
    remove: [...restrict]
  },

  after: {
    all: [
      // commonHooks.when(
      //   hook => hook.params.provider,
      //   // commonHooks.discard('password'),
      // ),
    ],
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
