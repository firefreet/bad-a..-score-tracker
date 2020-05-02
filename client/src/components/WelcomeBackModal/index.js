import {Modal,Button} from 'react-bootstrap';
import React from 'react';

function WelcomeBackModal(props) {
  return (

  <Modal show={props.show} onHide={props.handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Welcome Back!</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <p>Hello again, (handle). Would you like to resume your session in room (roomCode)?</p>
    </Modal.Body>

    <Modal.Footer>
      <Button variant="secondary" onClick={props.handleClose}>No</Button>
      <Button variant="primary" onClick={props.goToQ}>Yes</Button>
    </Modal.Footer>
  </Modal>
  )
}

export default WelcomeBackModal;