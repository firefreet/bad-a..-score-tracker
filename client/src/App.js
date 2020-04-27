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
import RoomManager from './pages/RoomManager';
import Chat from './pages/Chat';
import NoMatch from './pages/NoMatch';
import Home from './pages/Home';
import GenerateRoom from './pages/GenerateRoom';
import modelRoom from './utils/modelRoom';
import './global.css';

function App() {

  // const socket = io();
  const [roomState, setRoomState] = useState({
    roomData: modelRoom,
    loggedIn: decodeURIComponent(document.cookie) !== '',
    userData: null,
    setUserData: (userObj, currentRoomState) => {
      setRoomState({ ...currentRoomState, loggedIn: true, userData: userObj })
    },
    // emit: (contentName, content) => { socket.emit(contentName, content) }
    selectedQuestion: 1,
    selectedRound: 1,
    updateSelectedQuestion: (selectedQuestion, currentRoomState) => {
      setRoomState({ ...currentRoomState, selectedQuestion })
    },
    updateSelectedRound: (selectedRound, currentRoomState) => {
      setRoomState({ ...currentRoomState, selectedRound })
    },
    goToCurrent: false,
    updateGoToCurr: async (val, currRoomState) => {
      setRoomState({ ...currRoomState, goToCurrent: val })
    }
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
        API.getFirstRoom().then(data => {
          setRoomState({ ...roomState, loggedIn: true, userData: res.data, roomData: data.data });
        }).catch(err => {
          console.log(err);
        })
      })
      .catch(err => {
        console.log(err.response)
        setRoomState(currentState => ({ ...currentState, loggedIn: false, userData: null }));
      });
  }, []);

  // console.log(roomState);

  return (
    <Router>
      <div>
        <RoomContext.Provider value={{ roomState, setRoomState }}>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path="/chat" component={Chat} />
            <Route exact path='/userroom' component={UserRoom} />
            <ProtectedRoute exact path='/adminroom' component={AdminRoom} />
            <ProtectedRoute exact path='/rooms' component={RoomManager} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />

            {/* Temp route for room generation */}
            <Route exact path="/genroom" component={GenerateRoom} />

            <Route component={NoMatch} />
          </Switch>
        </RoomContext.Provider>
      </div>
    </Router>
  );
}

export default App;
