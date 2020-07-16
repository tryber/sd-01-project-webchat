let socket = io('http://localhost:3000');

$('#chat').submit(function(event) {
  event.preventDefault();

  let author = $('input[name=username]').val();
  let message = $('input[name=message]').val();
  
  let messageObject = { author, message };

  socket.emit('sendMessage', messageObject);
});
