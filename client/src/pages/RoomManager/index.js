import React, { useEffect, useContext, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import RoomContext from '../../utils/RoomContext';
import API from '../../utils/API';
import { Col, Row, Container } from "../../components/Grid";
import Profile from '../../components/Profile';
import TopBar from '../../components/TopBar';
import { Tooltip, Overlay, Toast } from 'react-bootstrap';

//ROOM MANAGER

function RoomManager(props) {
  const { roomState: { userData, setUserData }, roomState, setRoomState } = useContext(RoomContext);
  const [showToast, setShowToast] = useState(false);
  // const tooltipTarget = useRef(null);
  const urlArr = window.location.href.split('/');
  const urlPrefix = urlArr[0] + '//' + urlArr[2] + '/rm/';

  useEffect(() => {
    console.log();
  }, []);

  function handleNewRoom(e) {
    e.preventDefault();

    API.createRoom()
      .then(res => {
        setUserData(true, res.data, roomState);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const joinRoom = async (e) => {
    const _id = e.target.getAttribute('id');
    const newRoom = await API.getRoomByCode(_id)

    localStorage.setItem('roomState', JSON.stringify({
      roomID: _id
    }));

    setRoomState({ ...roomState, roomData: newRoom.data[0] })
  }

  const toggleRoomActive = async (e) => {
    let id = e.target.id;
    let state = e.target.dataset.state === 'true' ? false : true;
    let res = await API.toggleRoomActive(state, id);
    setUserData(true, res.data, roomState);    
  }

  const copyLink = roomID => {
    setShowToast(true);
    const linkURL = urlPrefix + roomID;
    navigator.clipboard.writeText(linkURL);

    setTimeout(() => {
      setShowToast(false);
    }, 2000)
  }

  // const copiedTooltip = () => {
  //   return (
  //     <Tooltip>
  //       Link Copied
  //     </Tooltip>
  //   );
  // }

if (userData.rooms.length === 0) {
  return (
    <div>
      <TopBar />
      <Container>
        <Row>
          <Col>
            <h3>{userData.firstName}'s Rooms</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="mt-4 border px-3 py-3 text-center">
              Looks Like you Don't Have Any Open Rooms! <span role="button" className="responseIoLink" onClick={handleNewRoom}>Open Your First Room</span>
            </div>
            <div className='mt-3'>
              <button
                className="btn btn-warning btn-sm mt-3"
                onClick={handleNewRoom}
              >
                Create First Room
            </button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

if (userData.rooms.length > 0) {

  return (
    <div>
    <TopBar />
    <Container>
      <div
          aria-live="polite"
          aria-atomic="true"
          style={{
            position: 'relative',
            zIndex: 10000
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
            }}
          >
            <Toast
              autohide
              onClose={() => setShowToast(false)}
              show={showToast}
            >
              <Toast.Header>
                <img src="img/communication.svg" className="toastImg rounded mr-2" alt="" />
                <strong className="mr-3">Response.io!</strong>
                <small>just now</small>
              </Toast.Header>
              <Toast.Body>Link Copied To Clipboard!</Toast.Body>
            </Toast>
          </div>
        </div>
      <Row>
        <Col>
          <h3>{userData.firstName}'s Rooms</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className='mt-3'>
            <table className='table table-striped table-sm'>
              <thead>
                <tr>
                  <th scope='col' className="pl-3">Room #</th>
                  <th scope='col' className="text-center">Active</th>
                  <th scope='col' className="text-right pr-3">Copy / Action</th>
                </tr>
              </thead>
              <tbody>
                {userData.rooms.map((room,i) => (
                  <tr key={i}>
                    <td className="pl-3">{room.roomID}</td>
                    <td className="text-center">
                      <div className="custom-control custom-switch">
                        <input onChange={toggleRoomActive} type="checkbox" checked={room.active} data-state={room.active} className="custom-control-input" id={room._id} />
                        <label className="custom-control-label" htmlFor={room._id}></label>
                      </div>
                    </td>
                    <td className="text-right pr-3">
                      {/* copy icon */}
                      <i className="fas fa-clipboard mr-4" style={{'cursor': 'pointer'}} /* ref={tooltipTarget} */ onClick={() => copyLink(room.roomID)}></i>
                      <Link to="/adminroom" className="responseIoLink" onClick={joinRoom} id={room.roomID}>Enter</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="btn btn-warning btn-sm mt-3"
              onClick={handleNewRoom}
            >Create New Room</button>
          </div>
        </Col>
      </Row>

      {/* copied tooltip */}
      {/* <Overlay target={tooltipTarget.current} show={showTooltip} placement="top">
        {(props) => (
          <Tooltip id="copied-tooltip" {...props}>
            Link Copied
          </Tooltip>
        )}
      </Overlay> */}

      <Profile />
    </Container>
    </div>
  )
}



};

export default RoomManager;

