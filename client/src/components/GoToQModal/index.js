import {Modal,Button} from 'react-bootstrap';
import React from 'react';

function GoToQModal(props) {
  return (

  <Modal show={props.show} onHide={props.handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>New Question Available</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <p>Admin has started a new Question, do you want to answer now?</p>
    </Modal.Body>

    <Modal.Footer>
      <Button variant="secondary" onClick={props.handleClose}>No</Button>
      <Button variant="primary" onClick={props.goToQ}>Yes</Button>
    </Modal.Footer>
  </Modal>
  )
}

export default GoToQModal;