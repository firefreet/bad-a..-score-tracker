// pseudo code for discussion, not to be used

// how do we want to controll state?
// i think we're still small enough to use useContext or prop drill vs needing Redux...

// top level component which will controll all state

function TopComponent(){
  state = {
    // emit: to be passed down to all components which need to push out updates to other clients
    // this would be used after successfull post of answers to database 
    // as an FYI to other clients to pull from the DB (or upon admin actions, etc.)
    // It will likely include the room # so only folks in that room know to update
    emit: socket.emit(contentName, content),
    roomData: {/* data from DB */},
    otherStateProperties: '...'
  }

  // could be different types of emits that would be handled differently
  // this is just the 'you need to check the DB' notification
  socket.on('new update', function (roomNumber) {
    APICallToDB(roomNumber)
      .then(roomData =>{
        setState(roomData);
      });
  })

  return (
    // blah blah etc.
    false
  )
}