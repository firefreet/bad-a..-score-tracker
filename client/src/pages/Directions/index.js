import React, { useEffect, useState, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Container } from "../../components/Grid";
import TopBar from '../../components/TopBar';

function Directions(props) {


  useEffect(() => {
  }, []);

  
  return (
    <div>
      <TopBar />
      <Container>
        <Row>
          <Col>        
            <h3 className='mb-0'>Getting Started</h3>
            <small className="font-italic ml-1">Directions and starter packs</small>
            <hr />
          </Col>
        </Row>

        <Row>
          <Col>
          <div className="d-flex mt-3">
              <div className='mr-2'>
                <img src="img/online-course.svg" alt="trivia!" style={{ 'height': '40px'}} />
              </div>
              <div>
                <h4>Directions</h4>
                <div>I'm baby keytar farm-to-table mumblecore, celiac literally kogi DIY retro coloring book ramps adaptogen. Jean shorts celiac af humblebrag hammock brooklyn. Iceland tumeric affogato hexagon bushwick whatever cliche meggings VHS hoodie selfies. Coloring book tumblr poke pinterest 3 wolf moon artisan photo booth lo-fi fanny pack put a bird on it celiac craft beer bitters chillwave austin. +1 yuccie la croix, kitsch pitchfork sriracha leggings kinfolk next level seitan migas palo santo organic bespoke.</div>
                <div><br />Dummy text? More like dummy thicc text, amirite?</div>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="d-flex mt-4">
              <div className='mr-2'>
                <img src="img/download-literature.svg" alt="trivia!" style={{ 'height': '40px'}} />
              </div>
              <div>
                <h4>Starter Packs</h4>
                <div><a target="_new" className="responseIoLink" href='https://docs.google.com/presentation/d/1s2lOYp3vIVTLQJCxQHFFdfzUTs57JicezAJFxjdP8eY/edit?usp=sharing'>Trivia Pack 1</a></div>
                <div><a target="_new" className="responseIoLink" href='https://docs.google.com/presentation/d/1s2lOYp3vIVTLQJCxQHFFdfzUTs57JicezAJFxjdP8eY/edit?usp=sharing'>Trivia Pack 2</a></div>
                <div><a target="_new" className="responseIoLink" href='https://docs.google.com/presentation/d/1s2lOYp3vIVTLQJCxQHFFdfzUTs57JicezAJFxjdP8eY/edit?usp=sharing'>Trivia Pack 3</a></div>
              </div>
            </div>
          </Col>
        </Row>



      </Container>
    </div>
  )

};

export default Directions;

