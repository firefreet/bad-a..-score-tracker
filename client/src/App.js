import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import io from 'socket.io-client'
import RoomContext from './utils/RoomContext.js';
import API from './utils/API';
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
            <Route exact path="/chat">
              <Chat />
            </Route>
            <Route exact path='/userroom'>
              <UserRoom />
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
