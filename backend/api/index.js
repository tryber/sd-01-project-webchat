const server = require('./server');

const PORT = process.env.PORT || 3001;

server.listen(PORT, () =>
  console.log(`Conectado na porta http://localhost:${PORT}`),
);
