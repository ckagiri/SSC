const { MongoClient } = require('mongodb');

module.exports = function mongodb() {
  const app = this;
  const config = app.get('mongodb');
  const promise = MongoClient.connect(config);

  app.set('mongoClient', promise);
};
