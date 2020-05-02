import {Modal, Button} from 'react-bootstrap';
import React, { useContext } from 'react';
import RoomContext from '../../utils/RoomContext';
import API from '../../utils/API';

function WelcomeBackModal(props) {
  const { roomState: { loggedIn }, roomState, setRoomState } = useContext(RoomContext);

  const resumeSession = async () => {
    const newRoom = await API.getRoomByCode(props.roomCode);

    if (!newRoom.data[0]) {
      throw new Error('Room Does Not Exisit');
    }

    setRoomState({ ...roomState, participant: props.participant, roomData: newRoom.data[0] })

    props.history.push('./userroom');
  }

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Welcome Back!</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Hello again, {props.participant}. Would you like to resume your session in room {props.roomCode}?</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>No</Button>
        <Button variant="primary" onClick={resumeSession}>Yes</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default WelcomeBackModal;