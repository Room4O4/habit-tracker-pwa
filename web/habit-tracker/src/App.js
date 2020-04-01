import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

// import './App.css';
import Home from './components/Home';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import RedirectCallback from './components/auth/RedirectCallback';
import { AuthProvider } from './providers/auth';

const App = () => {
  const theme = createMuiTheme({
    // TODO: Fill with root theme content
  });

  return (
    <div>
      <Router>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <Switch>
              <ProtectedRoute exact path="/" component={Home} />
              <Route exact path="/redirect" component={RedirectCallback} />
            </Switch>
          </AuthProvider>
        </ThemeProvider>
      </Router>
    </div>
  );
};

export default App;
