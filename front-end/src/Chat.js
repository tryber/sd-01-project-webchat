import React, { useState } from 'react';
import io from 'socket.io-client';
import { toast } from 'react-toastify';
import Online from './Online';
import Login from './Login';
import 'react-toastify/dist/ReactToastify.css';
import './Webchat.css';

const socket = io('http://localhost:8080');

const notify = (name) => {
  toast.success(`${name} chegou!`, {
    position: toast.POSITION.BOTTOM_LEFT,
    autoClose: 4000,
  });
}

socket.on('notification', (name) => {
  notify(name);
});

function socketDisconnect(setConnected, name) {
  socket.emit('logoff', name);
  setConnected(false);
}

function sendMessage(text, author) {
  socket.emit('message', { text, author });
}

function Chat() {
  const [connected, setConnected] = useState(false);
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [name, setname] = useState('');
  const [message, setMessage] = useState('');

  window.onbeforeunload = () => socket.emit("logoff", name);
  socket.on('users', connectedUsers => setUsers(connectedUsers));
  socket.on('history', messages => setData(messages));
  return (
    <div className="main-content">
      {connected && <Online users={users} />}
      {!connected && <Login setConnected={setConnected} name={name} setname={setname} />}
      <div>
        {connected && <div>
          <ul className="room">{data.map((message, index) => <li key={index}>{message.date} - {message.author} - {message.text}</li>)}</ul>
          <input type="text" onChange={(e) => setMessage(e.target.value)} placeholder="Mensagem"/>
          <button onClick={() => sendMessage(message, name)}>Enviar</button>
          <button onClick={() => socketDisconnect(setConnected, name)}>Sair</button>
        </div>}
      </div>
    </div>
  );
}

export default Chat;
