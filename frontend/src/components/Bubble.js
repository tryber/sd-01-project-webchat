// const Box = ({ message }) => <div className='messages'>{message}</div>;

// export default Box;

import React from 'react';
import formatDate from "../service/formatDate";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  container: {
    bottom: 0,
  },
  bubbleContainer: {
    width: '100%',
    display: 'flex',
  },
  bubble: {
    border: '0.5px solid black',
    borderRadius: '10px',
    margin: '5px',
    padding: '10px',
    display: 'inline-block',
  },
}));

const Bubble = ({ user, message }) => {
  const classes = useStyles();
  const date = formatDate();
  const chatBubbles = message.map((msg, i = 0) => (
    <div  className={`${classes.bubbleContainer}`} key={i}>
      <div key={i++} className={classes.bubble}>
        <div className={classes.button}>{`${date} →  ${user}: ${msg}`}</div>
      </div>
    </div>
  ));
  return <div className={classes.container}>{chatBubbles}</div>;
};

export default Bubble;
