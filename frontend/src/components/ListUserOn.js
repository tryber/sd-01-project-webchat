import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
}));

const ListUserOn = ({ primary }) => {
  const classes = useStyles();

  return (
    <List className={classes.root} subheader={<li />}>
      <ListSubheader>Usuários conectados</ListSubheader>
      <ListItem>
        <ListItemText primary={` on: ${primary} `} />
      </ListItem>
    </List>
  );
};

export default ListUserOn;
