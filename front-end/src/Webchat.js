import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './Webchat.css';

const socket = io('http://localhost:8080');

socket.on('notification', (nickname) => {
  document.querySelector('#notifications').innerHTML = `${nickname} chegou!`;
});

function socketConnect(nickname) {
  socket.on('connection');
  socket.emit('login', nickname);
}

function socketDisconnect(setConnected, nickname) {
  socket.emit('logoff', nickname);
  setConnected(false);
}

function handleSubmit(event, setConnected, nickname) {
  event.preventDefault();
  socketConnect(nickname);
  setConnected(true);
}

function sendMessage(text, author) {
  socket.emit('message', { text, author });
}

function Webchat() {
  const [connected, setConnected] = useState(false);
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [nickname, setNickname] = useState('');
  const [message, setMessage] = useState('');

  window.onbeforeunload = function() {
    socket.emit("logoff", nickname);
  }

  socket.on('users', connectedUsers => setUsers(connectedUsers));
  socket.on('history', messages => setData(messages));

  return (
    <div className="content">
      {connected && <div>
        <p>Conectados atualmente:</p>
        {users.map(user => <p key={user}>{user}</p>)}
      </div>}
      {!connected && 
      <form onSubmit={(e) => handleSubmit(e, setConnected, nickname)}>
        <input type="text" required onChange={(e) => setNickname(e.target.value)} placeholder="Nickname"/>
        <button type="submit">Entrar</button>
      </form>}
      <div>
        {connected && <div>
          <ul className="chat">{data.map((message, index) => <li key={index}>{message.date} - {message.author} - {message.text}</li>)}</ul>
          <input type="text" onChange={(e) => setMessage(e.target.value)} placeholder="Mensagem"/>
          <button onClick={() => sendMessage(message, nickname)}>Enviar</button>
          <button onClick={() => socketDisconnect(setConnected, nickname)}>Sair</button>
        </div>}
        <p id="notifications" hidden={!connected} />
      </div>
    </div>
  );
}

export default Webchat;
