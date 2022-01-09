const countAdapters = require('./count-adapters');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.get('/count/adapters', countAdapters(app));
};
