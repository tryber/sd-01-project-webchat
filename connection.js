const mongoClient = require('mongodb').MongoClient;

const MONGO_DB_URL = 'mongodb://127.0.0.1:27017';

const connection = () => {
  return mongoClient
    .connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db('web_chat'))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};

const getAll = async () => connection().then((db) => db.collection('messages').find().toArray());

const sendMessage = async (message, nickname, date) => connection()
  .then((db) => db.collection('messages').insertOne({ message, nickname, date }));

module.exports = { getAll, sendMessage };
