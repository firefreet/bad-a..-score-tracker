import React, { useRef, useEffect } from 'react';
import { Container, Row } from '../../components/Grid'

function UserRoom() {
  const answer = useRef();
  let roundNumber = useRef();
  let questionNumber = useRef();


  function sumbmitAnswer() {
    // modal for are you sure?
    answer.current.value = '';
    const respData = {
      answer: answer.current.value,
      questionNumber: parseInt(questionNumber.current.value.slice(9)),
      roundNumber: parseInt(roundNumber.current.value.slice(6)),
      points: 3
    };
    console.log(respData);
    // call a post to the database.
    // based on participant and room number.
    // which i assume will be saved in state
    // and likely a cookie or local storage.
    // upon successful db update, use the emit
    // function from state, to notify other clients of the update
  };

  // expect all users previous answers to be stored in state
  // on selecting a previous round/question, should display 
  // the user's answer and make the field read only


  // ensure io.on is updating state for the broadcast and setting it here

  return (
    <Container>
      <Row>
        <label className='w-100 text-center'>Current Broadcast</label>
      </Row>
      <Row>
        <textarea rows='6' className='mx-auto w-75 bg-light' placeholder=' .... no content from game admin yet' readOnly>{/* get this from state */}</textarea>
      </Row>
      <Row>
        <label className='mx-auto'>Response</label>
      </Row>
      <Row>
        <textarea ref={answer} rows='6' className='mx-auto w-75' placeholder=' .... enter your answers here'></textarea>
      </Row>
      <br />
      <Row>
        <select ref={roundNumber} className='mx-auto w-25 mb-2'>
          <option>Round 1</option>
          <option>Round 2</option>
        </select>
      </Row>
      <Row>
        <select ref={questionNumber} className='mx-auto w-25'>
          <option>Question 1</option>
        </select>
      </Row>
      <Row>
        <button style={{ width: '150px' }} onClick={() => { document.location.replace('/gamesummary') }}>
          Game Summary
        </button>
        <button className='ml-auto' style={{ width: '150px' }} onClick={sumbmitAnswer}>
          Submit Answer
        </button>
      </Row>
    </Container>
  )
}

export default UserRoom;