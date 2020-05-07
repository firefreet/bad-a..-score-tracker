import React, { useEffect, useState, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import RoomContext from '../../utils/RoomContext';
import API from '../../utils/API';
import { Col, Row, Container } from "../../components/Grid";
import TopBar from '../../components/TopBar';

function RoomRedirect(props) {
  
  const [roomCode, setRoomCode] = useState('');
  // const [validRoomCode, setValidRoomCode] = useState(true);
  // const [nullRoomCode, setNullRoomCode] = useState(false);
  const { roomState: { loggedIn }, roomState, setRoomState } = useContext(RoomContext);
  // const roomCodeRef = useRef();
  const participantHandleRef = useRef();

  // const invalidRoomCode = <p className="text-danger">That room is not currently in use.</p>
  // const emptyRoomCode = <p className="text-danger">Please enter a room code.</p>

  useEffect(() => {
    // console.log('The room code is ' + roomCode);
    // const previousInfo = JSON.parse(localStorage.getItem('roomState'));
    setRoomCode(props.match.params.roomCode);
    // if (previousInfo) welcomeBackPrompt(previousInfo);
  }, []);

  function handleInput(e) {
    switch (e.target.id) {
      case 'roomCode':
        // setRoomCode(e.target.value.slice(0, 4));
        break;
      default:
        break;
    }
  }

  const joinRoomByCode = async (e) => {
    e.preventDefault();
    // setValidRoomCode(true);
    // setNullRoomCode(false);
    try {
      // if (!roomCode) {
      //   setNullRoomCode(true);
      //   throw new Error('You Must Enter a Room Code');
      // }
      const newRoom = await API.getRoomByCode(roomCode);
      if (!newRoom.data[0]) {
        // setValidRoomCode(false);
        throw new Error('Room Does Not Exisit');
      }

      localStorage.setItem('roomState', JSON.stringify({
        roomID: roomCode,
        participant: participantHandleRef.current.value
      }));

      setRoomState({ ...roomState, participant: participantHandleRef.current.value ,roomData: newRoom.data[0] })

      props.history.push('../userroom')
    } catch (err) {
      // console.log(err)
    }
  }

  return (
    <div>
      <TopBar noTitle />
      <Container>
        <Row>
          <Col>
          <div className="d-flex">
              <div><img src="../img/idea.svg" alt="trivia!" style={{ 'height': '63px'}} /></div>
              <div className="align-self-end mt-1">
                <h3 className='mb-0'>Response.io!</h3>
                <small className="font-italic">You've Got Questions...<strong>We Expect Answers</strong></small>
              </div>
            </div>
            
            <hr />
          </Col>
        </Row>
        <Row>
          <Col>
            <h5>You are joining room number <span className='responseIoLink'>{roomCode}</span>!</h5>
            <form className='mt-3'>
              <div className="form-group">
                <label htmlFor='participantHandle'>Please enter a display name:</label>
                  <input
                    onChange={handleInput}
                    ref={participantHandleRef}
                    type="text"
                    className="form-control mt-2"
                    id="participantHandle"
                    aria-describedby="User Handle"
                    placeholder="User Handle" />
              </div>
              <div className="d-flex justify-content-between">
                <button
                  onClick={joinRoomByCode}
                  type="submit"
                  className="btn btn-warning btn-sm"
                >Join Room</button>
                {/* <Link to={loggedIn ? '/rooms' : '/login'}>
                  <button
                    className="btn btn-outline-primary btn-sm login-link ml-2">
                    Open New Room
                  </button>
                </Link> */}
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  )

};

export default RoomRedirect;
