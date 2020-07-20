const connection = require('../services/connection');

class Message {
  constructor({ content, author }) {
    this.content = content;
    this.author = author;
  }

  async create() {
    try {
      const { content, author } = this;
      const db = await connection();
      return await db.collection('messages').insertOne({
        content: content,
        hour: new Date(),
        author: author,
      });
    } catch (err) {
      throw err;
    }
  }

  static getAll = async () => {
    try {
      const db = await connection();
      const data = await db.collection('messages').find().toArray();
      if (!data) {
        const notFoundError = new Error('NotFoundError');
        notFoundError.details = `Nada encontrado`;
        throw notFoundError;
      }
      return data;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Message;
