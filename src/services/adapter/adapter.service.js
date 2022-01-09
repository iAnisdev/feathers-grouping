// Initializes the `adapter` service on path `/adapter`
const { Adapter } = require('./adapter.class');
const hooks = require('./adapter.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/adapter', new Adapter(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('adapter');

  service.hooks(hooks);
};
