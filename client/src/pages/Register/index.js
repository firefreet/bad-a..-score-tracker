import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Container } from "../../components/Grid";
import API from '../../utils/API';
import cookies from '../../utils/cookie';

function Register(props) {
  const [firstName, setfirstName] = useState('');
  const [validFirstName, setValidFirstName] = useState(true);
  const [lastName, setlastName] = useState('');
  const [validLastName, setValidLastName] = useState(true);
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(true);
  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(true);
  const [validation, setValidation] = useState('');
  const [finishedForm, setFinishedForm] = useState(true);
  const [user, setUser] = useState('');

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const invalidFirstName = <p className="text-danger">First name can only contain letters.</p>
  const invalidLastName = <p className="text-danger">Last name can only contain letters.</p>
  const invalidEmail = <p className="text-danger">Please enter a valid email address.</p>
  const invalidPassword = <p className="text-danger">Passwords must be at least 8 digits long.</p>
  const incompleteForm = <p className="text-danger">Please fill out the form completely.</p>

  const invalidNameChars = ' `~!@#$%^&*()-=,./?\\|[]{}_+;\':"<>?0123456789';

  useEffect(() => {
    setFinishedForm(true);
    if (firstName)
      validateFirstName();

    if (lastName)
      validateLastName();

    if (email)
      validateEmail();

    if (password)
      validatePassword();
  }, [firstName, lastName, email, password]);

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

  const validateFirstName = () => {
    let valid = true;

    for (let i = 0; i < firstName.length; i++) {
      if (invalidNameChars.includes(firstName.charAt(i))) {
        valid = false;
        setValidFirstName(false);
      }
    }

    if (valid && !validFirstName)
      setValidFirstName(true);
  }

  const validateLastName = () => {
    let valid = true;

    for (let i = 0; i < lastName.length; i++) {
      if (invalidNameChars.includes(lastName.charAt(i))) {
        valid = false;
        setValidLastName(false);
      }
    }

    if (valid && !validLastName)
      setValidLastName(true);
  }

  const validateEmail = () => {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setValidEmail(false);
    } else {
      setValidEmail(true);
    }
  }

  const validatePassword = () => {
    if (password.length < 8) {
      setValidPassword(false);
    } else {
      setValidPassword(true);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password
      || !validFirstName || !validLastName || !validEmail || !validPassword) {
    setFinishedForm(false);
    return;
  }

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
        props.history.push('/userroom');

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
                  {!validFirstName ? invalidFirstName : null}
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
                  {!validLastName ? invalidLastName : null}
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
                {!validEmail ? invalidEmail : null}
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
                {!validPassword ? invalidPassword : null}
            </div>
            <button
              onClick={handleSubmit}
              type="submit"
              className="btn btn-warning"
            >
              Submit</button>
              {!finishedForm ? incompleteForm : null}
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