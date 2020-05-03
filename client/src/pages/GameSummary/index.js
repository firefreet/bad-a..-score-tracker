import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import RoomContext from '../../utils/RoomContext';
import { Col, Row, Container } from "../../components/Grid";
import TopBar from '../../components/TopBar';
import './style.scss';
import GameSummaryMessage from '../../components/GameSummaryMessage';

//Score Summary
function GameSummary(props) {
  const { roomState } = useContext(RoomContext);
  const [pointSummary, setPointSummary] = useState({});
  let participants = roomState.roomData.participants;
  let roomData = roomState.roomData;

  useEffect(() => {
    scoreKeeper();
  }, [roomState]);

  const scoreKeeper = () => {
    console.log('Tabulating Scores');
    let participantArr = [];
    let pointsObj = {};
    participants.forEach(participant => {
      participantArr.push(participant.name);
    })

    participantArr.forEach(name => {
      name = name.replace(/ /g, '');
      let $pointEls = document.getElementsByClassName(`${name}-points`);
      pointsObj[name] = 0
      for (let points of $pointEls ) {
        pointsObj[name] += parseInt(points.innerText)
      }
    })

    setPointSummary(pointsObj);
  }

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
            <div className="mt-3">
              {participants.map((participant, i) => (
                <div className="mb-2" key={i}>
                  <div className="accordion mt-3 mb-3" id={participant.name.replace(/ /g, '') + i}>
                    <div className="card">
                      <div className="card-header px-2 py-2" id="headingOne">
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="responseIoLink my-0 px-0" data-toggle="collapse" data-target={'#' + participant.name.replace(/ /g, '')} aria-expanded="false" aria-controls="collapseOne">
                          {participant.name}
                          </span>
                          <div className='scoreDiv'>Score: <span className="badge badge-light">{pointSummary[participant.name.replace(/ /g, '')]}</span></div>
                        </div>
                      </div>
                      <div id={participant.name.replace(/ /g, '')} className="collapse" aria-labelledby="score Summary" data-parent={'#' + participant.name.replace(/ /g, '') + i}>
                        <div className="card-body">
                          <table className="table table-striped table-sm">
                            <thead>
                              <tr className="text-center">
                                <th>Correct</th>
                                <th>Round</th>
                                <th>Question</th>
                                <th>Points</th>
                              </tr>
                            </thead>
                            <tbody>
                              {participant.responses.map((response, i) => (
                                <tr className="text-center" key={i}>
                                  <td>{response.correctInd ? (<i className="fas fa-check-circle text-success mr-2"></i>) : (<i className="fas fa-times-circle text-danger mr-2"></i>)}</td>
                                  <td>{response.roundNumber}</td>
                                  <td>{response.questionNumber}</td>
                                  <td className={participant.name.replace(/ /g, '') + '-points'}>{response.correctInd ? response.points : 0}</td>
                                </tr>
                              ))}{/* End Response Loop */}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}{/* End Participant Loop */}
            </div>
          </Col>
        </Row>
      </Container>
      </div>
    )
  }
  
};

export default GameSummary;

