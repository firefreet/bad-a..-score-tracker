import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../utils/API';
import RoomContext from '../../utils/RoomContext';
import SelectedRoundContext from '../../utils/selectedRoundContext';
import SelectedQuestionContext from '../../utils/SelectedQuestionContext';
import { Container, Row, Col } from '../Grid';

function RoomNav(props) {
  const { roomState, setRoomState, roomState: { roomData } } = useContext(RoomContext);
  const { selectedRound, setSelectedRound } = useContext(SelectedRoundContext);
  const { selectedQuestion, setSelectedQuestion } = useContext(SelectedQuestionContext);

  const newQuestion = async (e) => {
    const { roomData } = roomState
    const { _id } = roomData
    const { rounds } = roomData
    const roundNum = rounds.length - 1
    try {
      var { data } = await API.newQuestion(_id, roundNum);
      rounds[roundNum] = parseInt(data);
      await setRoomState({ ...roomState, roomData: {...roomData, rounds } })
      await setSelectedQuestion(rounds[roundNum]);
      await setSelectedRound(roundNum +1);
    } catch (err) {
      console.log(err);
    }
  }

  const newRound = async (e) => {
    const { roomData } = roomState
    const { _id } = roomData
    try {
      var { data } = await API.newRound(_id);
      await setRoomState({ ...roomState, roomData: {...roomData, rounds: data } })
      await setSelectedRound(data.length);
      await setSelectedQuestion(1);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    // props.setGoToCurrent(true);
  }, [selectedQuestion, selectedRound])



  return (
    <Container classes="container mb-2">
      <Row>
        <Col>
          <h3>Room: <Link className="responseIoLink" to={props.admin ? '/rooms' : '/'}>{props.room}</Link></h3>
          <div className="d-flex mb-2">
            <h5 className="mr-2">Round: {props.round}  | Question: {props.question}</h5>
          </div>
        </Col>
      </Row>

      {props.admin === "true" ? (
        <Row>
          <Col>
            <div>
              <button onClick={newRound} className='btn btn-primary btn-sm mr-1'>
                <i className="fas fa-circle-notch"></i> New Round
              </button>
              <button onClick={newQuestion} className='btn btn-primary btn-sm mr-1'>
                <i className="fas fa-question"></i> New Question
              </button>
              <Link to='gamesummary' className='mx-auto'>
              <button className="btn btn-primary btn-sm">
                <i class="fas fa-list-ol"></i> Scores
              </button>
              </Link>
            </div>
          </Col>
        </Row>
      ) : null}

    </Container>
  )
}

export default RoomNav;