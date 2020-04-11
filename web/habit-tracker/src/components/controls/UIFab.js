import React from 'react';
import { Fab, withStyles } from '@material-ui/core';
import { styles } from '../../styles/controls/UIFab.styles';

const UIFab = (props) => {
  const { classes } = props;
  return (
    <Fab className={classes.fab} onClick={props.onClick}>
      {props.children}
    </Fab>
  );
};

export default withStyles(styles, { withTheme: true })(UIFab);
