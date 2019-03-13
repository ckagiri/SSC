const assert = require('assert');
const app = require('../../api/app');

describe('\'city\' service', () => {
  it('registered the service', () => {
    const service = app.service('city');

    assert.ok(service, 'Registered the service');
  });
});
