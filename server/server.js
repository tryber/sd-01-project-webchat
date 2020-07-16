const express = require('express');
const path = require('path');

const chatRouter = require('../controllers/chatController');
const { getAll, createMessage } = require('../models/chatMessage');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, '..', 'view')));
app.set('views', path.join(__dirname, '..', 'view'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', chatRouter);

io.on('connection', async (socket) => {
  console.log(`Conectado ${socket.id}`);

  const listMessages = await getAll();

  socket.emit('previousMessages', listMessages);

  socket.on('sendMessage', async (msg) => {

    await createMessage(msg);

    socket.broadcast.emit('receivedMessage', msg);
  });
});

module.exports = server;
