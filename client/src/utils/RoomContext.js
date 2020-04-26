import React from 'react';

const RoomContext = React.createContext({
  loggedIn: false,
  userData: {},
  setUserData: ()=>{},
  roomData: {},
  emit: ()=>{},
  selectedQuestion: 1,
  selectedRound: 1,
  updateSelectedQuestion: ()=>{},
  updateSelectedRound: ()=>{},
  goToCurrent: false,
  updateGoToCurr: ()=>{}
})

export default RoomContext;