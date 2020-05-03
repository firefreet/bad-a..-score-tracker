import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../utils/API';
import RoomContext from '../../utils/RoomContext';
import SelectedRoundContext from '../../utils/selectedRoundContext';
import SelectedQuestionContext from '../../utils/SelectedQuestionContext';

function RoomNav(props) {
  const { roomState, setRoomState, roomState: { roomData } } = useContext(RoomContext);
  const { selectedRound, setSelectedRound } = useContext(SelectedRoundContext);
  const { selectedQuestion, setSelectedQuestion } = useContext(SelectedQuestionContext);

  const newQuestion = async (e) => {
    const { roomData } = roomState
    const { _id } = roomData
    const { rounds } = roomData
    const roundNum = rounds.length - 1
    try {
      var { data } = await API.newQuestion(_id, roundNum);
      rounds[roundNum] = parseInt(data);
      await setRoomState({ ...roomState, roomData: {...roomData, rounds } })
      await setSelectedQuestion(rounds[roundNum]);
      await setSelectedRound(roundNum +1);
    } catch (err) {
      console.log(err);
    }
  }

  const newRound = async (e) => {
    const { roomData } = roomState
    const { _id } = roomData
    try {
      var { data } = await API.newRound(_id);
      await setRoomState({ ...roomState, roomData: {...roomData, rounds: data } })
      await setSelectedRound(data.length);
      await setSelectedQuestion(1);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    // props.setGoToCurrent(true);
  }, [selectedQuestion, selectedRound])



  return (
    <div>
      <nav className=" w navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="row w-100">
            <div className={props.admin === 'true' ? 'col-8' : 'col-12'}>
              <div className="d-inline-flex">
                <div className="mx-1">[Room: {props.room}] </div>
              </div>
              <div className="d-inline-flex">
                <div className='mx-1'>Current Round: {props.round}</div>
              </div>
              <div className="d-inline-flex">
                <div className='mx-1'>Current Q: {props.question}</div>
              </div>
            </div>
            {props.admin === "true" ? (
              <div className="col px-0">
                <button className="float-right navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
              </div>
            ) : ""}
            {props.admin === "true" ? (
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav w-100 d-flex justify-content-around">
                  <li className="nav-item active d-flex">
                    <button onClick={newRound} className='mx-auto mb-2' style={{ width: '150px' }}>
                      New Round
            </button>
                  </li>
                  <li className='nav-item active d-flex'>
                    <button onClick={newQuestion} className='mx-auto mb-2' style={{ width: '150px' }}>
                      New Question
            </button>
                  </li>
                  <li className="nav-item d-flex">
                    <Link to='gamesummary' className='mx-auto'>
                      <button className="mx-auto px-0 mb-2" style={{ width: '150px' }} >
                        Score Board
              </button>
                    </Link>
                  </li>
                </ul>
              </div>
            ) : ""}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default RoomNav;