import React, { useEffect, useState } from 'react';
import TopBar from '../../components/TopBar';
import { Col, Row, Container } from "../../components/Grid";
import API from '../../utils/API';
import { useHistory, Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

const PassReset = props => {
  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validConfirmPassword, setValidConfirmPassword] = useState(true);
  const [completeForm, setCompleteForm] = useState(true);
  const [validation, setValidation] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [finalMessage, setFinalMessage] = useState('Waiting for confirmation...')

  const invalidPassword = <p className="text-danger">Passwords must be at least 8 digits long.</p>
  const invalidConfirmPassword = <p className="text-danger">Your passwords do not match.</p>
  const incompleteForm = <p className="text-danger">Your passwords are currently invalid.</p>

  const handleChange = e => {
    setCompleteForm(true);
    const { name, value } = e.target;

    switch (name) {
      case 'password':
        setPassword(value);
        setValidPassword(value.length > 7);
        break;
      default:
        setConfirmPassword(value);
        setValidConfirmPassword(password === value);
    }
  }

  const handleSubmit = e => {
    e.preventDefault();

    if (!password || !confirmPassword || !validPassword || !validConfirmPassword) {
      setCompleteForm(false);
    } else {
        setShowModal(true);
      API.resetPass({
        _id: props.match.params._id,
        passResetCode: props.match.params.passResetCode,
        password: password
      })
        .then(response => {
          console.log(response.data);
          if (response.data === "Password updated") {
            setFinalMessage('Your password has been updated successfully!');
          } else {
            setFinalMessage('Uhoh. Something went wrong. Are you sure you copied the link from your email successfully?');
          }
        })
        .catch(err => {
          setFinalMessage('Uhoh. Something went wrong. Are you sure you copied the link from your email successfully?');
          console.log(err);
        });
    }
    
  }

  return (
    <div>
      <TopBar />
      <Container>
        <Row>
          <Col>
            <h3>Reset Your Password</h3>
            <hr />
            <form>
              <div className="form-group">
                <label htmlFor="password">New Password</label>
                <input
                  onChange={handleChange}
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  aria-describedby="password"
                  placeholder="Enter Password"
                />
                {!validPassword ? invalidPassword : null}
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Your Password</label>
                <input
                  onChange={handleChange}
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  name="confirmPassword"
                  aria-describedby="confirmPassword"
                  placeholder="Enter Password Again"
                />
                {!validConfirmPassword ? invalidConfirmPassword : null}
              </div>
              <button
                onClick={handleSubmit}
                type="submit"
                className="btn btn-warning"
              >
                Submit</button>
                {!completeForm ? incompleteForm : null}
            </form>
            {validation !== '' ?
              <div className="alert alert-danger alert-dismissible fade show mt-3" role="alert">
                  <strong>Warning: </strong> {validation}
                  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
              </div> : ''}
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Resetting Your Password...</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>{finalMessage}</p>
        </Modal.Body>

        <Modal.Footer>
          {finalMessage === 'Your password has been updated successfully!' ? (
            <Link className="btn btn-primary" to="/login">Log In</Link>
          ) : (null)}
          <button type="button" className="btn btn-warning" onClick={() => {setShowModal(false)}}>OK</button>
        </Modal.Footer>
      </Modal>
    </div>

    
  )
}

export default PassReset;