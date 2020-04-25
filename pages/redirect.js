import React, { useEffect, useState, useContext } from 'react';
import * as queryString from 'query-string';
import { AuthConsumer, AUTH_STATE_LOGIN_SUCCESS, AUTH_STATE_LOGIN_FAILED, AuthContext } from '../providers/auth';
import Router, { withRouter, useRouter } from 'next/router';

const RedirectCallback = ({ query }) => {
  const router = useRouter();
  const [tokenInfo, setTokenInfo] = useState(null);
  const { authState, userInfo, setAuthState, logout } = useContext(AuthContext);

  useEffect(() => {
    console.log(router.asPath);
    if (authState === AUTH_STATE_LOGIN_SUCCESS) {
    }
  }, [authState]);

  useEffect(() => {
    console.log(router.params);
    if (router.asPath) {
      const newToken = queryString.parse(router.asPath);
      if (newToken) {
        console.log(newToken);
        newToken.expires_at = +new Date() / 1000 + Number(newToken.expires_in);
        setTokenInfo(newToken);
        setAuthState(AUTH_STATE_LOGIN_SUCCESS);
        localStorage.setItem('tokenInfo', JSON.stringify(newToken));
        router.push('/');
      }
    } else {
      setAuthState(AUTH_STATE_LOGIN_FAILED);
    }
  }, []);

  if (authState === AUTH_STATE_LOGIN_FAILED) {
    return <h1>Unauthorized login</h1>;
  } else {
    return <div>Please wait ...</div>;
  }
};
export default RedirectCallback;
