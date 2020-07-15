const express = require('express');
const cors = require('cors');
const message = require('../controllers/message');

const app = express();
app.use(cors());
app.use(express.json());

function factory() {
  app.get('/message', message.create);
  app.post('/message', message.getAll);

  app.use((req, res) => (
    res.status(404).json({ message: 'SHOW DE BOLA NADA APARECEU' })
  ));
  return app;
}

module.exports = {
  factory,
};
