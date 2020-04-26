import React, { useEffect, useContext } from 'react';
import RoomContext from '../../utils/RoomContext';
import API from '../../utils/API';
import { Col, Row, Container } from "../../components/Grid";

//ROOM MANAGER

function RoomManager() {
  const { userData, setUserData } = useContext(RoomContext);

  useEffect(() => {
    console.log(userData);
    if (userData.rooms.length > 0) {
      API.populateRooms()
        .then(res => {
          setUserData(res.data)
        })
        .catch(err => {console.log(err)})
    }

  }, []);

  function handleNewRoom(e) {
    e.preventDefault();
    console.log('Clicked Add New Room Button');
    let roomData = {
      active: true,
      roomID: Math.floor(Math.random()*10000),
    }
    API.createRoom(roomData)
      .then(res => {
        console.log(res);
        setUserData(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  if (userData.rooms.length === 0) {

    return (
      <Container classes="container mt-5">
        <Row>
          <Col>
            <h3>{userData.firstName}'s Rooms</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className='mt-3'>
              <button
                className="btn btn-warning btn-sm mt-3"
                onClick={handleNewRoom}
              >
                Create First Room
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }

  if (userData.rooms.length > 0) {
    
    return (
      <Container classes="container mt-5">
        <Row>
          <Col>
            <h3>{userData.firstName}'s Rooms</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className='mt-3'>
              {userData.rooms.map(room => (
                <div key={room._id}>{room.roomID}</div>
              ))}
              <button
                className="btn btn-warning btn-sm mt-3"
                onClick={handleNewRoom}
              >
                Create New Room
              </button>    
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
  
  

};

export default RoomManager;

