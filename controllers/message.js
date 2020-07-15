const Message = require('../models/message');

exports.create = async (req, res) => {
  const { content, author, hour } = req.body;
  try {
    const data = await Message.create({ content, author, hour });
    return res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const data = await Message.getAll();
    return res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
