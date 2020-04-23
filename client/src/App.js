import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import io from 'socket.io-client'
import RoomContext from './utils/RoomContext.js';
import API from './utils/API';
import UserRoom from './pages/UserRoom';
import AdminRoom from './pages/AdminRoom';
import Chat from './pages/Chat';
import NoMatch from './pages/NoMatch';
import './global.css';
import mockRoomData from './mockRoomData';

function App() {

  const socket = io();
  const [roomState, setRoomState] = useState({
    roomData: mockRoomData,
    emit: (contentName, content) => { socket.emit(contentName, content) }
  });

  useEffect(() => {
    API.getRoom(roomState.roomData._id).then((data) => {
      console.log(data)
      setRoomState({...roomState, roomData: data.data[0]});
    }).catch(err => {
      console.log('Room with id: ' + roomState.roomData._id + ' does not exist.');
    })
  },[])

  socket.on('new update', function (content) {
    console.log(content);
    API.getRoom(roomState.roomData._id)
      .then(({ data }) => {
        setRoomState({ ...roomState, roomData: data[0] });
      });
  });

  return (
    <Router>
      <div>
        <RoomContext.Provider value={roomState}>
          <Switch>
            <Route exact path='/'>
              HELLOOOO WORLD!!!!
            </Route>
            <Route exact path='/chat'>
              <Chat />
            </Route>
            <Route exact path='/userroom'>
              <UserRoom />
            </Route>
            <Route exact path='/adminroom'>
              <AdminRoom />
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
