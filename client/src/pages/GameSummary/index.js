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
  const [localStor, setLocalStor] = useState('');
  let participants = roomState.roomData.participants;
  let roomData = roomState.roomData;

  useEffect(() => {
    scoreKeeper();
  }, [roomState]);

  useEffect(() => {
    let ls = localStorage.getItem('roomState');
    if (ls === null) { return; }
    if (ls !== null) { ls = JSON.parse(ls); }
    if (ls.participant) { setLocalStor(ls.participant); }
  }, []);

  const scoreKeeper = () => {
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
        message="Looks like there aren't any responses yet..."
        linkTo={roomState.loggedIn ? '/adminroom' : '/userroom'}
        linkText={roomState.loggedIn ? 'Get Those Responses!' : 'Enter Yours Now!'}
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
            <div><i className="fas fa-arrow-left"></i><Link to={roomState.loggedIn ? '/adminroom' : '/userroom'} className='responseIoLink'> Room {roomData.roomID}</Link></div>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="mt-1">
              <small>Click on a name for details.</small>
              {participants.map((participant, i) => (
                <div className="mb-2" key={i}>
                  <div className="accordion mt-1 mb-3" id={participant.name.replace(/ /g, '') + i}>
                    <div className="card">
                      <div className="card-header px-2 py-2" id="headingOne">
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="responseIoLink my-0 px-0" data-toggle="collapse" data-target={'#' + participant.name.replace(/ /g, '')} aria-expanded="false" aria-controls="collapseOne">
                          {participant.name}
                          </span>
                          <div className='scoreDiv'>Score: <span className="badge badge-light">{pointSummary[participant.name.replace(/ /g, '')]}</span></div>
                        </div>
                      </div>
                      <div id={participant.name.replace(/ /g, '')} className={participant.name === localStor ? 'collapse show' : 'collapse'} aria-labelledby="score Summary" data-parent={'#' + participant.name.replace(/ /g, '') + i}>
                        <div className="card-body">
                          <div className="table-responsive">
                            <table className="table table-striped table-sm">
                              <thead>
                                <tr className="text-center">
                                  <th>Correct</th>
                                  {participant.name === localStor ? (<th className="text-left">Response</th>) : null}
                                  <th>Round</th>
                                  <th>Question</th>
                                  <th>Points</th>
                                </tr>
                              </thead>
                              <tbody>
                                {participant.responses.map((response, i) => (
                                  <tr className="text-center" key={i}>
                                    <td className="align-middle">{response.correctInd ? (<i className="fas fa-check-circle text-success mr-2"></i>) : (<i className="fas fa-times-circle text-danger mr-2"></i>)}</td>
                                    {participant.name === localStor ? (<td className="text-left">{response.answer}</td>) : null}
                                    <td className="align-middle">{response.roundNumber}</td>
                                    <td className="align-middle">{response.questionNumber}</td>
                                    <td className={participant.name.replace(/ /g, '') + '-points align-middle'}>{response.correctInd ? response.points : 0}</td>
                                  </tr>
                                ))}{/* End Response Loop */}
                              </tbody>
                            </table>
                          </div>
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

