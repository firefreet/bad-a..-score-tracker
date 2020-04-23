import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import RoomContext from '../utils/RoomContext';

function ProtectedRoute({ component: Component, ...rest }) {
  const { loggedIn } = useContext(RoomContext);
  console.log(loggedIn);
  return (
    <Route
      {...rest}
      render={props => {
        if (loggedIn) {
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