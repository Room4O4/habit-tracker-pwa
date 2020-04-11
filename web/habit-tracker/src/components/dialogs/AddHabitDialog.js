import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';

import GenericDialog from './GenericDialog';

import { withStyles } from '@material-ui/core/styles';
import { styles } from '../../styles/dialogs/AddHabitDialog.styles';

const AddHabitDialog = (props) => {
  const [open, setOpen] = useState(true);
  const [habitName, setHabitName] = useState('');

  const handleClose = () => {
    setOpen(false);
    props.onAddHabitCancelled();
  };

  const handleDone = () => {
    props.onHabitAdded(habitName);
  };

  const handleInputChange = (event) => {
    setHabitName(event.target.value);
  };

  return (
    <GenericDialog
      open={open}
      title={'Add Habit'}
      displayNegativeAction={true}
      negativeActionText="Cancel"
      positiveActionText="Save"
      handleClose={handleClose}
      handleDone={handleDone}
    >
      <TextField
        autoFocus
        margin="dense"
        id="habitName"
        label="Habit Name"
        type="email"
        onChange={handleInputChange}
        value={habitName}
        fullWidth
      />
    </GenericDialog>
  );
};

export default withStyles(styles, { withTheme: true })(AddHabitDialog);
