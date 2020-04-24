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
  const { roomData, emit } = useContext(RoomContext);


  function submitAnswer() {
    const respData = {
      roomId: roomData._id, /* to be made dynamic */
      userName: 'Clotho',/* to be made dynamic */
      answer: answer.current.value,
      questionNumber: parseInt(questionNumber.current.value.slice(9)),
      roundNumber: parseInt(roundNumber.current.value.slice(6)),
      points: 3
    };

    API.saveAnswer(respData).then(() => {
      // emit('new update', 'time to refresh room from DB')
    });
    answer.current.value = '';
  };

  function changeRound(e) {
    let rN = parseInt(e.target.value.slice(6));
    questionNumber.current.innerHTML = "";
    for (var i = 1; i <= roomData.rounds[rN - 1].numberOfQuestions; i++) {
      let optionEl = document.createElement('option');
      optionEl.innerText = `Question ${i}`;
      questionNumber.current.append(optionEl)
      showResponse();
    }
  }

  function showResponse() {
    let qN = parseInt(questionNumber.current.value.slice(9));
    let rN = parseInt(roundNumber.current.value.slice(6));
    let userIndex = roomData.participants.findIndex(element => {
      return element.name === 'Clotho' /* to be made dynamic */
    })
    console.log(userIndex);
    if (userIndex !== -1) {
      let answerIndex = roomData.participants[userIndex].responses.findIndex(element => {
        return (element.questionNumber === qN && element.roundNumber === rN)
      })
      if (answerIndex !== -1) {
        answer.current.innerText = roomData.participants[userIndex].responses[answerIndex].answer
      } else {
        answer.current.innerText = ""
      }
    } else {
      answer.current.innerText = ""
    }
  }

  useEffect(() => {
    roomData.rounds.forEach((v, i) => {
      let optionEl = document.createElement('option');
      optionEl.innerHTML = `Round ${i + 1}`
      roundNumber.current.append(optionEl);
    });
    questionNumber.current.innerHTML = "";
    let rN = parseInt(roundNumber.current.value.slice(6));
    for (var i = 1; i <= roomData.rounds[rN - 1].numberOfQuestions; i++) {
      let optionEl = document.createElement('option');
      optionEl.innerText = `Question ${i}`;
      questionNumber.current.append(optionEl)
    }
    showResponse();
  });


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
          <select ref={roundNumber} onChange={changeRound} className='mx-auto w-50 mb-2'>
          </select>
        </Row>
        <Row>
          <select ref={questionNumber} onChange={showResponse} className='mx-auto mb-2 w-50'>
            <option>Question 1</option>
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