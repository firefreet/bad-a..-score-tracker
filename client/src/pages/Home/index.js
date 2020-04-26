import React, { useEffect, useState, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import RoomContext from '../../utils/RoomContext';
import { Col, Row, Container } from "../../components/Grid";
import API from '../../utils/API';

function Home() {
  const [roomNumber, setRoomNumber] = useState('');
  const { loggedIn } = useContext(RoomContext);
  const roomNumberRef = useRef();

  useEffect(() => {
    console.log('Homepage useEffect')
    }, []);

  function handleInput(e) {
    switch (e.target.id) {
      case 'roomNumber':
        setRoomNumber(e.target.value.slice(0,4));
        break;
      default:
        break;
    }
    console.log(roomNumber);
  }


  function handleJoin(e) {
    e.preventDefault();
    console.log(roomNumber);
  }

  
  return (
    <Container classes="container mt-5">
      <Row>
        <Col>
          <h1>Response.io!</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <form className='mt-4'>
            <div className="form-group">
              <label htmlFor="roomNumber">Enter 4-Digit Room Number</label>
              <input
                onChange={handleInput}
                ref={roomNumberRef}
                value={roomNumber}
                type="text"
                className="form-control"
                id="roomNumber"
                aria-describedby="Room Number"
                placeholder="Room Number" />
            </div>
            <div className="d-flex justify-content-between">
              <button
                onClick={handleJoin}
                type="submit"
                className="btn btn-warning btn-sm"
              >Join Room</button>
              <Link to={loggedIn ? '/rooms' : '/login'}>
                <button
                  className="btn btn-outline-primary btn-sm login-link ml-2">
                  Open New Room
                </button>
              </Link>
            </div>
          </form>
        </Col>
      </Row>
    </Container>
  )

};

export default Home;

