const mongoose = require('mongoose');
const logger = require('./logger');

module.exports = function (app) {
  mongoose.connect(app.get('mongodb'), {  useNewUrlParser: true }).catch(err => {
    logger.error(err);
    process.exit(1);
  });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', async function () {
    const adapterModel = mongoose.models.adapter
    let count =  await adapterModel.countDocuments()
    if(count === 0){
      try{
       let languages = ['English', 'Hindi', 'Tamil']
        let records_list = []
        for(var i = 0; i < 100; i++){
          records_list.push({
            language:  languages[Math.round(Math.random() * 2)]
          })
        }
        adapterModel.insertMany(records_list).then(function(){
          logger.log('info' , `Multiple record added to adapter model`)
        }).catch((err) =>{
          console.log("adding multiple recods error => " , err)
        })
      }catch(e){
        console.log(e)
      }
    }
    logger.log('info' , `We are connected on Port:${db.port} to Database:${db.name}`)
  });

  app.set('mongooseClient', mongoose);
};
