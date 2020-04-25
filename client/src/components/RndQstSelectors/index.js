import React, { useEffect, useContext } from 'react';
import { Row } from '../../components/Grid';
import RoomContext from '../../utils/RoomContext';




function RndQstSelectors(props) {
  const { roomData, emit } = useContext(RoomContext);

  return (
    <Row>
      <div className='col-12 col-md-6 d-flex'>
        <select className='mx-auto w-50 mb-2' onChange={props.chooseRound}>
          {roomData.rounds.map((v, i) => {
            return (
              <option value={i + 1} key={i}>
                Round {i + 1}
              </option>
            )
          })}
        </select>
      </div>
      <div className='col-12 col-md-6 d-flex'>
        <select className='mx-auto ml-auto mb-2 w-50' onChange={props.chooseQuestion}>
          <option>Question 1</option>
          <option>Question 2</option>
        </select>
      </div>
    </Row>
  )
}

export default RndQstSelectors;