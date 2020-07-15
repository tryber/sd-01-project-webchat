import React, { useState } from 'react';
import ItemMessage from './ItemMessage';
import Nickname from './Nickname';
import InputMessage from './InputMessage';
import io from 'socket.io-client';

const socket = io('http://localhost:4555');
socket.on('connect', () => console.log('foi'))

function Chat() {
  const [messages, setMessages] = useState();
  const [nickname, setNickname] = useState();

  const sendMessage = (content) => {
    console.log('foi')
    socket.emit('message', {
      content,
      author: nickname,
    })
  }

  return (
    <main className="Chat">
      <Nickname nickname={nickname} setNickname={(name) => setNickname(name)} />
      <ul>
        {!messages || messages.map((data) => (
          <ItemMessage att={data} />
        ))}
      </ul>
      <InputMessage sendMessage={(value) => sendMessage(value)} />
    </main>
  );
}

export default Chat;
