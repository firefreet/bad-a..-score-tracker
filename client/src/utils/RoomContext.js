import React from 'react';

const RoomContext = React.createContext({
  loggedIn: false,
  userData: {},
  roomData: {},
  emit: ()=>{}
})

export default RoomContext;