import R from 'ramda';
import { registerContactValidation, processValidationError } from '@ssc/common';
import { BadRequest } from '@feathersjs/errors';

import BaseModel from '../../bin/model';

const definition = {
  methods: {
    register: {
      description: 'Đăng ký khách hàng mới',
      args: {
        customer: 'Customer!',
      },
      return: 'Customer',

      roles: ['default'],
    },
  },
};

class Model extends BaseModel {
  constructor(app, options) {
    super(app, options, definition);
  }

  async register({ customer }, context) {
    let data;
    try {
      data = await registerContactValidation.validate(customer);
    } catch (e) {
      throw new BadRequest('Thông tin không đúng', { errors: processValidationError(e) });
    }
    return this.app.models.contact.create({ ...data, category: 'Customer' }, context);
  }
}

export default Model;
