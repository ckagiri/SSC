import bcrypt from 'bcrypt';
import { GeneralError } from '@feathersjs/errors';

import BaseModel from '../../bin/model';

const definition = {
  methods: {
    register: {
      roles: ['manager'],
      args: {
        id: 'ID!',
        username: 'String!',
        password: 'String!',
        locations: ['Location'],
      },
      return: 'User',
    },
    login: {
      args: {
        credential: 'String!',
        password: 'String!',
        location: 'String',
      },
      return: {
        accessToken: 'String',
        user: 'User',
      },
    },
    loginJwt: {
      args: {
        accessToken: 'String',
      },
      return: {
        accessToken: 'String',
        user: 'User',
      },
    },
    logout: {
      args: {
        accessToken: 'String',
      },
      return: {
        accessToken: 'String',
      },
    },
    changePassword: {
      args: {
        oldPassword: 'String!',
        newPassword: 'String!',
      },
      return: 'User',
    },
  },
};

class Model extends BaseModel {
  constructor(app, options) {
    super(app, options, definition);
  }

  register({ id, username, password, locations }, params) {
    // checking for unique username with database

    return this.service.update(id, { username, password, locations }, params).then(data => data);
  }

  login({ credential, password, location }, params) {
    const auth = {
      strategy: 'local',
      username: credential,
      password,
      location,
    };
    delete params.authenticated;

    return this.app
      .service('/authentication')
      .create(auth, params)
      .then(data => data);
  }

  loginJwt({ accessToken }, params) {
    const auth = {
      strategy: 'jwt',
      accessToken,
    };
    return this.app.service('/authentication').create(auth, params);
  }

  logout({ accessToken }) {
    return this.app.service('/authentication').remove(accessToken);
  }

  async changePassword({ oldPassword, newPassword }, params) {
    const userId = params && params.user && params.user._id;

    const config = this.app.get('authentication');
    const passwordField = (config && config.local && config.local.passwordField) || 'password';
    const user = await this.get(userId);
    const check = await bcrypt.compare(oldPassword, user && user[passwordField]);
    if (check) return this.service.update(userId, { password: newPassword }, params);
    throw new GeneralError(new Error('Current password is invalid!'));
  }
}

export default Model;
