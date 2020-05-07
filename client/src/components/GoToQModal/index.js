import {Modal,Button} from 'react-bootstrap';
import React from 'react';
import '../WelcomeBackModal/style.scss';

function GoToQModal(props) {
  return (

  <Modal show={props.show} onHide={props.handleClose} centered>
    <Modal.Header closeButton>
      <Modal.Title><img src="img/problem-solving.svg" alt='trivia!' className="modalInfoSvg align-bottom" />Next Question</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <Button variant="warning" size="sm" onClick={props.handleClose}>I want to go to there</Button>
    </Modal.Body>

  </Modal>
  )
}

export default GoToQModal;