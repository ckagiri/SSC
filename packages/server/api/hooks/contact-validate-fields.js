import errors from '@feathersjs/errors';

const _ = require('lodash');

module.exports = function(options = {}) {
  // eslint-disable-line no-unused-vars
  return function(hook) {
    const errs = {};

    if (_.isEmpty(hook.data.firstName)) {
      errs.firstName = 'First name is required';
    }

    if (_.isEmpty(hook.data.lastName)) {
      errs.firstName = 'Last name is required';
    }

    if (!_.isEmpty(errs)) {
      const validationErrors = new errors.BadRequest('Invalid Parameters', {
        errors: errs,
      });
      throw validationErrors;
    }
  };
};
