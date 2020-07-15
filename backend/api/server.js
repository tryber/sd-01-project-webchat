const express = require('express');
const path = require('path');
const service = require('./router');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, '..', 'public')));
app.set('views', path.join(__dirname, '..', 'public'));
app.engine('html', require('ejs').renderFile);
app.set('views engine', 'html');

app.use('/', service.main);

let messages = [];

io.on('connection', socket => {
  socket.emit('previousMessages', messages)
  socket.on('sendMessage', data => {
    messages.push(data);
    socket.broadcast.emit('receivedMessage', data);
  });
});

module.exports = server;
