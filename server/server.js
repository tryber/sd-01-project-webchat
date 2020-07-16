const express = require('express');
const path = require('path');

const { chatRouter } = require('../controllers/chatController');
const { getAll, createMessage } = require('../models/Chat');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(path.resolve(__dirname, '..', 'style')));

app.use('/', chatRouter);

io.on('connection', async (socket) => {
  console.log('Conectado');

  const listMessages = await getAll();

  socket.emit('previousMessages', listMessages);

  socket.on('sendMessage', async (msg) => {

    await createMessage(msg)

    socket.broadcast.emit('receivedMessage', msg);
  });
});


module.exports = http;
