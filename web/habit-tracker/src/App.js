import React, { Fragment, useState } from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import { green } from '@material-ui/core/colors';
import { Grid, Paper, TextField, Button } from '@material-ui/core';
import moment from 'moment';

const useStyle = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: '32',
    width: '32'
  },
  habitGrid: {
    display: 'flex',
    justifyContent: 'space-evenly'
  },
  habitLabel: {
    width: 'auto',
    height: 16,
    margin: 8
  },
  checkBoxHolder: {
    margin: 4
  }
}));

function App() {
  const classes = useStyle();

  const [userData, setUserData] = useState({
    userName: '',
    habits: [
      {
        id: '1',
        description: 'Do One Pushup a day'
      },
      {
        id: '2',
        description: 'Wake up at 5 AM'
      }
    ],
    timeSeries: []
  });

  const MAX_DAYS = 30;
  const [startDate, setStartDate] = useState(+new Date());
  const [count, setCount] = useState(0);

  const checkBoxClicked = habitInfo => {
    const timeSeries = [...userData.timeSeries];
    const foundEntry = timeSeries.find(item => item.date.getTime() === habitInfo.date.getTime());
    if (!foundEntry) {
      timeSeries.push({
        date: habitInfo.date,
        habitIds: [`${habitInfo.id}`]
      });
    } else {
      const habitIndex = foundEntry.habitIds.findIndex(habitId => habitId === habitInfo.id);
      // delete the habit entry for the date
      if (habitIndex === -1) {
        foundEntry.habitIds.push(habitInfo.id);
      } else {
        foundEntry.habitIds.splice(habitIndex, 1);
      }
    }
    // setUserData({
    //   userName: userData.userName,
    //   habits: userData.habits,
    //   timeSeries: [...timeSeries]
    // });
    // setStartDate(+new Date());
    setCount(count + 1);
    console.log(timeSeries);
  };

  const renderCheckBox = (habitId, date) => {
    const foundEntry = userData.timeSeries.find(entry => entry.date.getTime() === date.getTime());
    if (foundEntry && foundEntry.habits && foundEntry.habits.contains(habitId)) {
      return <CheckCircleOutlineRoundedIcon />;
    } else {
      return <CheckBoxOutlineBlankIcon />;
    }
  };

  const buildCheckBoxesForHabit = habitId => {
    return [...Array(MAX_DAYS).keys()].map(dayNumber => {
      const dateId = moment(startDate)
        .add(dayNumber, 'days')
        .format('DD-MM-YYYY');
      const dateObj = moment(dateId, 'DD-MM-YYYY').toDate();

      return (
        <div
          className={classes.checkBoxHolder}
          onClick={() =>
            checkBoxClicked({
              id: habitId,
              date: dateObj
            })
          }
        >
          {renderCheckBox(habitId, dateObj)}
        </div>
      );
    });
  };

  return (
    <Grid container className={classes.root} spacing={1}>
      {userData.habits.map(habit => {
        return (
          <Grid item xs={12} key={habit.id}>
            <Grid container>
              <Grid item xs={2}>
                <TextField className={classes.habitLabel} defaultValue={habit.description}></TextField>
              </Grid>
              <Grid item xs={10} className={classes.habitGrid}>
                {buildCheckBoxesForHabit(habit.id)}
              </Grid>
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default App;
