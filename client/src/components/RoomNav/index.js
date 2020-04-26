import React, { useContext } from 'react';
import API from '../../utils/API';
import RoomContext from '../../utils/RoomContext';

function RoomNav(props) {
  const { roomState, setRoomState } = useContext(RoomContext);

  const newQuestion = async (e) => {
    const { roomData } = roomState
    const { _id } = roomData
    const { rounds } = roomData
    const roundNum = rounds.length - 1
    const { questionsNum } = rounds[roundNum];
    rounds[roundNum] = questionsNum + 1

    try {
      await API.newQuestion(_id,roundNum);
      console.log(roomState.rounds[roundNum]);
      await setRoomState({ ...roomState, roomData: {...roomData, rounds } })
      console.log(roomState.rounds[roundNum]);
    } catch (err) {
      console.log(err);
    }
  }
  const newRound = (e) => {

  }

  return (
    <div>
      <nav className=" w navbar navbar-expand-lg navbar-light bg-light">
        <p className="navbar-brand">[Room: ####] {props.room} [Current Round: {props.round} - Question: {props.question}]</p>
        {props.admin === "true" ? (
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        ) : ""}
        {props.admin === "true" ? (
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav w-100 d-flex justify-content-around">
              <li className="nav-item active">
                <button onClick={newRound} className='mx-auto mb-2' style={{ width: '150px' }}>
                  New Round
            </button>
              </li>
              <li className='nav-item active'>
                <button onClick={newQuestion} className='mx-auto mb-2' style={{ width: '150px' }}>
                  New Question
            </button>
              </li>
              <li className="nav-item">
                <button onClick={() => { document.location.replace('/gamesummary') }} className="mx-auto px-0 mb-2" style={{ width: '150px' }} >
                  Score Board
            </button>
              </li>
            </ul>
          </div>
        ) : ""}
      </nav>
    </div>
  )
}

export default RoomNav;