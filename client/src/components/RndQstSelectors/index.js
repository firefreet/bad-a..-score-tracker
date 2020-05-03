import React, { useContext, useEffect, useRef, useState } from 'react';
import { Row } from '../../components/Grid';
import RoomContext from '../../utils/RoomContext';
import SelectedRoundContext from '../../utils/selectedRoundContext';
import SelectedQuestionContext from '../../utils/SelectedQuestionContext';

function RndQstSelectors(props) {
  const {selectedRound, setSelectedRound} = useContext(SelectedRoundContext);
  const {selectedQuestion, setSelectedQuestion} = useContext(SelectedQuestionContext);
  const {
    roomState: {
      roomData,
/*       selectedRound,
      selectedQuestion, */
/*       updateSelectedQuestion,
      updateSelectedRound */
    } } = useContext(RoomContext);
  const { roomState } = useContext(RoomContext);
  const questionSelect = useRef();
  const roundSelect = useRef();
  const [qListState, setQListState] = useState();

  // get selected round and set state (in order to display answers table)
  const chooseRound = (e) => {
    // console.log('choose round on click')
    setSelectedRound(parseInt(e.target.value));
  };

  // get selected question  and set state (in order to display answers table)
  const chooseQuestion = (e) => {
    // console.log('choose question on click')
    setSelectedQuestion(parseInt(e.target.value));
  }

  // create array of Question <options>
  var questionSelectOptions = [];

  async function createQuestionsOptions() {
    questionSelectOptions = [];
    // based on the number of questions in the selected round
    for (var i = 1; i <= roomData.rounds[selectedRound - 1]; i++) {
      questionSelectOptions.push(
        <option value={i} key={i}>
          Question {i}
        </option>
      )
    }
    await setQListState(questionSelectOptions);
  }

  useEffect(() => {
    createQuestionsOptions();
  }, [roomData, selectedRound, selectedQuestion])

  useEffect(() => {

    if (props.goToCurrent) {
      if (props.goToCurrent) {
        async function async() {
          await props.setGoToCurrent(false, roomState);
          let rounds = roomData.rounds.length;
          roundSelect.current.value = rounds
          questionSelect.current.value = roomData.rounds[rounds - 1]
          await setSelectedRound(roomData.rounds.length, roomState);
          createQuestionsOptions();
        }
        async();
      }
    }
  }, [props.goToCurrent])

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
          {qListState}
        </select>
      </div>
    </Row>
  )
}

export default RndQstSelectors;