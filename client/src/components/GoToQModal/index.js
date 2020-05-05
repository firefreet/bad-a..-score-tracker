import {Modal,Button} from 'react-bootstrap';
import React from 'react';
import '../WelcomeBackModal/style.scss';

function GoToQModal(props) {
  return (

  <Modal show={props.show} onHide={props.handleClose} centered>
    <Modal.Header closeButton>
      <Modal.Title><img src="img/problem-solving.svg" className="modalInfoSvg align-bottom" />New Question</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <p>Admin has started a new Question, do you want to answer now?</p>
    </Modal.Body>

    <Modal.Footer>
      <Button variant="outline-danger" size="sm" onClick={props.handleClose}>No</Button>
      <Button variant="warning" size="sm" onClick={props.goToQ}>Yes</Button>
    </Modal.Footer>
  </Modal>
  )
}

export default GoToQModal;