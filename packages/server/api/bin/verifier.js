import R from 'ramda';
import errors from '@feathersjs/errors';
import { Verifier as JWT } from '@feathersjs/authentication-jwt';
import { Verifier as Local } from '@feathersjs/authentication-local';
import bcrypt from 'bcrypt';
// import { log } from './helpers';

const getFieldName = credential => {
  // eslint-disable-next-line
  const isEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isPhone = /^(\+|0)(\d{9,12})$/;
  let fieldName = 'usernameField';
  if (isEmail.test(credential.toLowerCase())) fieldName = 'emailField';
  if (isPhone.test(credential.toLowerCase())) fieldName = 'phoneField';

  return fieldName;
};

const generateUser = (user, location) => {
  if (location) {
    user.location = location;
  }
  delete user.password;
  return user;
};

export class LocalVerifier extends Local {
  constructor(app, options = {}) {
    super(app, options);
  }

  verify(req, credential, password, done) {
    const { options, app } = this;
    const NotAuthenticated = new errors.NotAuthenticated(
      'Username/Password/Location is not valid'
    );
    const { service } = app.get('authentication');
    const query = Object.assign({}, req.params, {
      query: { [options[getFieldName(credential)]]: credential }
    });
    app
      .service(service)
      .model.find(query)
      .then(result => {
        if (result && result.length === 1) {
          const user = result[0];
          const location = req && req.query && req.query.location;

          // Verify the location
          if (
            user.locations &&
            (!location || !R.find(R.equals(location))(user.locations))
          ) {
            done(NotAuthenticated);
          }
          // Check password
          bcrypt.compare(
            password,
            user[options.passwordField],
            (err, valid) => {
              if (valid) {
                const payload = { id: user._id };
                if (location) payload.location = location;
                payload.cre = credential;
                done(null, generateUser(user, location), payload);
              } else {
                done(NotAuthenticated);
              }
            }
          );
        } else {
          done(NotAuthenticated);
        }
      })
      .catch(e => done(e));
  }
}

export class JWTVerifier extends JWT {
  // The verify function has the exact same inputs and
  // return values as a vanilla passport strategy
  constructor(app, options = {}) {
    super(app, options);
    this.app = app;
  }

  verify(req, payload, done) {
    //eslint-disable-line
    const { app } = this;
    const NotAuthenticated = new errors.NotAuthenticated('invalid token');
    const { service, local } = app.get('authentication');
    const { id, location, cre: credential } = payload;
    app
      .service(service)
      .model.get(id)
      .then(user => {
        // Cannot find contact
        if (!user) {
          done(NotAuthenticated);
        }
        // Credential is not valid
        if (user[local[getFieldName(credential)]] !== credential) {
          done(NotAuthenticated);
        }

        // Unauthorized to access to the location
        if (
          user.locations &&
          (!location || !R.find(R.equals(location))(user.locations))
        ) {
          done(NotAuthenticated);
        }
        delete payload.iat;
        delete payload.exp;
        delete payload.aud;
        delete payload.iss;
        delete payload.sub;
        done(null, generateUser(user, location), payload);
      })
      .catch(err => done(err, null, null));
  }
}
