import React, { useRef, useEffect, useContext } from 'react';
import { Container, Row } from '../../components/Grid'
import SubmitModal from '../../components/SubmitModal';
import RoomContext from '../../utils/RoomContext';
import API from '../../utils/API';

function UserRoom() {
  const answer = useRef();
  let roundNumber = useRef();
  let questionNumber = useRef();
  const { roomData, emit } = useContext(RoomContext)


  function submitAnswer() {
    answer.current.value = '';
    // look of data to be finalized with working DB
    const respData = {
      roomId: 0,
      userName: "",
      answer: answer.current.value,
      questionNumber: parseInt(questionNumber.current.value.slice(9)),
      roundNumber: parseInt(roundNumber.current.value.slice(6)),
      points: 3
    };

    // to be finalized when DB is set up and working
    // API.saveAnswer(respData).then(() => {
    emit('new update', 'time to refresh room from DB')
    // )}

  };

  return (
    <Container>
      <Row>
        <label className='w-100 text-center'>Current Broadcast</label>
      </Row>
      <Row>
        <textarea rows='6' className='mx-auto w-75 bg-light' placeholder=' .... no content from game admin yet' readOnly>{roomData ? roomData.brodcast : ""}</textarea>
      </Row>
      <Row>
        <label className='mx-auto'>Response</label>
      </Row>
      <Row>
        <textarea ref={answer} rows='6' className='mx-auto w-75' placeholder=' .... enter your answers here'></textarea>
      </Row>
      <br />
      <Row>
        <select ref={roundNumber} className='mx-auto w-50 mb-2'>
          <option>Round 1</option>
          <option>Round 2</option>
        </select>
      </Row>
      <Row>
        <select ref={questionNumber} className='mx-auto mb-2 w-50'>
          <option>Question 1</option>
        </select>
      </Row>
      <Row>
        <button className="px-0" style={{ width: '150px' }} onClick={() => { document.location.replace('/gamesummary') }}>
          Game Summary
        </button>
        <button className='ml-auto' data-toggle='modal' data-target='#submitModal' style={{ width: '150px' }}>
          Submit Answer
        </button>
      </Row>
      <SubmitModal submitAnswer={submitAnswer} />
    </Container>
  )
}

export default UserRoom;