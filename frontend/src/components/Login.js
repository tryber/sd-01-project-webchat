import React from 'react';
import Grid from '@material-ui/core/Grid';
import Input from './Input';
import Btn from './Btn';

import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://localhost:8080';
const socket = socketIOClient(ENDPOINT);

const handleSubmit = (e, setConnect, nickname) => {
  e.preventDefault();
  socket.on('connection');
  socket.emit('login', nickname);
  setConnect(true);
};

const Login = ({ setConnect, nickname, setNickname }) => (
  <div>
    <Grid item xs={6}>
      <Input
        type="text"
        hintText="Escreve seu usuário"
        textBtn="Login"
        value={nickname}
        onChange={(value) => setNickname(value)}
      />
    </Grid>
    <br />
    <Grid item xs={6}>
      <Btn
        variant="contained"
        color="primary"
        text="Entrar"
        onClick={(e) => handleSubmit(e, setConnect, nickname)}
      />
    </Grid>
  </div>
);

export default Login;
