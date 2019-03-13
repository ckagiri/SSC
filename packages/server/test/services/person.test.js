const assert = require('assert');
const app = require('../../api/app');

describe('\'Person\' service', () => {
  it('registered the service', () => {
    const service = app.service('person');

    assert.ok(service, 'Registered the service');
  });
});
