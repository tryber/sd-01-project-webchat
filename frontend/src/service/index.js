const socket = io('http://localhost:3001');

function renderMessage({ author, message }) {
  $('.messages').append(
    `<div class="message"><strong>→ ${author}</strong>: ${message}</div>`,
  );
}

socket.on('receivedMessage', message => renderMessage(message));

socket.on('previousMessages', mongoDB =>
  mongoDB.forEach(element => renderMessage(element)),
);

$('#chat').submit(e => {
  e.preventDefault();
  const author = $('input[name=username]').val();
  const message = $('input[name=message]').val();

  if (author.length && message.length) {
    const messageObject = {
      author,
      message,
    };

    renderMessage(messageObject);

    socket.emit('sendMessage', messageObject);
  }
});