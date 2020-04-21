import React from 'react';
import { Container, Row } from '../../components/Grid'

function UserRoom() {
  return (
    <Container>
      <Row>
        <label className='w-100 text-center'>Current Broadcast</label>
      </Row>
      <Row>
        <textarea rows='6' className='mx-auto w-75 bg-light' readOnly></textarea>
      </Row>
      <br />
      <Row>
        <textarea rows='6' className='mx-auto w-75' placeholder=' .... enter answers here'></textarea>
      </Row>
      <br />
      <Row>
        <select className='mx-auto w-25 mb-2'>
          <option>Round 1</option>
        </select>
      </Row>
      <Row>
      	<select className='mx-auto w-25'>
          <option>Question 1</option>
        </select>
      </Row>
      <Row>
        <button style={{ width: '200px' }}>
          Show Game Summary
        </button>
        <button className='ml-auto' style={{ width: '150px' }}>
          Submit Answer
        </button>
      </Row>
    </Container>
  )
}

export default UserRoom;