import React from 'react';
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

// import './App.css';
import Home from './components/Home';


const App = () => {

  const theme = createMuiTheme({
    // TODO: Fill with root theme content
  });

  return (
    <ThemeProvider theme={theme}>
      <Home/>
    </ThemeProvider>
  );
};

export default App;