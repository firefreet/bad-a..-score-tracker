import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Container } from "../../components/Grid";
import API from '../../utils/API';
import cookies from '../../utils/cookie';

function Register() {
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validation, setValidation] = useState('');
  const [user, setUser] = useState('');

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    console.log(user);

  }, [user]);

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
      case 'password':
        setPassword(e.target.value);
        break;
      default:
        break;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    let userRegData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    }

    API.register(userRegData)
      .then(res => {
        setValidation('');
        setUser(res.data.user._doc);

        let userCookie = res.data.user._doc.tokens;
        cookies.setCookie('user', userCookie, 1);

        // set for later
        // window.location='/userroom';

      })
      .catch(err => {
        console.log('inside catch on react function');
        console.log(err.response);
        setValidation(err.response.data.error);
      });

  }

  return (
    <Container classes="container mt-5">
      <Row>
        <Col>
          <h3>Register</h3>
          <hr />
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
                placeholder="Enter Email" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                onChange={handleInput}
                ref={passwordRef}
                type="password"
                className="form-control"
                id="password"
                aria-describedby="password"
                placeholder="Enter Password" />
            </div>
            <button
              onClick={handleSubmit}
              type="submit"
              className="btn btn-secondary"
            >
              Submit</button>
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
  )
};

export default Register;