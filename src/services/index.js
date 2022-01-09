const adapter = require('./adapter/adapter.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(adapter);
};
