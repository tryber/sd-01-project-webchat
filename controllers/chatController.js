const express = require('express');
const path = require('path');

const router = express.Router();

const showChat = async (_req, res) => {
  try {
    res.status(200);
    res.sendFile(path.resolve(__dirname, '..', 'view', 'index.html'));
  } catch (err) {
    console.log(err);
    res.status(500);
    res.json({ message: 'Algo deu errado' });
  }
};

router.get('/', showChat);

module.exports = {
  chatRouter: router,
  showChat,
};
