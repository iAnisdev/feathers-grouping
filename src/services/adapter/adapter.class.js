const { Service } = require('feathers-mongodb');

exports.Adapter = class Adapter extends Service {
  constructor(options, app) {
    super(options);
    // app.get('mongoClient').then(db => {
    //   this.Model = db.collection('Adapter');
    // });
  }
};
