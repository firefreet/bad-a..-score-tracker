import React, { useState, useEffect } from "react";
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
    loggedIn: decodeURIComponent(document.cookie) !== '',
    userData: null,
    roomData: null,
    emit: (contentName, content) => { socket.emit(contentName, content) }
  });

  socket.on('new update', function (content) {
    console.log(content);
    // API.getRoom(roomNumber)
    //   .then(roomData => {
        // setRoomState(roomData);
      // });
  });

  useEffect(() => {
    API.isAuthenticated()
      .then(res => {
        console.log(res);
        setRoomState(currentState => ({...currentState, loggedIn: true, userData: {id: res.data.id}}));
      })
      .catch(err => {
        console.log(err.response)
        setRoomState(currentState => ({...currentState, loggedIn: false, userData: null}));
      });
  }, []);

  console.log(roomState);
  
  return (
    <Router>
      <div>
        <RoomContext.Provider value={roomState}>
          <Switch>
            <Route exact path="/"><p>HELLOOOO WORLD!!!!</p></Route>
            <ProtectedRoute exact path="/chat" component={Chat} />
            <ProtectedRoute exact path='/userroom' component={UserRoom} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route component ={NoMatch} />
          </Switch>
        </RoomContext.Provider>
      </div>
    </Router>
  );
}

export default App;
