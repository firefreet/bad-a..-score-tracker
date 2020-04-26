import React from 'react';
import API from '../../utils/API';

function GenerateRoom(props) {
  function handleRoomGen() {
    API.createRoom()
      .then(response => {
        console.log(response.data);
      });
  }
  
  return (
    <button onClick={handleRoomGen}>Generate a Room</button>
  )

};

export default GenerateRoom;
