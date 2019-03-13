import * as R from 'ramda';
import BaseModel from '../../bin/model';

const definition = {
  name: 'City',
  root: true,
  readOnly: true,
  hidden: true,
  sort: { name: 1 },
  collection: 'city',
  properties: {
    name: {
      type: 'String?',
      required: true,
      unique: true,
      sortable: true,
      search: true,
    },
    prefix: 'String*',
    towns: {
      type: ['Town'],
    },
  },
};

class Model extends BaseModel {
  constructor(app, options) {
    super(app, options, definition);
  }

  find(params) {
    if (
      params &&
      params.query &&
      params.query[this.id] &&
      params.query[this.id].$in
    ) {
      params.query[this.id].$in = R.map(Number)(
        params.query[this.id].$in,
      );
    }
    return super.find(params);
  }
}

export default Model;
