import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RoomContext from '../../utils/RoomContext';
import API from '../../utils/API';
import { Col, Row, Container } from "../../components/Grid";
import Profile from '../../components/Logout';

//ROOM MANAGER

function RoomManager(props) {
  const { roomState: { userData, setUserData }, roomState, setRoomState } = useContext(RoomContext);
  const history = useHistory();

  useEffect(() => {
    // if (userData.rooms.length > 0) {
    //   API.populateRooms()
    //     .then(async (res) => {
    //       await setUserData(res.data,roomState)
    //     })
    //     .catch(err => { console.log(err) })
    // }

  }, []);

  function handleNewRoom(e) {
    e.preventDefault();
    console.log('Clicked Add New Room Button');
    let roomData = {
      active: true,
      roomID: Math.floor(Math.random() * 10000),
    }
    API.createRoom(roomData)
      .then(res => {
        console.log(res);
        setUserData(res.data, roomState);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const joinRoom = async (e) => {
    const _id = e.target.getAttribute('id');
    const newRoom = await API.getRoom(_id)
    await setRoomState({ ...roomState, roomData: newRoom.data[0] })
    console.log(roomState)
    history.push('./adminroom')
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
            {userData.rooms.map((room,i) => (
              <button className='d-block' onClick={joinRoom} id={room._id} key={i}>{room.roomID}</button>
            ))}
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

