import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import io from 'socket.io-client'
import RoomContext from './utils/RoomContext.js';
import API from './utils/API';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './pages/Register';
import Login from './pages/Login';
import UserRoom from './pages/UserRoom';
import AdminRoom from './pages/AdminRoom';
import Chat from './pages/Chat';
import NoMatch from './pages/NoMatch';
import './global.css';
import mockRoomData from './mockRoomData';

function App() {

  // const socket = io();
  const [roomState, setRoomState] = useState({
    roomData: mockRoomData,
    loggedIn: decodeURIComponent(document.cookie) !== '',
    userData: null,
    // emit: (contentName, content) => { socket.emit(contentName, content) }
  });
  // socket.on('new update', function (content) {
  //   console.log(content);
  //   API.getRoom(roomState.roomData._id)
  //     .then(({ data }) => {
  //       setRoomState({ ...roomState, roomData: data[0] });
  //     });
  // });

  useEffect(() => {
    API.isAuthenticated()
      .then(res => {
        console.log(res);
        // setRoomState(currentState => ({...currentState, loggedIn: true, userData: {id: res.data.id}}));
        API.getRoom(roomState.roomData._id).then((data) => {
          // 
          var roomData = data.data.length === 0 ? roomState.roomData : data.data[0];
          setRoomState({...roomState, roomData, loggedIn: true, userData: {id: res.data.id}});
        }).catch(err => {
          console.log(err);
        })    
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
            <Route exact path="/chat" component={Chat} />
            <ProtectedRoute exact path='/userroom' component={UserRoom} />
            <ProtectedRoute exact path='/adminroom' component={AdminRoom} />
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
