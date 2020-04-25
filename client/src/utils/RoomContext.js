import React from 'react';

const RoomContext = React.createContext({
  loggedIn: false,
  userData: {},
  roomData: {},
  emit: ()=>{},
  selectedQuestion: 1,
  selectedRound: 1,
  updateSelectedQuestion: ()=>{},
  updateSelectedRound: ()=>{}
})

export default RoomContext;