import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import RoomContext from '../utils/RoomContext';

function ProtectedRoute({ component: Component, ...rest }) {
  const { loggedIn, userData } = useContext(RoomContext);
  console.log(loggedIn);
  console.log(rest);

  if (!loggedIn) {
    return (
      <Redirect 
        to={{
          pathname: '/',
          state: {
          from: rest.location
          }
        }}
      />
    )
  }

  if (userData === null) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <Route
      {...rest}
      render={props => {
        if (loggedIn) {
          return <Component {...props} />
        }
        
      }}
    />
  );
};

export default ProtectedRoute;