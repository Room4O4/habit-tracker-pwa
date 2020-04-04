import React from 'react';
import * as queryString from 'query-string';
import { Redirect } from 'react-router-dom';
import { AuthConsumer, AUTH_STATE_LOGIN_SUCCESS, AUTH_STATE_LOGIN_FAILED } from '../../providers/auth';
const RedirectCallback = ({ location }) => (
  <AuthConsumer>
    {({ authState, userInfo, setAuthState, logout }) => {
      if (location.hash) {
        const tokenInfo = queryString.parse(location.hash);
        console.log(tokenInfo);
        tokenInfo.expires_at = +new Date() / 1000 + Number(tokenInfo.expires_in);
        localStorage.setItem('tokenInfo', JSON.stringify(tokenInfo));
        setAuthState(AUTH_STATE_LOGIN_SUCCESS);
        return <Redirect to="/" />;
      } else {
        setAuthState(AUTH_STATE_LOGIN_FAILED);
        return <h1>401 UnAuthorized</h1>;
      }
    }}
  </AuthConsumer>
);

export default RedirectCallback;
