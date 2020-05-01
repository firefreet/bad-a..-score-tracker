import React, { useState, useEffect, useContext, useRef } from 'react';
import { Container, Row } from '../../components/Grid';
import RoomContext from '../..//utils/RoomContext';
import RoomNav from '../../components/RoomNav';
import RndQstSelectors from '../../components/RndQstSelectors';
import API from '../../utils/API';


function AdminRoom() {
  const { roomState: { roomData, /* emit, */ selectedQuestion, selectedRound }, setRoomState, roomState } = useContext(RoomContext);
  const [tableState, setTableState] = useState([]);
  var table = [];
  const score = useRef();
  const broadcastField = useRef();

  // on new questions or rounds, display user answers
  useEffect(() => {
    setTable();
  }, [roomData, selectedQuestion, selectedRound])

  const setTable = () => {
    table = [];
    if (roomData.participants) {
      roomData.participants.forEach((player) => {
        const currentResponse = player.responses.filter(resp => {
          if (resp.roundNumber === selectedRound
            && resp.questionNumber === selectedQuestion) {
            return true
          } else return false
        })
        if (currentResponse.length) {
          const { answer, points, correctInd, _id } = currentResponse[0];
          table.push(
            {
              player: player.name,
              answer,
              score: correctInd ? points : 0,
              userId: player._id,
              questionId: _id,
              correctInd
            }
          )
        }
      })
    }
    setTableState(table)
  }

  const sendBroadcast = ()=>{
    API.sendBroadcast(roomData._id, {broadcast: broadcastField.current.value});
  }

  const clearBroadcast = () => {
    broadcastField.current.value = '';
    API.sendBroadcast(roomData._id,{broadcast: ''})
  }

  const toggleCorrect = async (e) => {
    let i = e.target.getAttribute('datanum');
    let value = e.target.getAttribute('databool');
    value = value === 'true' ? 'false' : 'true';
    let playerResp = document.getElementById('playerId' + i)
    let userId = playerResp.getAttribute('userid');
    let questionId = playerResp.getAttribute('questionid');
    try {
      await API.toggleCorrect(roomData._id, userId, questionId, value).catch(err => { console.log(err) });
      const { data } = await API.getRoom(roomData._id);
      await setRoomState({ ...roomState, roomData: data[0] });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <RoomNav admin="true" room={roomData.roomID} round={roomData.rounds.length} question={roomData.rounds[roomData.rounds.length - 1]} />
      <Container>
        <Row>
          <textarea rows='6' ref={broadcastField} className='mt-2 mx-auto mb-2 mb-2 w-75' placeholder='...type or paste content here to BROADCAST to players ...'></textarea>
        </Row>
        <Row>
          <div className='mb-2 container-fluid d-flex w-75 p-0'>
            <button className="btn btn-success btn-sm px-0 mr-auto" 
            style={{ width: '50px' }}
            onClick={sendBroadcast}>
              Send
              </button>
            <button className='btn btn-info btn-sm ml-auto mr-0'
              style={{ width: '50px' }}
              onClick={clearBroadcast}>
              Clear
              </button>
          </div>
        </Row>
        <Row>
          <p className='text-center mx-auto mt-2 border w-75'>See Player Responses: </p>
        </Row>
        <RndQstSelectors />
        <Row>
          <table className="table table-striped border">
            <thead>
              <tr>
                <th width="70%" scope="col">Player</th>
                <th scope="col" className='text-center'>Correct</th>
                <th scope="col" className='text-center'>Score</th>
                <th scope="col" className='text-center'>Delete</th>
              </tr>
            </thead>
            {tableState.map((v, i) => {
              return (
                <tbody id={'playerId' + i} questionid={v.questionId} userid={v.userId} key={i}>
                  <tr>
                    <td>{v.player}</td>
                    <td>
                      <div className='d-flex'>
                        {v.correctInd ? <i datanum={i} databool='true' onClick={toggleCorrect} className='mx-auto text-center far fa-check-square'></i> :
                          <i datanum={i} databool='false' onClick={toggleCorrect} className='mx-auto far fa-square'></i>}
                      </div>
                    </td>
                    <td>
                      <div ref={score} datascore={v.score} className='text-center'>{v.score}</div>
                    </td>
                    <td className='d-flex'>
                      <i className="mx-auto fas fa-minus-circle"></i>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan='10'>{v.answer}</td>
                  </tr>
                </tbody>)
            })}
          </table>
        </Row>
        <div className='px-3'>
          <Row>
            <div className="col-12 col-md-4 mb-1 d-flex">
            </div>
            <div className="col-12 col-md-4 mb-1 d-flex">
            </div>
            <div className="col-12 col-md-4 mb-1 d-flex">
            </div>
          </Row>
        </div>
      </Container>
    </div>
  )
}

export default AdminRoom;