import React, { useState, useEffect, useRef } from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from '../utils/auth';
import API from '../utils/API';

function ProtectedRoute({ component: Component, ...rest }) {
  
  // const [authStatus, setAuthStatus] = useState('');

  // useEffect(function() {
  //   console.log(authStatus);

  // }, [authStatus]);

  // API.isAuthenticated()
  // .then(res => {
  //   setAuthStatus(res.data);
  // })
  // .catch(err => {
  //   console.log(err);
  // })

  return (
    <Route
      {...rest}
      render={props => {
        if (true) {
          return <Component {...props} />
        }
        else {
          return (
            <Redirect 
              to={{
                pathname: '/',
                state: {
                from: props.location
                }
              }}
            />
          )
        }
      }}
    />
  );
};

export default ProtectedRoute;