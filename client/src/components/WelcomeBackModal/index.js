import {Modal, Button} from 'react-bootstrap';
import React, { useContext } from 'react';
import RoomContext from '../../utils/RoomContext';
import API from '../../utils/API';
import './style.scss';

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
        <Modal.Title><img src="/img/info.svg" className="modalInfoSvg align-bottom" />Welcome Back!</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Hello again, <strong className="responseIoLink">{props.participant}</strong>. Would you like to resume your session in room <strong className="responseIoLink">{props.roomCode}</strong>?</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline-danger" size="sm" onClick={props.handleClose}>No</Button>
        <Button variant="warning" size="sm" onClick={resumeSession}>Yes</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default WelcomeBackModal;