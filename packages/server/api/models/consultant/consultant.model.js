import R from 'ramda';
import { registerContactValidation } from '@ssc/common';

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

  async register({ customer }) {
    // verify data
    // const cust = await registerContactValidation.validate({});
    // setting discount

    return this.app.models.contact.create({});
    // return { ...customer, category: 'Customer' };
  }
}

export default Model;
