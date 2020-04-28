import React, { useEffect, useState, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import RoomContext from '../../utils/RoomContext';
import API from '../../utils/API';
import { Col, Row, Container } from "../../components/Grid";

function Home(props) {
  const [roomCode, setRoomCode] = useState('');
  const {roomState: { loggedIn }, roomState, setRoomState} = useContext(RoomContext);
  const roomCodeRef = useRef();

  useEffect(() => {
    console.log('Homepage useEffect')
    console.log(roomState)
    }, [roomState]);

  function handleInput(e) {
    switch (e.target.id) {
      case 'roomCode':
        setRoomCode(e.target.value.slice(0,4));
        break;
      default:
        break;
    }
  }


  const joinRoomByCode = async (e) => {
    e.preventDefault();
    try {
      if (!roomCode) throw new Error ('You Must Enter a Room Code');
      console.log(roomCode);
      const newRoom = await API.getRoomByCode(roomCode);
      console.log(newRoom);
      if (!newRoom.data[0]) throw new Error ('Room Does Not Exisit');

      await setRoomState({ ...roomState, roomData: newRoom.data[0] })
      // console.log(roomState)
      props.history.push('./userroom')
    } catch (err) {
      console.log(err)
    }
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
              <label htmlFor="roomCode">Enter 4-Digit Room Code</label>
              <input
                onChange={handleInput}
                ref={roomCodeRef}
                value={roomCode}
                type="text"
                className="form-control"
                id="roomCode"
                aria-describedby="Room Code"
                placeholder="Room Code" />
            </div>
            <div className="d-flex justify-content-between">
              <button
                onClick={joinRoomByCode}
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

