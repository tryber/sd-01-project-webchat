const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const { getAll, sendMessage } = require('./connection');
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', async (socket) => {
  socket.broadcast.emit('mensagemServer');
  const messages = await getAll();
  messages.forEach(({ message }) => socket.emit('mensagemServer', message));

  socket.on('disconnect', () => {
    console.log('desconectado')
    io.emit('adeus', { mensagem: 'Poxa, fica mais, vai ter bolo :)' });
  });
  socket.on('mensagem', async (msg) => {
    await sendMessage(msg);
    io.emit('mensagemServer', msg);
  });
});
http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});
