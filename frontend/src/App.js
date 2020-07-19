import React, { Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Chat from './pages/Chat';

export default function App() {
  return (
    <Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Chat />
      </Container>
    </Fragment>
  );
}
