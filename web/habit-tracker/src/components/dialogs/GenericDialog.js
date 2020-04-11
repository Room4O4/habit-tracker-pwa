import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { withStyles } from '@material-ui/core/styles';
import { styles } from '../../styles/dialogs/GenericDialog.styles';

const GenericDialog = (props) => {
  const { classes } = props;

  const handleClose = () => {
    props.handleClose();
  };
  const handleDone = () => {
    props.handleDone();
  };

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="dialog-title">{props.title}</DialogTitle>
      <DialogContent>{props.children}</DialogContent>
      <DialogActions>
        {props.displayNegativeAction && (
          <Button onClick={handleClose} color="primary">
            {props.negativeActionText}
          </Button>
        )}
        <Button onClick={handleDone} color="primary">
          {props.positiveActionText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withStyles(styles, { withTheme: true })(GenericDialog);
