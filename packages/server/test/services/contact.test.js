const assert = require('assert');
const app = require('../../api/app');

describe('\'Contact\' service', () => {
  it('registered the service', () => {
    const service = app.service('contact');

    assert.ok(service, 'Registered the service');
  });
});
