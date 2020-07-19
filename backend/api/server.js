const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const chat = require('../application/controller/main');

let allUsers = [];

io.on('connection', async (socket) => {
  io.emit('history', await chat.listAll());

  socket.on('login', (nickname) => {
    allUsers.push(nickname);
    io.emit('users', allUsers);
    io.emit('notification', nickname);
  });

  socket.on('logoff', (nickname) => {
    allUsers = allUsers.filter((user) => user !== nickname);
    io.emit('users', allUsers);
  });

  socket.on('message', async (data) => {
    await chat.createMessage(data);
    io.emit('history', await chat.listAll());
  });
});

http.listen(8080, () => {
  console.log('Servidor ouvindo na porta 8080');
});

module.exports = app;
