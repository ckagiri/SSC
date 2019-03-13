import R from 'ramda';
import generateAbilities from './bin/abilities';
import { makeDebug } from './bin/helpers';

const debug = makeDebug('authorization');

module.exports = function authorization() {
  const app = this;
  const { getAbility } = generateAbilities(app.entities);
  app.use((req, res, next) => {
    req.feathers = Object.assign({}, req.feathers, {
      collation: {
        locale: 'vi',
        strength: 1,
        normalization: true
      },
      ability: getAbility({}),
      authenticated: false,
      user: {}
    });
    if (app.authenticate) {
      app
        .authenticate('jwt')(req)
        .then((result = {}) => {
          debug(result.success ? 'success' : 'fail');
          req.feathers = Object.assign(
            {},
            req.feathers,
            { authenticated: result.success },
            result.data && {
              ability: getAbility(R.prop('user', result.data)),
              user: R.prop('user', result.data)
            }
          );
          next();
        })
        .catch(e => {
          debug(e);
          next();
        });
    } else {
      next();
    }
  });
};
