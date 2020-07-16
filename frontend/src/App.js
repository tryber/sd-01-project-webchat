import React, { useState, useEffect } from 'react';
import './App.css';

import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://localhost:3001';

const socket = socketIOClient(ENDPOINT);

function renderMessage(elem) {
  const { author, message } = elem;
  return { author, message };
}

socket.on('receivedMessage', message => renderMessage(message));

socket.on('previousMessages', mongoDB =>
  mongoDB.forEach(element => renderMessage(element)),
);

function submitDataMongoDb(e, values, setDivs) {
  e.preventDefault();

  const { username: author, message } = values;
  setDivs({ username: author, message });
  if (!author && !message) {
    const messageObject = {
      author,
      message,
    };

    console.log('value tá de boa?', messageObject);

    socket.emit('sendMessage', messageObject);
  }
}

// $('#chat').submit(e => {
//   e.preventDefault();
//   const author = $('input[name=username]').val();
//   const message = $('input[name=message]').val();

//   if (author.length && message.length) {
//     const messageObject = {
//       author,
//       message,
//     };

//     renderMessage(messageObject);

//     socket.emit('sendMessage', messageObject);
//   }
// });

const App = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [divs, setDivs] = useState({ username: '', message: '' });
  // const [rend, setRend] = useState(true);

  const values = {
    username,
    message,
  };

  // useEffect(() => {
  // }, [divs])

  return (
    <div>
      <form id='chat'>
        <br />
        <h1>O Maior Bate Papo do Brasil</h1>
        <br />
        <input
          type='text'
          value={username}
          onChange={event => setUsername(event.target.value)}
          placeholder='Digite seu usuário'
        />
        <div className='messages'>
          <div className="message">
          <strong>{divs.username}</strong> {divs.message}
          </div>
        </div>
        <input
          type='text'
          value={message}
          onChange={event => setMessage(event.target.value)}
          placeholder='Digite sua mensagem'
        />
        <button
          type='submit'
          onClick={e => submitDataMongoDb(e, values, setDivs)}>
          Enviar
        </button>
      </form>
    </div>
  );
};

export default App;
