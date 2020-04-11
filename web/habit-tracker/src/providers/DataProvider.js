import React, { createContext, useState, useEffect } from 'react';

const DataProviderContext = createContext({});

const DataProvider = ({ children }) => {
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

  const updateUserData = (userData) => {
    setUserData(userData);
    localStorage.setItem('USER_DATA', JSON.stringify(userData));
  };

  const updateTimeSeries = (timeSeries) => {
    setTimeSeries(timeSeries);
    localStorage.setItem('TIME_SERIES_DATA', JSON.stringify(timeSeries));
  };

  useEffect(() => {
    const localUserData = localStorage.getItem('USER_DATA');
    const localTimeSeries = localStorage.getItem('TIME_SERIES_DATA');
    if (localUserData) setUserData(JSON.parse(localUserData));
    if (localTimeSeries) setTimeSeries(JSON.parse(localTimeSeries));
  }, []);

  return (
    <DataProviderContext.Provider value={{ userData, timeSeries, updateUserData, updateTimeSeries }}>
      {children}
    </DataProviderContext.Provider>
  );
};

const DataConsumer = DataProviderContext.Consumer;

export { DataProviderContext, DataProvider, DataConsumer };
