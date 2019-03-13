import R from 'ramda';
import BaseModel from '../../bin/model';

const definition = {
  root: true,
  readOnly: true,
  hidden: true,
  collection: 'town',
  sort: { prefix: -1, name: 1 },
  properties: {
    name: {
      type: 'String',
      required: true,
      sortable: true,
      search: true,
    },
    prefix: 'String*',
    city: {
      type: 'City',
      search: true,
    },
  },
};
class Model extends BaseModel {
  constructor(app, options) {
    super(app, options, definition);
  }

  find(params) {
    if (params && params.query && params.query[this.id] && params.query[this.id].$in) {
      params.query[this.id].$in = R.map(Number)(params.query[this.id].$in);
    }
    return super.find(params);
  }
}

export default Model;
