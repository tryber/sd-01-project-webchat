const connection = require('./connectionMongo');

const getAll = () => connection().then((db) => db.collection('messages').find().toArray());

const createMessage = ({ name, message, date }) => {
  return connection()
    .then((db) => db.collection('messages').insertOne({ name, message, date }));
};

module.exports = {
  getAll,
  createMessage,
}
