import React, { useEffect, useContext, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import RoomContext from '../../utils/RoomContext';
import API from '../../utils/API';
import { Col, Row, Container } from "../../components/Grid";
import TopBar from '../../components/TopBar';
import './style.scss';
import GameSummaryMessage from '../../components/GameSummaryMessage';

//Score Summary
function GameSummary(props) {
  const { roomState, setRoomState } = useContext(RoomContext);
  const [gameSummary, setGameSummary] = useState({});
  const history = useHistory();
  let participants = roomState.roomData.participants;
  let roomData = roomState.roomData;

  useEffect(() => {
    console.log(roomState);
    console.log(participants);
    console.log(participants.length);
    console.log(gameSummary);
  }, [gameSummary]);

  API.gameSummary().then(res => setGameSummary(res)).catch(err => console.log(err));

  // If Room Data is empty render this message
  if (!roomState.roomData) {
    return (
      <GameSummaryMessage
        message="Looks like you haven't opened any rooms yet"
        linkTo='/rooms'
        linkText='Open a room'
      />
    )
  }

  // If there are no responses yet renter this message
  if (participants.length === 0) {
    return (
      <GameSummaryMessage
        roomCode={roomState.roomData.roomID}
        message="Looks like there aren't any responses yet!"
        linkTo='/adminroom'
        linkText='Get Those Responses!'
      />
    )
  }

  //There are Participants, Render score summary
  if (participants.length > 0) {

    return (
      <div>
      <TopBar />
      <Container>
        <Row>
          <Col>
            <h3>Game Summary</h3>
            <div><strong>Room Code:</strong> <Link to='/adminroom' className='responseIoLink'>{roomData.roomID}</Link></div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div>
              {participants.map((participant, i) => (
                <div key={i}>
                  <div>{participant.name}</div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
      </div>
    )
  }



};

export default GameSummary;

