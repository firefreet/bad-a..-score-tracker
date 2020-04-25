import React, { useEffect } from 'react';
import { Col, Row, Container } from "../../components/Grid";
import API from '../../utils/API';

// PAGE TO DEMONSTRATE THE API AUTHENTICATED ROUTES ARE WORKING. USER DATA IS ATTACHED TO THE REQ
// ... CONFUSINGLY I RETURNED THAT REQUEST DATA FROM MY ENDPOINT FUNCTION AND CALLED IT RES.

function Test(props) {

  useEffect(() => {

    API.test().then(res => {
      console.log(res.data._doc);
    })

  }, []);

  
  return (
    <Container>
      <Col>
        <Row>
          <div>Testing Page</div>
        </Row>
      </Col>
    </Container>
  )

};

export default Test;

