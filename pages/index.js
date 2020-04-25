import React from 'react';
import Link from 'next/link';
// import './App.css';
import Home from './Home';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { AuthProvider } from '../providers/auth';
import { DataProvider } from '../providers/DataProvider';

const App = () => {
  const theme = createMuiTheme({
    // TODO: Fill with root theme content
  });
  return (
    <div>
      <ThemeProvider theme={theme}>
        <DataProvider>
          <Home />
        </DataProvider>
      </ThemeProvider>
    </div>
  );
};

export default App;
