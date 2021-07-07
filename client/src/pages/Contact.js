import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Container } from "../components/Grid";
import API from '../utils/API';

function Contact() {
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();

  useEffect(() => {
    console.log(firstName, lastName, email, message, responseMessage);
  }, [firstName, lastName, email, message, responseMessage]);

  function handleInput(e) {
    switch (e.target.id) {
      case 'fname':
        setfirstName(e.target.value);
        break;
      case 'lname':
        setlastName(e.target.value);
        break;
      case 'email':
        setEmail(e.target.value);
        break;
      case 'message':
        setMessage(e.target.value);
        break;
      default:
        break;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    let contactData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      message: message
    }

    API.sendContact(contactData)
      .then(res => {
        console.log(res);
        setResponseMessage(res.data[0].status);

        firstNameRef.current.value = '';
        lastNameRef.current.value = '';
        emailRef.current.value = '';
        messageRef.current.value = '';

      })
      .catch(err => {
        console.log(err.response);
      }
      );
  }

  return (
    <Container className="container mt-5">
      <Row className='row'>
        <Col className='col'>
          <form>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="firstName">First Name</label>
                <input
                  onChange={handleInput}
                  ref={firstNameRef}
                  type="text"
                  className="form-control"
                  id="fname"
                  aria-describedby="firstName"
                  placeholder="Enter First Name" />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="lastName">Last Name</label>
                <input
                  onChange={handleInput}
                  ref={lastNameRef}
                  type="text"
                  className="form-control"
                  id="lname"
                  aria-describedby="lastName"
                  placeholder="Enter Last Name" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                onChange={handleInput}
                ref={emailRef}
                type="email"
                className="form-control"
                id="email"
                aria-describedby="email"
                placeholder="Enter email" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                onChange={handleInput}
                ref={messageRef}
                className="form-control"
                id="message"
                rows="6">
              </textarea>
            </div>
            <button
              onClick={handleSubmit}
              type="submit"
              className="btn btn-secondary"
            >
              Submit</button>
          </form>
          {responseMessage === 'sent' || responseMessage === 'scheduled' ?
            <div class="alert alert-success alert-dismissible fade show mt-3" role="alert">
                <strong>Message Sent</strong> Thanks for getting in contact. I'll be back to your shortly
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
            </div> : ''}
        </Col>
      </Row>
    </Container>
  )
};

export default Contact;