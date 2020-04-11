import React, { createContext, useState } from 'react';
import { useEffect } from 'react';

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

  return (
    <DataProviderContext.Provider value={{ userData, timeSeries, setUserData, setTimeSeries }}>
      {children}
    </DataProviderContext.Provider>
  );
};

const DataConsumer = DataProviderContext.Consumer;

export { DataProviderContext, DataProvider, DataConsumer };
