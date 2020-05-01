import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from '../Grid';
import './style.scss';

function TopBar({ noTitle }) {

  return (
  <div className="topBar">
    <Container>
      <Row>
        <Col>
          <Link className="home-link" to='/'>
            {noTitle ? 'Ready for some trivia?' : 'Response.io!'}
          </Link>
        </Col>
      </Row>
    </Container>
  </div>
  )
}

export default TopBar;