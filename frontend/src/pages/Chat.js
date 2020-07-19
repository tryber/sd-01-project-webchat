import React, { useState } from 'react';
import socketIOClient from 'socket.io-client';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Input from '../components/Input';
import Bubble from '../components/Bubble';
import Btn from '../components/Btn';
import ListUserOn from '../components/ListUserOn';
import Login from '../components/Login';
import Notification from '../components/Notification';

const ENDPOINT = 'http://localhost:8080';
const socket = socketIOClient(ENDPOINT);

socket.on('notification', (name) => {
  document.querySelector('#notifications').innerHTML = `${name} chegou!`;
});

const socketDisconnect = (setConnect, nickname) => {
  socket.emit('logoff', nickname);
  setConnect(false);
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  connect: {
    width: '100%',
    maxWidth: 500,
  },
}));

const gridtwo = (classes, message, setMessage, setConnect, nickname) => (
  <>
    <Grid item xs={6}>
      <Btn
        variant="outlined"
        className={classes.paper}
        color="secondary"
        text="SAIR"
        onClick={() => socketDisconnect(setConnect, nickname)}
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
  </>
);

const submitMsg = (message, setMessage, nickname) => {
  const msg = { message, nickname };
  socket.emit('message', msg);
  setMessage('');
};

const gridTree = (classes, submitMsg, message, setMessage, nickname) => (
  <Grid item xs={6}>
    <Btn
      variant="contained"
      className={classes.paper}
      color="secondary"
      text="Enviar"
      onClick={() => submitMsg(message, setMessage, nickname)}
    />
  </Grid>
);

const typo = (classes) => (
  <Typography classe={classes.connect} variant="h5" gutterBottom>
    O Maior Bate Papo do Brasil
  </Typography>
);

const Chat = () => {
  const [nickname, setNickname] = useState('');
  const [message, setMessage] = useState('');
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [connect, setConnect] = useState(false);
  const classes = useStyles();
  window.onbeforeunload = () => socket.emit('logoff', nickname);
  socket.on('history', (messages) => setData(messages));
  socket.on('users', (connectedUsers) => setUsers(connectedUsers));
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
        {connect && <ListUserOn primary={users} />}
        {typo(classes)}
        {!connect && (
          <Login
            setConnect={setConnect}
            nickname={nickname}
            setNickname={setNickname}
          />
        )}
      </Grid>
      <Grid item xs={12}>
        <Bubble data={data} />
      </Grid>
      {connect && gridtwo(classes, message, setMessage, setConnect, nickname)}
      {connect && gridTree(classes, submitMsg, message, setMessage, nickname)}
      <Notification
        id="notifications"
        hidden={!connect}
        classe={classes.connect}
      />
    </Grid>
  );
};

export default Chat;
