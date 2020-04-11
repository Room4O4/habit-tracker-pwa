import React, { useState, useContext } from 'react';
import { Grid } from '@material-ui/core';
import moment from 'moment';
//findCompletedDatesForHabit(habit.id)
import { styles } from '../../styles/details/HabitDetail.styles';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { withStyles } from '@material-ui/core/styles';

const HabitDetail = (props) => {
  const startDate = moment(Date.now()).subtract(1, 'year');
  const endDate = Date.now();
  return (
    <Grid item xs={12}>
      <CalendarHeatmap startDate={startDate} endDate={endDate} values={props.entries} />
    </Grid>
  );
};

export default withStyles(styles, { withTheme: true })(HabitDetail);
