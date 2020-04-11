import React from 'react';
import { Grid, Typography, Divider } from '@material-ui/core';
import moment from 'moment';
import { styles } from '../../styles/details/HabitDetail.styles';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { withStyles } from '@material-ui/core/styles';
import { DataConsumer } from '../../providers/DataProvider';
import { useParams } from 'react-router-dom';
import { summary } from 'date-streaks';

const HabitDetail = (props) => {
  const { id } = useParams();
  const { classes } = props;

  return (
    <DataConsumer>
      {({ userData, timeSeries }) => {
        const startDate = moment(Date.now()).subtract(1, 'year');
        const endDate = Date.now();

        const userInfo = userData.habits.find((habitInfo) => habitInfo.id === id);

        const findCompletedDatesForHabit = (habitId) => {
          return timeSeries.filter((item) => item.habitIds.includes(habitId)).map((item) => ({ date: item.date }));
        };
        const completedDates = findCompletedDatesForHabit(id);
        const streakSummary = summary(completedDates.map((item) => item.date));

        return (
          <Grid container className={classes.root}>
            <Grid item xs={12}>
              <Typography variant="h4">{userInfo && userInfo.description}</Typography>
            </Grid>
            <Grid item xs={6}>
              <CalendarHeatmap startDate={startDate} endDate={endDate} values={completedDates} />
            </Grid>
            <Grid item xs={6}>
              <Grid container className={classes.streakSummary}>
                <Grid item xs={12}>
                  <Typography variant="body1">Current Streak: {streakSummary.currentStreak} days</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">Longest Streak: {streakSummary.longestStreak} days</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        );
      }}
    </DataConsumer>
  );
};

export default withStyles(styles, { withTheme: true })(HabitDetail);
