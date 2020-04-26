import React, { useContext, useEffect, useRef } from 'react';
import { Row } from '../../components/Grid';
import RoomContext from '../../utils/RoomContext';

function RndQstSelectors() {
  const {
    roomState: {
      roomData,
      selectedRound,
      updateSelectedQuestion,
      updateSelectedRound,
      updateGoToCurr,
      goToCurrent
    } } = useContext(RoomContext);
  const { roomState } = useContext(RoomContext);
  const questionSelect = useRef();
  const roundSelect = useRef();

  // get selected round and set state (in order to display answers table)
  const chooseRound = (e) => {
    updateSelectedRound(parseInt(e.target.value), roomState);
  };

  // get selected question  and set state (in order to display answers table)
  const chooseQuestion = (e) => {
    updateSelectedQuestion(parseInt(e.target.value), roomState);
  }

  // create array of Question <options>
  const questionSelectOptions = [];
  // based on the number of questions in the selected round
  for (var i = 1; i <= roomData.rounds[selectedRound - 1]; i++) {
    questionSelectOptions.push(
      <option value={i} key={i}>
        Question {i}
      </option>
    )
  }

  useEffect(() => {
    if (goToCurrent) {
      updateGoToCurr(false, roomState);
      let rounds = roomData.rounds.length;
      roundSelect.current.value = rounds
      questionSelect.current.value = roomData.rounds[rounds - 1]
    }
  }, [goToCurrent])

  return (
    <Row>
      <div className='col-12 col-md-6 d-flex'>
        <select ref={roundSelect} className='mx-auto w-50 mb-2' onChange={chooseRound}>
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
        <select ref={questionSelect} className='mx-auto ml-auto mb-2 w-50' onChange={chooseQuestion}>
          {questionSelectOptions}
        </select>
      </div>
    </Row>
  )
}

export default RndQstSelectors;