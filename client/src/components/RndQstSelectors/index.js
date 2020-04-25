import React, { useContext } from 'react';
import { Row } from '../../components/Grid';
import RoomContext from '../../utils/RoomContext';




function RndQstSelectors() {
  const {
    roomData,
    selectedRound,
    updateSelectedQuestion,
    updateSelectedRound
  } = useContext(RoomContext);
  const roomState = useContext(RoomContext);

  // get selected round and set state (in order to display answers table)
  const chooseRound = (e) => {
    updateSelectedRound(parseInt(e.target.value), roomState);
  };

  // get selected question  and set state (in order to display answers table)
  const chooseQuestion = (e) => {
    updateSelectedQuestion(parseInt(e.target.value), roomState);
  }

  const questionSelectOptions = [];

  for (var i = 1; i <= roomData.rounds[selectedRound - 1].numberOfQuestions; i++) {
    questionSelectOptions.push(
      <option value={i} key={i}>
        Question {i}
      </option>
    )
  }

  return (
    <Row>
      <div className='col-12 col-md-6 d-flex'>
        <select className='mx-auto w-50 mb-2' onChange={chooseRound}>
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
        <select className='mx-auto ml-auto mb-2 w-50' onChange={chooseQuestion}>
          {questionSelectOptions}
        </select>
      </div>
    </Row>
  )
}

export default RndQstSelectors;