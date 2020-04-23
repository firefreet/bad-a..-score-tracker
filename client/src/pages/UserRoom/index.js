import React, { useContext, useEffect, useRef } from 'react';
import { Container, Row } from '../../components/Grid';
import RoomNav from '../../components/RoomNav';
import SubmitModal from '../../components/SubmitModal';
import API from '../../utils/API';
import RoomContext from '../../utils/RoomContext';

function UserRoom() {
  const answer = useRef();
  let roundNumber = useRef();
  let questionNumber = useRef();
  const { roomData, emit } = useContext(RoomContext)


  function submitAnswer() {
    const respData = {
      roomId: roomData._id, /* to be made dynamic */
      userName: 'gorgon',/* to be made dynamic */
      answer: answer.current.value,
      questionNumber: parseInt(questionNumber.current.value.slice(9)),
      roundNumber: parseInt(roundNumber.current.value.slice(6)),
      points: 3
    };

    API.saveAnswer(respData).then(() => {
      emit('new update', 'time to refresh room from DB')
    });
    answer.current.value = '';
  };

  useEffect(() => {
    console.log(roomData);
  })


  return (
    <div>
      <RoomNav />
      <Container>
        <Row>
          <label className='w-100 text-center'>Current Broadcast</label>
        </Row>
        <Row>
          <textarea rows='6' className='mx-auto w-75 bg-light' placeholder=' .... no content from game admin yet' readOnly>{roomData ? roomData.brodcast : ""}</textarea>
        </Row>
        <Row>
          <label className='mx-auto'>Your Response</label>
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
            <option>Question 2</option>
          </select>
        </Row>
        <Row>
          <button className="px-0" style={{ width: '150px' }} onClick={() => { document.location.replace('/gamesummary') }}>
            Score Board
          </button>
          <button className='ml-auto' data-toggle='modal' data-target='#submitModal' style={{ width: '150px' }}>
            Submit Answer
          </button>
        </Row>
        <SubmitModal submitAnswer={submitAnswer} />
      </Container>

    </div>
  )
}

export default UserRoom;