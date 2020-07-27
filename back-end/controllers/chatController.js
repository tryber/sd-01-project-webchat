const Webchat = require('../models/Webchat');

exports.listAll = async () => {
  try {
    const list = await Webchat.list();
    return list;
  } catch (err) {
    console.log(err);
  }
};

exports.createMessage = async ({ author, text }) => {
  try {
    const webchat = new Webchat(author, text);
    const result = await webchat.create();
    if (!result) throw new Error('[ERROR] Something happened!');
  } catch (err) {
    console.log(err);
  }
};
