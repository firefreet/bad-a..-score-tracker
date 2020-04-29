import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RoomContext from '../../utils/RoomContext';
import API from '../../utils/API';
import { Col, Row, Container } from "../../components/Grid";
import Profile from '../../components/Profile';

//ROOM MANAGER

function RoomManager(props) {
  const { roomState: { userData, setUserData }, roomState, setRoomState } = useContext(RoomContext);
  const history = useHistory();

  useEffect(() => {
  }, []);


  function handleNewRoom(e) {
    e.preventDefault();
    let roomData = {
      active: true,
      roomID: Math.floor(Math.random() * 10000),
    }
    API.createRoom(roomData)
      .then(res => {
        setUserData(true, res.data, roomState);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const joinRoom = async (e) => {
    const _id = e.target.getAttribute('id');
    const newRoom = await API.getRoom(_id)
    setRoomState({ ...roomState, roomData: newRoom.data[0] })
    history.push('./adminroom')
  }

  const toggleRoomActive = async (e) => {
    // console.log(e.target);
    let id = e.target.id;
    let state = e.target.dataset.state === 'true' ? false : true;
    // console.log(id, state);
    let res = await API.toggleRoomActive(state, id);
    setUserData(true, res.data, roomState);    
  }

if (userData.rooms.length === 0) {
  return (
    <Container classes="container mt-5">
      <Row>
        <Col>
          <h3>{userData.firstName}'s Rooms</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className='mt-3'>
            <button
              className="btn btn-warning btn-sm mt-3"
              onClick={handleNewRoom}
            >
              Create First Room
              </button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

if (userData.rooms.length > 0) {

  return (
    <Container classes="container mt-5">
      <Row>
        <Col>
          <h3>{userData.firstName}'s Rooms</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className='mt-3'>
            <table className='table table-striped table-sm'>
              <thead>
                <tr>
                  <th scope='col'>Room #</th>
                  <th scope='col'>Active</th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
                {userData.rooms.map((room,i) => (
                  <tr key={i}>
                    <td>{room.roomID}</td>
                    <td>
                      <div className="custom-control custom-switch">
                        <input onChange={toggleRoomActive} type="checkbox" checked={room.active} data-state={room.active} className="custom-control-input" id={room._id} />
                        <label className="custom-control-label" htmlFor={room._id}></label>
                      </div>
                    </td>
                    <td><button className='btn btn-outline-success btn-sm' onClick={joinRoom} id={room._id}>Enter</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="btn btn-warning btn-sm mt-3"
              onClick={handleNewRoom}
            >Create New Room</button>
          </div>
        </Col>
      </Row>
      <Profile />
    </Container>
  )
}



};

export default RoomManager;

