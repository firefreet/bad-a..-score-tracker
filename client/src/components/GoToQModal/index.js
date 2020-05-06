import {Modal,Button} from 'react-bootstrap';
import React from 'react';
import '../WelcomeBackModal/style.scss';

function GoToQModal(props) {
  return (

  <Modal show={props.show} onHide={props.handleClose} centered>
    <Modal.Header closeButton>
      <Modal.Title><img src="img/problem-solving.svg" alt='trivia!' className="modalInfoSvg align-bottom" />Moving to current Question</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <p>Good Luck!</p>
    </Modal.Body>

    <Modal.Footer>
      <Button variant="warning" size="sm" onClick={props.handleClose}>OK</Button>
    </Modal.Footer>
  </Modal>
  )
}

export default GoToQModal;