import React from 'react';
import { Grid } from '@material-ui/core';
import moment from 'moment';
import { styles } from '../../styles/details/HabitDetail.styles';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { withStyles } from '@material-ui/core/styles';
import { DataConsumer } from '../../providers/DataProvider';
import { useParams } from 'react-router-dom';

const HabitDetail = (props) => {
  const { id } = useParams();
  const { classes } = props;

  return (
    <DataConsumer>
      {({ userData, timeSeries }) => {
        const startDate = moment(Date.now()).subtract(1, 'year');
        const endDate = Date.now();
        const findCompletedDatesForHabit = (habitId) => {
          return timeSeries.filter((item) => item.habitIds.includes(habitId)).map((item) => ({ date: item.date }));
        };

        return (
          <Grid container className={classes.root}>
            <Grid item xs={12}>
              <CalendarHeatmap startDate={startDate} endDate={endDate} values={findCompletedDatesForHabit(id)} />
            </Grid>
          </Grid>
        );
      }}
    </DataConsumer>
  );
};

export default withStyles(styles, { withTheme: true })(HabitDetail);
