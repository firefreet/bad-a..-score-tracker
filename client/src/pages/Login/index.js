import React, { useState, useEffect, useRef, useContext } from "react";
import { Col, Row, Container } from "../../components/Grid";
import RoomContext from '../../utils/RoomContext';
import API from '../../utils/API';
import cookies from '../../utils/cookie';

function Login(props) {
  const roomState = useContext(RoomContext);
  const { setUserData } = useContext(RoomContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validation, setValidation] = useState('');


  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    console.log(roomState);
  }, [roomState]);

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
        let matchedUser = res.data.user._doc;
        let userCookie = matchedUser.tokens;
        let user = {
          _id: matchedUser._id,
          tokens: matchedUser.tokens,
          rooms: matchedUser.rooms,
          firstName: matchedUser.firstName,
          lastName: matchedUser.lastName,
          email: matchedUser.email
        }
        cookies.setCookie('user', userCookie, 1);
        setUserData(user);

        // set for later
        props.history.push('/rooms');

      })
      .catch(err => {
        console.log('ERROR INSIDE CATCH ON LOGIN PAGE');
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
              <label htmlFor="email">Email address</label>
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