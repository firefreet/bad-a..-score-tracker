import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Container } from "../../components/Grid";
import API from '../../utils/API';
import cookies from '../../utils/cookie';
import auth from '../../utils/auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validation, setValidation] = useState('');
  const [user, setUser] = useState('');

  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {

  }, []);

  function handleInput(e) {
    switch (e.target.id) {
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

    let userData = {
      email: email,
      password: password
    }

    API.login(userData)
      .then(res => {
        setValidation('');
        setUser(res.data.user._doc);

        let userCookie = JSON.stringify(res.data.user._doc);
        cookies.setCookie('user', userCookie, 1);

        // set for later
        window.location='/userroom';

      })
      .catch(err => {
        console.log('inside catch on react function / no login for you');
        console.log(err.response);
        setValidation(err.response.data.error);
      });

  }

  return (
    <Container classes="container mt-5">
      <Row>
        <Col>
          <h3>Login</h3>
          <hr />
          <form>
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
              Login</button>
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

export default Login;