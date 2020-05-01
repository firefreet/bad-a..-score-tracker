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
  const { roomState } = useContext(RoomContext);
  const [pointSummary, setPointSummary] = useState({});
  // const history = useHistory();
  let participants = roomState.roomData.participants;
  let roomData = roomState.roomData;

  useEffect(() => {
    scoreKeeper();
  }, []);

  const scoreKeeper = () => {
    console.log('Tabulating Scores');
    let participantArr = [];
    let pointsObj = {};
    participants.forEach(participant => {
      participantArr.push(participant.name);
    })
    console.log(participantArr);

    participantArr.forEach(name => {
      let $pointEls = document.getElementsByClassName(`${name}-points`);
      pointsObj[name] = 0
      for (let points of $pointEls ) {
        pointsObj[name] += parseInt(points.innerText)
      }
    })

    console.log(pointsObj);
    setPointSummary(pointsObj);


    // setPointSummary('name')
  }

  // API.gameSummary().then(res => setGameSummary(res)).catch(err => console.log(err));

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

                  <div className="accordion mt-3 mb-3" id={participant.name + i}>
                    <div className="card">
                      <div className="card-header px-2 py-2" id="headingOne">
                        <div className="d-flex justify-content-between align-items-center">
                          <div><strong>{participant.name}</strong></div>
                          <button className="btn btn-link responseIoLink my-0 px-0" type="button" data-toggle="collapse" data-target={'#'+participant.name} aria-expanded="false" aria-controls="collapseOne">
                            Show {participant.name}'s Details
                          </button>
                          <div className='scoreDiv'>Score: <span className="badge badge-light">{pointSummary[participant.name]}</span></div>
                        </div>
                      </div>

                      <div id={participant.name} className="collapse" aria-labelledby="score Summary" data-parent={'#'+participant.name + i}>
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
                                  <td className={participant.name + '-points'}>{response.correctInd ? response.points : 0}</td>
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

