import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row } from '../../components/Grid';
import RoomNav from '../../components/RoomNav';
import SubmitModal from '../../components/SubmitModal';
import API from '../../utils/API';
import RoomContext from '../../utils/RoomContext';
import GoToQModal from '../../components/GoToQModal';
import RndQstSelectors from '../../components/RndQstSelectors';
import TopBar from '../../components/TopBar';
import SelectedRoundContext from '../../utils/selectedRoundContext';
import SelectedQuestionContext from '../../utils/SelectedQuestionContext';
import { set } from 'mongoose';

// function to establish current state references to check against as previous when state changes
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  })
  return ref.current;
}

function UserRoom() {
  const answer = useRef();
  const submit = useRef();
  const { roomState: { roomData, /* emit, */
    /*     selectedQuestion,
        selectedRound */
  },
    roomState,
  } = useContext(RoomContext);
  const [showGoTo, setShowGoTo] = useState(false);
  const prevRoundQuestion = usePrevious(roomData.rounds);
  const prevRoom_Id = usePrevious(roomData._id);
  const prevRoomData = usePrevious(roomData);
  const [goToCurrent, setGoToCurrent] = useState(false);
  const { selectedRound, setSelectedRound } = useContext(SelectedRoundContext);
  const { selectedQuestion, setSelectedQuestion } = useContext(SelectedQuestionContext);
  const prevSelectedRound = usePrevious(selectedRound);
  const prevSelectedQuestion = usePrevious(selectedQuestion);
  var userIndex = -1;


  // useEffect(() => {
  //   console.log('selected Question: ' + selectedQuestion);
  //   console.log('selected Round: ' + selectedRound);
  // }, [])


  // on mount, clear out any previous answers
  // that may have been left behind from back / forward
  useEffect(() => {
    toggleReadonly(false);
    // get index of user from the Room's participant list array
    userIndex = roomData.participants.findIndex(element => {
      return element.name === roomState.participant
    })
    answer.current.value = '';
    // on unmount initialize variables for same reason
    return () => {
      setGoToCurrent(false);
    }
  }, [])

  // 
  useEffect(() => {
    userIndex = roomData.participants.findIndex(element => {
      return element.name === roomState.participant
    })
    const prevData = prevRoomData !== undefined ? true : false;
    // check if there has been a change to the participant (responses)
    // this should only happen when the user submits, or when an admin deletes
    if (!prevData || (JSON.stringify(prevRoomData.participants[userIndex]) !== JSON.stringify(roomData.participants[userIndex]))) {
      // blank out the answer
      answer.current.value = '';
    }
    // check if this useEffect was triggered by selected Round or Question updates
    else if (prevSelectedRound !== selectedRound || prevSelectedQuestion !== selectedQuestion) {
      // blank out answer
      answer.current.value = '';
    } 
    // then go see if there is anything in the database to display
    showResponse(false);
  }, [roomData, selectedQuestion, selectedRound]);

  // hide GoToQModal
  const handleClose = () => {
    setShowGoTo(false);
  }

  // set flag to allow changing <select>'s option to Current Round & Q
  const goToQ = () => {
    setGoToCurrent(true);
    setShowGoTo(false);
  }


  useEffect(() => {
    const currRound = roomData.rounds.length;
    // if there is a new question or round
    if (
      (roomData.rounds.length > 1 || roomData.rounds[0] > 1) &&
      (roomData._id !== prevRoom_Id || prevRoundQuestion.length !== currRound || prevRoundQuestion[currRound - 1] !== roomData.rounds[currRound - 1])
    ) {
      // display modal to ask user if they want to go to the new Q / R
      setShowGoTo(true);
    };
  }, [roomData._id, roomData.rounds])

  // get user's answer to post to DB
  function submitAnswer() {
    const respData = {
      roomId: roomData._id,
      userName: roomState.participant,/* to be made dynamic */
      answer: answer.current.value,
      questionNumber: selectedQuestion,
      roundNumber: selectedRound,
      points: 3
    };
    API.saveAnswer(respData).then(() => {
      // emit('new update', 'time to refresh room from DB')
    })
      .catch(err => console.log(err));
    // make textarea readonly
    toggleReadonly(true);
  };

  const allowSubmit = () => {
    // onChange of textarea if there is text allow sumbit, otherwise disable
    answer.current.value !== '' ? toggleSubmit(true) : toggleSubmit(false);
  }

  // set classes to enable or disable the Submit button
  const toggleSubmit = (allowSubmit) => {
    let sub = submit.current;
    let subClass = sub.classList;
    if (!allowSubmit) {
      subClass.remove('text-body');
      subClass.add('text-muted');
      sub.setAttribute('disabled', 'true');
    } else {
      subClass.remove('text-muted');
      subClass.add('text-body');
      sub.removeAttribute('disabled')
    }
  }

  // set classes and enables or disables editing of the textarea
  const toggleReadonly = (readOnly) => {
    let ans = answer.current;
    if (readOnly) {
      ans.setAttribute('readonly', 'true');
      ans.classList.add('bg-light', 'font-italic', 'text-muted');
      toggleSubmit(false);
    } else {
      ans.removeAttribute('readonly');
      ans.classList.remove('bg-light', 'font-italic', 'text-muted');
      if (ans.value !== '') {
        toggleSubmit(true);
      }
    }
  }


  // looks for previously answered questions and displays if exists
  function showResponse(goTo) {
    let ans = answer.current;
    let qN = selectedQuestion;
    let rN = selectedRound;
    // on go to current question, set selected round and question
    if (goTo) {
      rN = roomData.rounds.length;
      qN = roomData.rounds[rN - 1];
      setSelectedQuestion(qN);
      setSelectedRound(rN);
    }
    userIndex = roomData.participants.findIndex(element => {
      return element.name === roomState.participant
    });
    // if the user was found...
    if (userIndex !== -1) {
      const existingRoom = prevRoomData === undefined ? true : false;
      const existingUser = prevRoomData && prevRoomData.participants[userIndex] ? true : false;
      // get the index of the user's answer to the selected Round & Question
      let answerIndex = roomData.participants[userIndex].responses.findIndex(element => {
        return (element.questionNumber === qN && element.roundNumber === rN)
      })
      // if the answer was found...
      if (answerIndex !== -1) {
        // if not the same as the last time roomData was refreshed from db
        if (!existingRoom || (existingUser && (prevRoomData.participants[userIndex].responses[answerIndex].answer !== roomData.participants[userIndex].responses[answerIndex].answer))) {
          // display it
          ans.value = roomData.participants[userIndex].responses[answerIndex].answer;
        }
        toggleReadonly(true);
      } else {
        toggleReadonly(false);
      }
    } else {
      toggleReadonly(false);
    }
    // get the current round
    let currRound = roomData.rounds.length;
    // if selected a previous round or question
    if (rN < currRound || (rN === currRound && qN < roomData.rounds[currRound - 1])) {
      // set to read only 
      toggleReadonly(true);
    }
  }
  // if user decides to go to current question...
  useEffect(() => {
    // tell showResponse function it will need to update selected Round and Question
    if (goToCurrent) {
      showResponse(true);
    }
  }, [goToCurrent])

  return (
    <div>
      <TopBar />
      <RoomNav admin="false" room={roomData.roomID} round={roomData.rounds.length} question={roomData.rounds[roomData.rounds.length - 1]} />
      <Container>
        <Row>
          <label className='w-100 text-center'>Current Broadcast</label>
        </Row>
        <Row>
          <textarea rows='6' className='mx-auto w-75 bg-light' placeholder=' .... no content from game admin yet' readOnly value={roomData ? roomData.broadcast : ""}></textarea>
        </Row>
        <Row>
          <label className='mx-auto'>{roomState.participant}'s Response</label>
        </Row>
        <Row>
          <textarea ref={answer} onChange={allowSubmit} rows='6' className='mx-auto w-75' placeholder=' .... enter your answers here'></textarea>
        </Row>
        <br />
        <RndQstSelectors goToCurrent={goToCurrent} setGoToCurrent={setGoToCurrent} />
        <Row>
          <Link to='gamesummary'>
            <button className="btn-info text-center px-0" style={{ width: '150px' }}>
              Score Board
            </button>
          </Link>
          <button ref={submit} className='ml-auto btn-disabled btn-success' data-toggle='modal' data-target='#submitModal' style={{ width: '150px' }}>
            Submit Answer
          </button>
        </Row>
        <GoToQModal show={showGoTo} handleClose={handleClose} goToQ={goToQ} />
        <SubmitModal submitAnswer={submitAnswer} />
      </Container>

    </div>
  )
}

export default UserRoom;