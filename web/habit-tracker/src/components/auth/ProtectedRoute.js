import React from 'react';
import { Route } from 'react-router-dom';
import { AuthConsumer, AUTH_STATE_LOGIN_SUCCESS, AUTH_STATE_LOGIN_FAILED } from '../../providers/auth';
import { AWS_COGNITO_SIGN_IN_URL } from '../../constants';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <AuthConsumer>
      {({ authState }) => {
        if (authState === AUTH_STATE_LOGIN_SUCCESS) {
          return <Route render={props => <Component {...props} />} {...rest} />;
        } else if (authState === AUTH_STATE_LOGIN_FAILED) {
          window.open(AWS_COGNITO_SIGN_IN_URL, '_self');
          return null;
        } else {
          return null;
        }
      }}
    </AuthConsumer>
  );
};

export default ProtectedRoute;
