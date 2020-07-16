let socket = io();

function renderMessage(message) {
  $(".messages").append(
    `<div><i>${message.date}</i><strong> ${message.name}</strong>: ${message.message}</div>`
    );
}

socket.on('previousMessages', (messages) => {
  for (message of messages) {
    renderMessage(message);
  };
});

socket.on('receivedMessage', (message) => {
  $.notify("Nova Mensagem!");
  renderMessage(message);
});

$('#chat').submit(function (event) {
  event.preventDefault();

  let name = $('input[name=username]').val();
  let message = $('input[name=message]').val();

  let messageObject = { name, message, date: new Date() };

  renderMessage(messageObject);

  socket.emit('sendMessage', messageObject);
});
