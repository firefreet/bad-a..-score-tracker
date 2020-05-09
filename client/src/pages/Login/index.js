import React, { useState, useEffect, useRef, useContext } from "react";
import { Link } from 'react-router-dom';
import { Col, Row, Container } from "../../components/Grid";
import RoomContext from '../../utils/RoomContext';
import API from '../../utils/API';
import cookies from '../../utils/cookie';
import TopBar from "../../components/TopBar";
import './style.css';

function Login(props) {
  const {roomState} = useContext(RoomContext);
  const { roomState: {setUserData} } = useContext(RoomContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validation, setValidation] = useState('');
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);

  const emailRef = useRef();
  const passwordRef = useRef();

  const invalidEmail = <p className="text-danger">Our lemmings can't find that email in our system.</p>
  const invalidPasswordMessage = "That password is incorrect."

  useEffect(() => {
  }, []);

  function handleInput(e) {
    setValidPassword(true);
    switch (e.target.id) {
      case 'email':
        setValidEmail(true);
        setEmail(e.target.value);
        break;
      case 'password':
        setValidPassword(true);
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
        if (typeof(res.data) === 'string') { // incorrect email or pass
          const errorMsg = res.data;
          if (errorMsg === 'Incorrect password.') {
            setValidPassword(false);
          } else { // error is 'Email address not found.'
            setValidEmail(false);
          }
        } else { // successful login
          let matchedUser = res.data.populatedUser;

          if (matchedUser) { setValidation(''); }

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
          setUserData(true, user, roomState);

          // set for later
          window.location.href = '/rooms';
        }

      })
      .catch(err => {
        console.log('ERROR INSIDE CATCH ON LOGIN PAGE');
        console.log(err.response);
        setValidation(err.response.data.error);
      });

  }

  const sendEmail = () => {
    const urlArr = window.location.href.split('/');
    const urlPrefix = urlArr[0] + '//' + urlArr[2]
    API.sendPassEmail({
      email,
      urlPrefix
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div>
      <TopBar />
      <Container>
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
                  {validEmail ? null : invalidEmail}
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
                  {validPassword ? null : (
                    <p>
                      <span className="text-danger">{invalidPasswordMessage} </span>
                      <span
                        className="pass-reset-link responseIoLink"
                        data-toggle="modal"
                        data-target="#passResetModal"
                        onClick={sendEmail}
                      >
                          Reset my password.
                      </span>
                    </p>
                  )}
              </div>
              <button
                onClick={handleSubmit}
                type="submit"
                className="btn btn-warning"
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
  
            <div className="mt-4 border px-3 py-3 text-center">
              Not a member? <Link className="responseIoLink" to="/register">Register</Link>
            </div>
          </Col>
        </Row>
      </Container>

      <div class="modal fade" id="passResetModal" tabindex="-1" role="dialog" aria-labelledby="passResetModalTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="passResetModalTitle">Email Sent</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>Please check your email. We've sent you a link that you can use to reset your Response.io password.</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-warning" data-dismiss="modal">OK</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
};

export default Login;