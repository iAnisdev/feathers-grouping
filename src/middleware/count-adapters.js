module.exports = (app) => {
  const mongoClient = app.get('mongoClient')
  const database = app.get('database')
  return async function countAdapters(req, res, next) {
    try {
      mongoClient.then(async client => {
        var adapterCollection = client.db(database).collection('Adapter')
        adapterCollection.aggregate([{$sortByCount: "$language" }]).toArray((error, result) => {
          res.json(result)
        })
      })
    } catch (e) {
      console.log('catch err ', e)
    }
  }
};
