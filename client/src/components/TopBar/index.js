import React from 'react';
import { Container, Row, Col } from '../Grid';
import './style.scss';

function TopBar({ noTitle }) {

  return (
  <div className="topBar">
    <Container>
      <Row>
        <Col>
          {noTitle ? 'Ready for some trivia?' : 'Response.io!'}
        </Col>
      </Row>
    </Container>
  </div>
  )
}

export default TopBar;