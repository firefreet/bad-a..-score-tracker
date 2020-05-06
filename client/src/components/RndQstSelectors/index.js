import React, { useContext, useEffect, useRef, useState } from 'react';
import { Row, Col } from '../../components/Grid';
import RoomContext from '../../utils/RoomContext';
import SelectedRoundContext from '../../utils/selectedRoundContext';
import SelectedQuestionContext from '../../utils/SelectedQuestionContext';

function RndQstSelectors(props) {
  const { selectedRound, setSelectedRound } = useContext(SelectedRoundContext);
  const { selectedQuestion, setSelectedQuestion } = useContext(SelectedQuestionContext);
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
    setSelectedQuestion(1);
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
    return () => {
      setSelectedQuestion(1)
      setSelectedRound(1);
    }
  }, [])

  useEffect(() => {
    createQuestionsOptions();
  }, [roomData, selectedRound, selectedQuestion])

  useEffect(() => {
    if (props.goToCurrent) {
      async function async() {
        await props.setGoToCurrent(false);
        roundSelect.current.value = selectedRound;
        await createQuestionsOptions();
        questionSelect.current.value = selectedQuestion;
      }
      async();
    }
  }, [props.goToCurrent])

  return (
    <Row>
      <Col>
        <div className={!props.admin ? 'd-flex my-2' : 'd-flex justify-content-between my-2'}>
          <div>
            <select ref={roundSelect} className='form-control-sm mr-2' onChange={chooseRound}>
              {roomData.rounds.map((v, i) => {
                return (
                  <option value={i + 1} key={i}>
                    Round {i + 1}
                  </option>
                )
              })}
            </select>  
          </div>
          <div>
            <select ref={questionSelect} className='form-control-sm' onChange={chooseQuestion}>
              {qListState}
            </select>
          </div>
        </div>
      </Col>
    </Row>
  )
}

export default RndQstSelectors;