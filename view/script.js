const socket = io();

function renderMessage({ name, message, date }) {
  $(".messages").append(`<div>${new Date(date).toLocaleString("pt-BR")} <strong>${name}</strong>: ${message}</div>`);
}

socket.on('previousMessages', (messages) => {
  for (message of messages) {
    renderMessage(message);
  };
});

socket.on('receivedMessage', (message) => {
  $.notify("Você recebeu uma nova mensagem", "info");
  renderMessage(message);
});

$("#chat").submit(function (event) {
  event.preventDefault();

  const name = $('input[name=username]').val();
  const message = $('input[name=message]').val();

  if (name.length && message.length) {
    const messageObj = {
      name,
      message,
      date: new Date(),
    };

    renderMessage(messageObj);

    socket.emit("sendMessage", messageObj);
  }
});
