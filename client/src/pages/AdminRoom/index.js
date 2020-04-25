import React, { useState, useEffect, useContext } from 'react';
import { Container, Row } from '../../components/Grid';
import RoomContext from '../..//utils/RoomContext';
import RoomNav from '../../components/RoomNav';
import RndQstSelectors from '../../components/RndQstSelectors';


function AdminRoom() {
  const { roomData, /* emit */ } = useContext(RoomContext);
  const table = [];
  // to store the state of the admin's selection of round/answer to view table
  const [questionState, setQuestionState] = useState(
    {
      selectedRound: 1,
      selectedQuestion: 1,
      table: []
    }
  );
  
  // get selected round and set state (in order to display answers table)
  const chooseRound = (e) => {
    const round = parseInt(e.target.value.slice(6));
    console.log()
    setQuestionState({ ...questionState, selectedRound: round });
  };

  // get selected question  and set state (in order to display answers table)
  const chooseQuestion = (e) => {
    const question = parseInt(e.target.value.slice(9));
    setQuestionState({ ...questionState, selectedQuestion: question });
  }

  // on new questions or rounds, display user answers
  useEffect(() => {
    setTable();
  }, [questionState.selectedQuestion, questionState.selectedRound])

  const setTable = () => {
    if (roomData.participants) {
      roomData.participants.forEach((player, i) => {
        const currentResponse = player.responses.filter(resp => {
          if (resp.roundNumber === questionState.selectedRound
            && resp.questionNumber === questionState.selectedQuestion) {
            return true
          } else return false
        })
        if (currentResponse.length) {
          table.push(
            {
              player: player.name,
              answer: currentResponse[0].answer
            }
          )
        }
      })
      setQuestionState({ ...questionState, table })
    }
  }

  return (
    <div>
      <RoomNav room={roomData.roomId} round={roomData.rounds.length} question={roomData.rounds[roomData.rounds.length -1].numberOfQuestions}/>
      <Container>
        <Row>
          <textarea rows='6' className='mx-auto mb-2 mb-2 w-75' placeholder='...type or paste content here to BROADCAST to players ...'></textarea>
        </Row>
        <Row>
          <div className='mb-2 container-fluid d-flex w-75 p-0'>
            <button className="btn btn-success btn-sm px-0 mr-auto" style={{ width: '50px' }}>
              Save
              </button>
            <button className='btn btn-info btn-sm ml-auto mr-0' style={{ width: '50px' }}>
              Clear
              </button>
          </div>
        </Row>
        <Row>
          <p className='text-center mx-auto mt-2 border w-75'>See Player Responses: </p>
        </Row>
          <RndQstSelectors chooseRound={chooseRound} chooseQuestion={chooseQuestion} />
        <Row>
          <table className="table table-striped border">
            <thead>
              <tr>
                <th width="70%" scope="col">Player</th>
                <th scope="col" className='text-center'>Correct</th>
                <th scope="col" className='text-center'>Delete</th>
              </tr>
            </thead>
            {questionState.table.map((v, i) => {
              return (
                <tbody key={i}>
                  <tr>
                    <td>{v.player}</td>
                    <td>
                      <div className="d-flex">
                        <input type="checkbox" className="mx-auto" />
                      </div>
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