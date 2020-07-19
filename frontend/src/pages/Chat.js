import React, { useState } from 'react';
import Input from '../components/Input';
import Bubble from '../components/Bubble';
import Btn from '../components/Btn';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

// import io from 'socket.io-client';

// const socket = io('http://localhost:3001');

// const handleSubmit = (e, setConnected, username) => {
//   e.preventDefault();
//   socket.on('connection');
//   socket.emit('login', username);
//   setConnected(true);
// };

// import socketIOClient from 'socket.io-client';

// import Chat from './components/Login';

// const ENDPOINT = 'http://localhost:3001';

// const socket = socketIOClient(ENDPOINT);

// function renderMessage(elem) {
//   const { author, message } = elem;
//   return { author, message };
// }

// socket.on('receivedMessage', message => renderMessage(message));

// socket.on('previousMessages', mongoDB =>
//   mongoDB.forEach(element => renderMessage(element)),
// );

// function submitDataMongoDb(e, values, setDivs) {
//   e.preventDefault();

//   const { username: author, message } = values;
//   setDivs({ username: author, message });
//   if (!author && !message) {
//     const messageObject = {
//       author,
//       message,
//     };
//     console.log('value tá de boa?', messageObject);
//     socket.emit('sendMessage', messageObject);
//   }
// }

// const printMessage = (msg, user) =>
//   msg.map(message => {
//     return (
//       <div className='message'>
//         <strong>{`→${user}: `}</strong> {message}
//       </div>
//     );
//   });

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const submitUser = (value, setUser, setUsername, setMessage) => {
  setUser(value);
  setUsername('');
  setMessage('');
};

const submitMsg = (value, msg, setMsg, setUsername, setMessage) => {
  setMsg([...msg, value]);
  setUsername('');
  setMessage('');
};

const reset = (setMsg, setUser, setUsername, setMessage) => {
  setUsername('');
  setMessage('');
  setMsg([]);
  setUser('');
};

const Chat = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [msg, setMsg] = useState([]);
  const [user, setUser] = useState('');

  const classes = useStyles();

  return (
    <Grid
      container
      component="main"
      className={classes.root}
      spacing={0}
      alignItems="center"
      justify="center"
    >
      <Grid container spacing={3}>
        <Typography variant="h5" gutterBottom>
          O Maior Bate Papo do Brasil
        </Typography>

        <Grid item xs={6}>
          <Input
            className={classes.paper}
            type="text"
            hintText="Escreve seu usuário"
            textBtn="Login"
            value={username}
            onChange={(value) => setUsername(value)}
          />
        </Grid>
        <Grid item xs={6}>
          <Btn
            variant="contained"
            className={classes.paper}
            color="primary"
            text="Entrar"
            onClick={() =>
              submitUser(username, setUser, setUsername, setMessage)
            }
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Bubble user={user} message={msg} />
      </Grid>

      {user && (
        <Grid item xs={6}>
          <Btn
            variant="outlined"
            className={classes.paper}
            color="secondary"
            text={`Logout: ${user}`}
            onClick={() => reset(setMsg, setUser, setUsername, setMessage)}
          />
          <Input
            className={classes.paper}
            value={message}
            type="text"
            hintText="Digite sua mensagem"
            textBtn="Enviar"
            onChange={(value) => setMessage(value)}
          />
        </Grid>
      )}
      {user && (
        <Grid item xs={6}>
          <Btn
            variant="contained"
            className={classes.paper}
            color="secondary"
            text="Enviar"
            onClick={() =>
              submitMsg(message, msg, setMsg, setUsername, setMessage)
            }
          />
        </Grid>
      )}
    </Grid>
  );
};

export default Chat;
