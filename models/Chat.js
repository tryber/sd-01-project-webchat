const connection = require('./connectionMongoDB');

const getAll = async () =>
  connection()
    .then((db) => db.collection('messages').find().toArray());

const createMessage = async ({name, message, date}) => 
  connection()
    .then((db) => db.collection('messages').insertOne({ name, message, date }));

module.exports = {
  getAll,
  createMessage,
};
