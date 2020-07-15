// const express = require('express');
// const cors = require('cors');
// const message = require('../controllers/message');

// const app = express();
// app.use(cors());
// app.use(express.json());

// function factory() {
//   app.post('/message', message.create);
//   app.get('/message', message.getAll);

//   app.use((req, res) => (
//     res.status(404).json({ message: 'SHOW DE BOLA NADA APARECEU' })
//   ));
//   return app;
// }

// module.exports = {
//   factory,
// };
const express = require('express');
const app = express();
const server = require('http').createServer(app).listen(4555);
const io = require('socket.io').listen(server);
const bodyParser = require('body-parser');
const message = require('../controllers/message');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

io.on("connection", (socket) => {
  console.log('logou')
  socket.on('disconnect', () => {
    io.emit('adeus', { message: 'Poxa, fica mais, vai ter bolo :)' });
  });

  socket.on('message', async (data) => {
    const value = await message.create(data)
    console.log(data)
    io.emit('messageServer', value);
  });
});

app.listen(8080);
console.log(`Conectado a porta ${8080}`);



