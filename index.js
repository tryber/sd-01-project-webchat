const mongo = require('mongodb').MongoClient;
const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (_req, res) => {
  res.render('index.html');
});

io.on('connection', socket => {
  console.log(`Socket conectado ${socket.id}`);

  socket.on('sendMessage', data => {
    console.log(data);
  });
});

server.listen(3000, () => console.log('Conectado na porta 3000'));
