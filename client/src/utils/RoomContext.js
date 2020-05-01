import React from 'react';

const RoomContext = React.createContext({
  roomData: {},
  loggedIn: false,
  userData: {},
  setUserData: ()=>{},
  emit: ()=>{},
  selectedQuestion: 1,
  selectedRound: 1,
  updateSelectedQuestion: ()=>{},
  updateSelectedRound: ()=>{},
  goToCurrent: false,
  updateGoToCurr: ()=>{}
})

export default RoomContext;