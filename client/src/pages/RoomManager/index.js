import React, { useEffect, useState, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import RoomContext from '../../utils/RoomContext';
import { Col, Row, Container } from "../../components/Grid";

//ROOM MANAGER

function Test() {
  const { loggedIn, userData } = useContext(RoomContext);

  useEffect(() => {
    console.log(userData);
  }, []);


  function handleNewRoom(e) {
    e.preventDefault();
    console.log('Clicked Add New Room Button');
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
  
  

};

export default Test;

