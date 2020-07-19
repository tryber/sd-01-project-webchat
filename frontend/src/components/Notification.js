import React from 'react';
import Typography from '@material-ui/core/Typography';

const Notification = ({ hidden, classes }) => (
  <Typography
    id="notifications"
    hidden={hidden}
    classe={classes}
    variant="button"
    display="block"
    gutterBottom
  />
);

export default Notification;
