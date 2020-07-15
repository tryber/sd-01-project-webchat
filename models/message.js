const connection = require('./connection');

class Message {
  constructor({ content, hour, author }) {
    this.content = content;
    this.hour = hour;
    this.author = author;
  }

  async create() {
    const { content, hour, author } = this;
    try {
      const db = await connection();
      return await db.collection('messages').insertOne({
        content: content,
        hour: hour,
        author: author,
      });
    } catch (err) {
      throw err;
    }
  }

  async getAll() {
    try {
      const db = await connection();
      const data = await db.collection('messages').find().toArray();
      if (!data) return resolve(null);

      return data;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Message;
