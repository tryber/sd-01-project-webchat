import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import sortColor from '../service/sortColor';

const useStyles = makeStyles(() => ({
  container: {
    bottom: 0,
  },
  bubbleContainer: {
    width: '100%',
    display: 'flex',
  },
  bubble: {
    backgroundColor: sortColor,
    border: '0.5px solid black',
    borderRadius: '10px',
    margin: '5px',
    padding: '10px',
    display: 'inline-block',
  },
}));

const Bubble = ({ data }) => {
  const classes = useStyles();
  const chatBubbles = data.map((msg, i = 0) => (
    <div className={`${classes.bubbleContainer}`} key={i}>
      <div key={i++} className={classes.bubble}>
        <div
          className={classes.button}
        >{`${msg.date} →  ${msg.nickname}: ${msg.message}`}</div>
      </div>
    </div>
  ));
  return <div className={classes.container}>{chatBubbles}</div>;
};

export default Bubble;
