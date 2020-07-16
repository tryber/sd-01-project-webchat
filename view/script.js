const socket = io();

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

$("#chat").submit((event) => {
  event.preventDefault();

  const name = $('input[name=username]').val();
  const message = $('input[name=message]').val();

  if (name.length && message.length) {
    const messageObj = {
      name,
      message,
    };

    renderMessage(messageObj);

    socket.emit("sendMessage", messageObj);
  }
});

{/* <script src="script.js"></script> */}
