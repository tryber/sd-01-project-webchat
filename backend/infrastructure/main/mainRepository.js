const connection = require('../database/connection');

class mainRepository {
  constructor(nickname, message) {
    this.nickname = nickname;
    this.message = message;
  }

  static async list() {
    const db = await connection();
    const result = await db
      .collection('messages')
      .find()
      .sort({ _id: -1 })
      .toArray();
    return result;
  }

  async create() {
    const { message, nickname } = this;
    const db = await connection();
    const result = await db.collection('messages').insertOne({
      message: message,
      date: new Date().toLocaleString(),
      nickname: nickname,
    });
    return result;
  }
}

module.exports = mainRepository;
