import React, { useState } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Grid, TextField } from '@material-ui/core';
import moment from 'moment';

import { styles } from '../../styles/Home/index.styles';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
const Home = (props) => {
  const { classes } = props;

  const [userData, setUserData] = useState({
    userName: '',
    habits: [
      {
        id: '1',
        description: 'Do One Pushup a day',
      },
      {
        id: '2',
        description: 'Wake up at 5 AM',
      },
    ],
  });
  const [timeSeries, setTimeSeries] = useState([]);

  const MAX_DAYS = 14;
  const [startDate, setStartDate] = useState(+new Date());

  const findCompletedDatesForHabit = (habitId) => {
    return timeSeries.filter((item) => item.habitIds.includes(habitId)).map((item) => ({ date: item.date }));
  };

  const habitClicked = (habitInfo) => {
    const foundEntry = timeSeries.find((item) => item.date.getTime() === habitInfo.date.getTime());
    if (!foundEntry) {
      timeSeries.push({
        date: habitInfo.date,
        habitIds: [`${habitInfo.id}`],
      });
    } else {
      const habitIndex = foundEntry.habitIds.findIndex((habitId) => habitId === habitInfo.id);
      // delete the habit entry for the date
      if (habitIndex === -1) {
        foundEntry.habitIds.push(habitInfo.id);
      } else {
        foundEntry.habitIds.splice(habitIndex, 1);
      }
    }
    setTimeSeries([...timeSeries]);
  };

  const isHabitCompletedOnDate = (habitId, date) => {
    const foundEntry = timeSeries.find((entry) => entry.date.getTime() === date.getTime());
    console.log('habitId - ' + habitId + ', foundEntry - ' + foundEntry);
    return foundEntry && foundEntry.habitIds.includes(habitId);
  };

  const buildTimelineForHabit = (habitId) => {
    return [...Array(MAX_DAYS).keys()].map((dayNumber) => {
      const dateId = moment(startDate).add(dayNumber, 'days').format('DD-MM-YYYY');
      const dateObj = moment(dateId, 'DD-MM-YYYY').toDate();
      return (
        <div
          className={
            isHabitCompletedOnDate(habitId, dateObj)
              ? `${classes.habitBox} ${classes.selectedHabitColor}`
              : classes.habitBox
          }
          onClick={() =>
            habitClicked({
              id: habitId,
              date: dateObj,
            })
          }
        ></div>
      );
    });
  };

  return (
    <Grid container className={classes.root} spacing={1} justify="center">
      {userData.habits.map((habit) => {
        return (
          <Grid item xs={12} key={habit.id}>
            <Grid container justify="center">
              <Grid item xs={2} className={classes.habitLabel}>
                {habit.description}
              </Grid>
              <Grid item xs={6} md={8} className={classes.habitGrid}>
                {buildTimelineForHabit(habit.id)}
              </Grid>
              <Grid item xs={12}>
                <CalendarHeatmap
                  startDate={new Date('2020-04-01')}
                  endDate={new Date('2020-12-01')}
                  values={findCompletedDatesForHabit(habit.id)}
                />
              </Grid>
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default withStyles(styles, { withTheme: true })(Home);
