import React, { useEffect, useContext } from "react";
import { useHistory } from 'react-router-dom';
import { Col, Row, Container } from "../Grid";
import RoomContext from '../../utils/RoomContext';
import API from '../../utils/API';
import cookies from '../../utils/cookie';

function Profile() {
  const {roomState, roomState: {userData, setUserData} } = useContext(RoomContext);
  const history = useHistory();


  useEffect(() => {
    console.log(roomState.userData);
  }, [roomState]);


  function handleLogout(e) {
    e.preventDefault();
    cookies.deleteCookie('user');
    history.push('/')

  }

  return (
    <div className="mt-5 border py-3 px-3">
      <Row>
        <Col>
          <h5>{userData.firstName}'s Info</h5>
          <div><strong>Full Name: </strong>{userData.firstName} {userData.lastName}</div>
          <div><strong>Email: </strong>{userData.email}</div>
        </Col>
      </Row>
      <Row>
        <Col>
            <button
              onClick={handleLogout}
              type="submit"
              className="btn btn-outline-danger btn-sm mt-2"
            >
            Log Out</button>
        </Col>
      </Row>
    </div>
  )
};

export default Profile;