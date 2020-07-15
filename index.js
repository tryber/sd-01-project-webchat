const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const { getAll, sendMessage } = require('./connection');

let nickname = '';

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function formatTime(time) {
  const hours = time.getHours();
  const minutes = checkTime(time.getMinutes());
  const seconds = checkTime(time.getSeconds());
  return hours + ":" + minutes + ":" + seconds;
}
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', async (socket) => {
  socket.broadcast.emit('mensagemServer');
  const messages = await getAll();
  console.log('conectado');
  messages.forEach(({ message, nickname, date }) =>
    socket.emit('mensagemServer', { message, nickname, time: formatTime(date) }));

  socket.on('disconnect', () => {
    console.log('desconectado')
    io.emit('adeus', { mensagem: 'Poxa, fica mais, vai ter bolo :)' });
  });

  socket.on('mensagem', async (msg) => {
    if (!nickname) return console.log('voce precisa me dizer seu nome heeh!');
    const timestamp = new Date();
    await sendMessage(msg, nickname, timestamp);
    io.emit('mensagemServer', { message: msg, nickname, time: formatTime(timestamp) });
  });

  socket.on('nickname', name => nickname = name);
});

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});
