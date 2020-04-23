import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import io from 'socket.io-client'
import RoomContext from './utils/RoomContext.js';
import API from './utils/API';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './pages/Register';
import Login from './pages/Login';
import UserRoom from './pages/UserRoom';
import Chat from './pages/Chat';
import NoMatch from "./pages/NoMatch";
import './global.css';

function App() {

  const socket = io();
  const [roomState, setRoomState] = useState({
    roomData: {},
    emit: (contentName, content) => { socket.emit(contentName, content) }
  });

  socket.on('new update', function (content) {
    console.log(content);
    // API.getRoom(roomNumber)
    //   .then(roomData => {
        // setRoomState(roomData);
      // });
  });

  return (
    <Router>
      <div>
        <RoomContext.Provider value={roomState}>
          <Switch>
            <Route exact path="/">
              HELLOOOO WORLD!!!!
            </Route>
            <ProtectedRoute exact path="/chat" component={Chat} />
            <ProtectedRoute exact path='/userroom' component={UserRoom} />
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route>
              <NoMatch />
            </Route>
          </Switch>
        </RoomContext.Provider>
      </div>
    </Router>
  );
}

export default App;
