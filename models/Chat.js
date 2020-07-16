const connection = require('./connectionMongoDB');

const getAll = async () =>
  connection()
    .then((db) => db.collection('messages').find().toArray());

const createMessage = async ({name, message, date}) => {
  return connection()
    .then((db) => db.collection('messages').insertOne({ name, message, date }))
    // .then(result => getNewAuthor({ id: result.insertedId, firstName, middleName, lastName }));
};

// console.log(getAll().then)
// getAll().then(result => console.log(result))
// console.log('hello')

module.exports = {
  getAll,
  createMessage,
};
