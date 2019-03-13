import errors from '@feathersjs/errors';
import { ObjectId } from 'mongodb';

const _ = require('lodash');

module.exports = function(options = {}) {
  // eslint-disable-line no-unused-vars
  return function(hook) {
    let query = {};
    const expressions = [];
    const errs = {};

    if (
      _.isEmpty(hook.data.shortName) &&
      _.isEmpty(hook.data.phone) &&
      _.isEmpty(hook.data.email)
    ) {
      return Promise.resolve(hook);
    }

    if (!_.isEmpty(hook.data.shortName)) {
      expressions.push({ shortName: hook.data.shortName });
    }

    if (!_.isEmpty(hook.data.phone)) {
      expressions.push({ phone: hook.data.phone });
    }

    if (!_.isEmpty(hook.data.email)) {
      expressions.push({ email: hook.data.email });
    }

    if (!_.isEmpty(hook.id)) {
      query = {
        $and: [{ _id: { $ne: ObjectId(hook.id) } }, { $or: expressions }],
      };
    } else {
      query = { $or: expressions };
    }

    return new Promise((resolve, reject) =>
      hook.app.models.Contact.Model.findOne(query, (error, result) => {
        if (error) {
          return reject(error);
        }

        if (result) {
          if (result.shortName === hook.data.shortName) {
            errs.shortName = `Short name '${hook.data.shortName}' already taken`;
          }

          if (result.phone === hook.data.phone) {
            errs.phone = `Phone '${hook.data.phone}' already taken`;
          }

          if (result.email === hook.data.email) {
            errs.email = `Email '${hook.data.email}' already taken`;
          }
        }

        if (!_.isEmpty(errs)) {
          const validationErrors = new errors.BadRequest('Invalid Parameters', {
            errors: errs,
          });
          return reject(validationErrors);
        }

        return resolve(hook);
      }),
    );
  };
};
