import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Container } from "../../components/Grid";
import TopBar from '../../components/TopBar';

//Score Summary
function GameSummaryMessage( { roomCode, message, linkTo, linkText } ) {
  
    return (
      <div>
        <TopBar />
        <Container>
          <Row>
            <Col>
              <h3>Game Summary</h3>
              {roomCode ? (<div><i className="fas fa-arrow-left"></i><Link to={linkTo} className='responseIoLink'> Room {roomCode}</Link></div>) : null}
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="mt-4 border px-3 py-3 text-center">
                {message} <Link to={linkTo} className="responseIoLink">{linkText}</Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }

export default GameSummaryMessage;
