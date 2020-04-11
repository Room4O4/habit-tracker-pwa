import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

// import './App.css';
import Home from './components/Home';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import RedirectCallback from './components/auth/RedirectCallback';
import { AuthProvider } from './providers/auth';
import HabitDetail from './components/details/HabitDetail';
import { DataProvider } from './providers/DataProvider';

const App = () => {
  const theme = createMuiTheme({
    // TODO: Fill with root theme content
  });

  return (
    <div>
      <Router>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <DataProvider>
              <Switch>
                <ProtectedRoute exact path="/" component={Home} />
                <ProtectedRoute exact path="/habit/:id" component={HabitDetail} />
                <Route exact path="/redirect" component={RedirectCallback} />
              </Switch>
            </DataProvider>
          </AuthProvider>
        </ThemeProvider>
      </Router>
    </div>
  );
};

export default App;
