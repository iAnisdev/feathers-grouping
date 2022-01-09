module.exports = (app) => {
  const mongooseClient = app.get('mongooseClient');
  return async function countAdapters(req, res, next) {
    const {  adapter } = mongooseClient.models
    try {
      const results = await adapter.aggregate().sortByCount('language')
      results.map((record) => {
        record.language = record._id
        record.sum = record.count
        delete record._id
        delete record.count
        return record
      })
      res.json(results)
    } catch (error) {
      console.log("error " , error)
    }

  }
};
