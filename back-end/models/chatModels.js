const connection = require('../services/connection');

class Webchat {
  constructor(author, text) {
    this.author = author;
    this.text = text;
  }

  static list = async () => {
    const db = await connection();
    const result = await db.collection('messages').find().sort({ _id: -1 }).toArray();
    return result;
  }

  create = async () => {
    const { text, author } = this;
    if (!text || !author) return false;
    const db = await connection();
    const result = await db.collection('messages').insertOne({
      text: text,
      date: new Date().toLocaleString(),
      author: author,
    });
    return result;
  }
}

module.exports = Webchat;
