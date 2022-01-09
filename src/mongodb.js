const MongoClient = require('mongodb').MongoClient;
const logger = require('./logger')

module.exports = async function (app) {
  const connection = app.get('mongodb');
  const database = connection.substr(connection.lastIndexOf('/') + 1);
  const port = connection.slice(connection.lastIndexOf(':') + 1, connection.lastIndexOf('/'));
  const mongoClient = MongoClient.connect(connection, {
    useNewUrlParser: true
  }).then((client) => {
    logger.log('info', `We are connected on Port:${port} to Database:${database}`)
    let languages = ['English', 'Hindi', 'Tamil']
    client.db(database).collection('Adapter').countDocuments(function (err, count) {
      if (count === 0) {
        let records_list = []
        for (var i = 0; i < 100; i++) {
          records_list.push({
            language: languages[Math.round(Math.random() * 2)]
          })
        }
        client.db(database).collection('Adapter').insertMany(records_list).then(() => {}).catch(err => {
          console.log("db entry err " , err)
        });
      }
    })
    return client
  }).catch((error) => {
    console.log("connect error " , error)
  })
  app.set('database', database);
  app.set('mongoClient', mongoClient);
};
