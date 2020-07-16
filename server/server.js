const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const webchat = require('../controllers/webchatController');

let users = [];

io.on('connection', async (socket) => {
  io.emit('history', await webchat.listAll());

  socket.on('login', nickname => {
    users.push(nickname);
    io.emit('users', users);
    io.emit('notification', nickname);
  });

  socket.on('logoff', nickname => {
    users = users.filter(user => user !== nickname);
    io.emit('users', users);
  });

  socket.on('message', async data => {
    await webchat.createMessage(data);
    io.emit('history', await webchat.listAll());
  });
});

http.listen(8080, () => {
  console.log('Servidor ouvindo na porta 8080');
});

module.exports = app;
