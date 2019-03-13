const assert = require('assert');
const app = require('../../api/app');

describe('\'Test\' service', () => {
  it('registered the service', () => {
    const service = app.service('test');

    assert.ok(service, 'Registered the service');
  });
});
