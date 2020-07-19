const mongoClient = require('mongodb').MongoClient;

const URL = 'mongodb://127.0.0.1:27017';

module.exports = () => {
  return mongoClient
    .connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db('webchat'))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};
