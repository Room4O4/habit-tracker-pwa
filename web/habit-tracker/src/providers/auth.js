import React, { createContext, useState } from 'react';
import { useEffect } from 'react';
import { AWS_COGNITO_SIGN_IN_URL } from '../constants';

const AuthContext = createContext();

const AUTH_STATE_UNDEFINED = -1;
const AUTH_STATE_LOGIN_SUCCESS = 1;
const AUTH_STATE_LOGIN_FAILED = 0;

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(AUTH_STATE_UNDEFINED);
  const [userInfo, setUserInfo] = useState({});
  const logout = () => {};

  useEffect(() => {
    const tokenInfo = localStorage.getItem('tokenInfo');
    let currentTimeStamp = +new Date() / 1000;
    if (
      tokenInfo &&
      Number(JSON.parse(tokenInfo).expires_at) > currentTimeStamp
    ) {
      setAuthState(AUTH_STATE_LOGIN_SUCCESS);
    } else {
      setAuthState(AUTH_STATE_LOGIN_FAILED);
      window.open(AWS_COGNITO_SIGN_IN_URL, '_self');
    }
  });

  return (
    <AuthContext.Provider value={{ authState, userInfo, setAuthState, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const AuthConsumer = AuthContext.Consumer;

export {
  AuthProvider,
  AuthConsumer,
  AUTH_STATE_LOGIN_FAILED,
  AUTH_STATE_LOGIN_SUCCESS,
  AUTH_STATE_UNDEFINED,
};
