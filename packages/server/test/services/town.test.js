const assert = require('assert');
const app = require('../../api/app');

describe('\'town\' service', () => {
  it('registered the service', () => {
    const service = app.service('town');

    assert.ok(service, 'Registered the service');
  });
});
