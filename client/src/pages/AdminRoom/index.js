import React, { useState, useEffect, useContext, useRef } from 'react';
import { Container, Row, Col } from '../../components/Grid';
import RoomContext from '../..//utils/RoomContext';
import RoomNav from '../../components/RoomNav';
import RndQstSelectors from '../../components/RndQstSelectors';
import API from '../../utils/API';
import TopBar from '../../components/TopBar';
import Toast from 'react-bootstrap/Toast';
import SelectedRoundContext from '../../utils/selectedRoundContext';
import SelectedQuestionContext from '../../utils/SelectedQuestionContext';
import './style.scss';

// function to establish current state references to check against as previous when state changes
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  })
  return ref.current;
}


function AdminRoom() {
  const { selectedQuestion, setSelectedQuestion } = useContext(SelectedQuestionContext);
  const { selectedRound, setSelectedRound } = useContext(SelectedRoundContext);
  const { roomState: { roomData }, setRoomState, roomState } = useContext(RoomContext);
  const [tableState, setTableState] = useState([]);
  const [goToCurrent, setGoToCurrent] = useState(false);
  var table = [];
  const score = useRef();
  const broadcastField = useRef();
  const [showToast, setShowToast] = useState(false);
  const prevBroadcast = usePrevious(roomData.broadcast);


  // on new questions or rounds, display user answers
  useEffect(() => {
    if (broadcastField.current.value === '' && roomData.broadcast !== '' && roomData.broadcast !== undefined && prevBroadcast !== roomData.broadcast) {
      console.log(roomData);
      broadcastField.current.value = roomData.broadcast;
    }
    setTable();
  }, [roomData, selectedQuestion, selectedRound, showToast])

  useEffect(()=>{
    let rounds = roomData.rounds.length;
    setSelectedRound(rounds);
    setSelectedQuestion(roomData.rounds[rounds-1]);
    setGoToCurrent(true);
  },[roomData._id])



  const setTable = () => {
    table = [];
    if (roomData.participants) {
      roomData.participants.forEach((player) => {
        const currentResponse = player.responses.filter(resp => {
          if (resp.roundNumber === selectedRound
            && resp.questionNumber === selectedQuestion) {
            return true
          } else return false
        })
        if (currentResponse.length) {
          const { answer, points, correctInd, _id } = currentResponse[0];
          table.push(
            {
              player: player.name,
              answer,
              score: correctInd ? points : 0,
              userId: player._id,
              questionId: _id,
              correctInd
            }
          )
        }
      })
    }
    setTableState(table)
  }
  

  const sendBroadcast = () => {
    API.sendBroadcast(roomData._id, { broadcast: broadcastField.current.value })
      .then(resp => {
        setShowToast(true);
      })
      .catch(err => {
        console.log('Error from sendBroadcast');
        console.log(err)
      });
  }

  const clearBroadcast = () => {
    broadcastField.current.value = '';
    API.sendBroadcast(roomData._id, { broadcast: '' })
      .then(resp => {
        // console.log(resp);
      })
      .catch(err => {
        console.log('Error from Api.sendBroadcast');
        console.log(err);
      })
  }

  const deleteAnswer = (e) => {
    const i = e.target.getAttribute('datanum');
    const playerRespEl = document.getElementById('playerId' + i);
    const userId = playerRespEl.getAttribute('userid');
    const questionId = playerRespEl.getAttribute('questionid');
    API.deleteAnswer(roomData._id, userId, questionId)
      .then(delResp => {
        // console.log(delResp);
      })
      .catch(err => {
        console.log('Error from Api.deleteAnswer');
        console.log(err);
      })
  }

  const toggleCorrect = async (e) => {
    let i = e.target.getAttribute('datanum');
    let value = e.target.getAttribute('databool');
    value = value === 'true' ? 'false' : 'true';
    let playerResp = document.getElementById('playerId' + i)
    let userId = playerResp.getAttribute('userid');
    let questionId = playerResp.getAttribute('questionid');
    try {
      await API.toggleCorrect(roomData._id, userId, questionId, value).catch(err => { console.log(err) });
      const { data } = await API.getRoomByCode(roomData.roomID);
      await setRoomState({ ...roomState, roomData: data[0] });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <TopBar />
      <Container>
      <div
          aria-live="polite"
          aria-atomic="true"
          style={{
            position: 'relative',
            zIndex: 10000
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
            }}
          >
            <Toast
              autohide
              onClose={() => setShowToast(false)}
              show={showToast}
              delay={30000}
            >
              <Toast.Header>
                <img src="img/communication.svg" className="toastImg rounded mr-2" alt="" />
                <strong className="mr-3">Response.io!</strong>
                <small>just now</small>
              </Toast.Header>
              <Toast.Body>Broadcast set to room</Toast.Body>
            </Toast>
          </div>
        </div>
      </Container>

      <RoomNav admin="true"
        room={roomData.roomID}
        round={roomData.rounds.length}
        question={roomData.rounds[roomData.rounds.length - 1]}
        goToCurrent={goToCurrent}
        setGoToCurrent={setGoToCurrent} />
      <Container>
        <Row>
          <Col>
            <textarea rows='4' ref={broadcastField} className='form-control mt-2 mx-auto mb-2 mb-2 w-100 p-2' placeholder='Brodcast message to players'></textarea>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className='d-flex justify-content-between mb-2'>
              <button className="btn btn-warning btn-sm"
                onClick={sendBroadcast}>
                Broadcast
              </button>
              <button className='btn btn-outline-danger btn-sm'
                onClick={clearBroadcast}>
                Clear
              </button>
            </div>
          </Col>
        </Row>

        <hr />

        <h5>Responses</h5>
        <RndQstSelectors goToCurrent={goToCurrent} setGoToCurrent={setGoToCurrent} />

        <Row>
          <Col>
              {tableState.map((v, i) => {
                return (
                  <div id={'playerId' + i} className="d-flex align-items-stretch border-top" questionid={v.questionId} userid={v.userId} key={i}>
                    <div className="mr-1 py-2 px-1 bg-light">
                      {v.correctInd ? <i datanum={i} databool='true' onClick={toggleCorrect} className='text-success far fa-check-square'></i> :
                        <i datanum={i} databool='false' onClick={toggleCorrect} className='text-success far fa-square'></i>}
                    </div>

                    <div className="align-self-stretch mr-1 py-2 px-1">
                      [<strong>{v.player}</strong>] {v.answer} <br />
                      <span ref={score} datascore={v.score}><strong>{v.score} Pts</strong> {v.score !== 0 ? (<i className="fas fa-check-circle align-middle text-success mr-2"></i>) : (<i className="fas fa-times-circle align-middle text-danger mr-2"></i>)}</span>
                    </div>
                        
                    <div className="ml-auto py-2 px-1 bg-light">
                      <i className="text-primary fas fa-minus-circle" datanum={i} onClick={deleteAnswer}></i>
                    </div>
                  </div>)
              })}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default AdminRoom;