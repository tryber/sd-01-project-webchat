import React from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:8080');

function handleSubmit(event, setConnected, nickname) {
  event.preventDefault();
  socket.on('connection');
  socket.emit('login', nickname);
  setConnected(true);
}

function Login({ setConnected, nickname, setNickname }) {
  return (
    <form onSubmit={(e) => handleSubmit(e, setConnected, nickname)}>
      <input type="text" required onChange={(e) => setNickname(e.target.value)} placeholder="Nickname"/>
      <button type="submit">Entrar</button>
    </form>
  );
}

export default Login;
