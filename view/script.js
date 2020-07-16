const socket = io('http://localhost:3000');

// function renderMessage({ name, message, date }) {
//   $(".messages").append(`<div><strong>${name}</strong>: ${message}</div>`);
// }

function renderMessage(message) {
  $(".messages").append('<div><strong>' + message.name + '</strong>: ' + message.message + ' </div>');
}

socket.on('previousMessages', (messages) => {
  for (message of messages) {
    renderMessage(message);
  };
});

socket.on('receivedMessage', (message) => {
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

{/* <script src="script.js"></script> */ }
