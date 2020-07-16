import React, { useState } from 'react';
import io from 'socket.io-client';
import OnlineUsers from './OnlineUsers';
import './Webchat.css';
import Login from './Login';

const socket = io('http://localhost:8080');

socket.on('notification', (nickname) => {
  document.querySelector('#notifications').innerHTML = `${nickname} chegou!`;
});

function socketDisconnect(setConnected, nickname) {
  socket.emit('logoff', nickname);
  setConnected(false);
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

  window.onbeforeunload = () => socket.emit("logoff", nickname);
  socket.on('users', connectedUsers => setUsers(connectedUsers));
  socket.on('history', messages => setData(messages));
  return (
    <div className="content">
      {connected && <OnlineUsers users={users} />}
      {!connected && <Login setConnected={setConnected} nickname={nickname} setNickname={setNickname} />}
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
