import React, { useState, useContext } from 'react';
import { Grid } from '@material-ui/core';
import moment from 'moment';
import uuid from 'react-uuid';
import { styles } from '../../styles/Home/index.styles';

import UIFab from '../controls/UIFab';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import { DataProviderContext } from '../../providers/DataProvider';
import AddHabitDialog from '../dialogs/AddHabitDialog';

const Home = (props) => {
  const { classes } = props;

  const [endDate, setEndDate] = useState(new Date());
  const [shouldShowAddHabitDialog, setShouldShowAddHabitDialog] = useState(false);

  const { userData, timeSeries, updateUserData, updateTimeSeries } = useContext(DataProviderContext);

  const MAX_DAYS = 14;
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const habitClicked = (habitInfo) => {
    const foundEntry = timeSeries.find((item) => moment(item.date).toDate().getTime() === habitInfo.date.getTime());
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
    updateTimeSeries([...timeSeries]);
  };

  const isHabitCompletedOnDate = (habitId, date) => {
    const foundEntry = timeSeries.find((entry) => moment(entry.date).toDate().getTime() === date.getTime());
    return foundEntry && foundEntry.habitIds.includes(habitId);
  };

  const isToday = (date) => {
    return moment(new Date()).format('DD-MM-YYYY') === date;
  };

  const buildDateLabel = () => {
    return [...Array(MAX_DAYS).keys()].map((dayNumber) => {
      const dateId = moment(endDate)
        .subtract(MAX_DAYS - (dayNumber + 1), 'days')
        .format('DD-MM-YYYY');
      const dateObj = moment(dateId, 'DD-MM-YYYY').toDate();
      return (
        <div className={isToday(dateId) ? `${classes.dateHeader} ${classes.today}` : classes.dateHeader}>
          <div>{days[dateObj.getDay()]}</div>
          <div>{dateObj.getDate()}</div>
        </div>
      );
    });
  };

  const buildDateHeader = () => {
    return (
      <Grid item xs={12}>
        <Grid container justify="center">
          <Grid item xs={2} />
          <Grid item xs={6} md={8} className={classes.habitGrid}>
            {buildDateLabel()}
          </Grid>
        </Grid>
      </Grid>
    );
  };
  const buildTimelineForHabit = (habitId) => {
    return [...Array(MAX_DAYS).keys()].map((dayNumber) => {
      const dateId = moment(endDate)
        .subtract(MAX_DAYS - (dayNumber + 1), 'days')
        .format('DD-MM-YYYY');
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

  const onAddHabitClick = () => {
    setShouldShowAddHabitDialog(true);
  };

  const onAddHabitCancelled = () => {
    setShouldShowAddHabitDialog(false);
  };

  const onHabitAdded = (habitName) => {
    userData.habits.push({
      id: uuid(),
      description: habitName,
    });
    updateUserData({ ...userData });
    setShouldShowAddHabitDialog(false);
  };

  const renderAddHabitFab = () => {
    return (
      <UIFab onClick={onAddHabitClick}>
        <AddIcon />
      </UIFab>
    );
  };

  return (
    <Grid container className={classes.root} spacing={1} justify="center">
      {buildDateHeader()}
      {userData &&
        userData.habits.map((habit) => {
          return (
            <Grid item xs={12} key={habit.id}>
              <Grid container justify="center">
                <Grid item xs={2} className={classes.habitLabel}>
                  {/* <Link to={`/habit/${habit.id}`}>{habit.description}</Link> */}
                </Grid>
                <Grid item xs={6} md={8} className={classes.habitGrid}>
                  {buildTimelineForHabit(habit.id)}
                </Grid>
              </Grid>
            </Grid>
          );
        })}
      {shouldShowAddHabitDialog && (
        <AddHabitDialog onAddHabitCancelled={onAddHabitCancelled} onHabitAdded={onHabitAdded} />
      )}
      {renderAddHabitFab()}
    </Grid>
  );
};

export default withStyles(styles, { withTheme: true })(Home);
