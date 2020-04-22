import React from 'react';

const RoomContext = React.createContext({
  roomData: {},
  emit: ()=>{}
})

export default RoomContext;