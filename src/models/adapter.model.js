module.exports = function (app) {
  const modelName = 'adapter';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    document: {
      type: String,
      required: true
    }
  }, {
    timestamps: true,
    collection: 'Adapter',
    versionKey: false,
    toJSON: {
      virtuals: true,
      versionKey: false
    },
    toObject: {
      virtuals: true,
      versionKey: false
    }
  });
  return mongooseClient.model(modelName, schema);
};
