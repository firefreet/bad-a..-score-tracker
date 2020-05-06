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
                <div><strong>This game lets you play &amp; score trivia virtually with all your friends!</strong>  Play individually or if co-quarantined with others, you can play as a team!</div>
                <div className="mt-3">
                  What You Need to Begin:
                  <ul>
                    <li>One person who has developed trivia questions to conduct the game, going forward this will be the <strong>ADMIN</strong></li>
                    <li>A group of friends who want to play trivia, going forward these will be <strong>USERS</strong></li>
                    <li>Each user and the admin will all need their own mobile phone or computer to play</li>
                    <li>Each person will navigate to <Link to='/' className='responseIoLink'>triviahost.io</Link></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='d-flex mt-3'>
              <div className='mr-2'>
                <img src='img/npc.svg' alt='Admin Directions!' style={{'height': '40px'}} />
              </div>
              <div> 
                <h4>As an ADMIN:</h4>  
                  <ul>
                    <li> Create a Trivia Game (creating a room):</li>
                      <ul>
                        <li>Click “Manage Rooms” on the right hand side of the page</li>
                        <li>First time users</li>
                          <ul>
                            <li>Select “Register” at the bottom to register as an admin</li>
                          </ul>
                        <li>Already got an account:</li>
                          <ul>
                            <li>Enter email and password &amp; “Login”</li>
                          </ul>
                        <li>Create a new roomo</li>
                        <li>Share that room code with all the <strong>USERS</strong></li>
                      </ul>
                    <li>Creating a Broadcast (current, but not limited to, trivia question)</li>
                      <ul>
                        <li>Type/Paste the current trivia in the broadcast area &amp; click “Broadcast”</li>
                        <li>Wait till all users have answered</li>
                      </ul>
                    <li>Scoring:</li>
                      <ul>
                        <li>As answers come in, check CORRECT if answer is correct, leave blank if answer is incorrect</li>
                        <li>If user made a mistake and you want to give them a second chance, click “delete” and let that user know they can reenter the answer</li>
                        <li>Note:  Delete can only be used on the current question.</li>
                      </ul>
                    <li>Moving onto Next Question</li>
                      <ul>
                        <li>Once question is complete, move to the next question</li>
                        <li>Note: Once moving onto the next question, you cannot edit priorquestion answers.</li>
                      </ul>
                    <li>Ending the Round:</li>
                      <ul>
                        <li>Once the round has ended, click “end round”</li>
                      </ul>
                    <li>Ending Game:</li>
                      <ul>
                        <li>Once the last round has ended, click “end game”</li>
                        <li>See who won!</li>
                      </ul>
                  </ul>
              </div>
            </div>
            <div className='d-flex mt-3'>
              <div className='mr-2'>
                <img src='img/support.svg' alt='User Instructions' style={{'height': '40px'}} />
              </div>
              <div> 
                <h4>As a USER:</h4>  
                  <ul>
                    <li>Joining a Trivia Game (joining a room)</li>
                      <ul>
                        <li>WAIT – The <strong>ADMIN</strong> needs to set up the room first before you canjoin!</li>
                        <li>Enter the room code that the <strong>ADMIN</strong> sends out via text, group chat, video, audio, slack or other clever means to get you a couple digit code</li>
                        <li>Enter a creative name you’d like to be called for the duration of the game</li>
                        <li>Click “Join Room”</li>
                        <li>Wait for the first broadcast – this could be the current question of trivia or any other messages from the <strong>ADMIN</strong></li>
                      </ul>
                    <li>Answering a Trivia Question:</li>
                      <ul>
                        <li>Make sure you are on the correct Round # / Question # &amp; type the answer in the box</li>
                        <li>When are you are sure you want to answer click “Submit”</li>
                        <li>It will prompt you and ask if you are sure – answer appropriately</li>
                        <li>Note: Once submitting &amp; being sure that you’d like to submit only the <strong>ADMIN</strong> has the power to give you a second chance if you messed up, so submit confidently.</li>
                      </ul>
                    <li>Game Summary:</li>
                      <ul>
                        <li>Visit game summary at any time to see scores, rankings or prior answers for yourself or opponents!</li>
                      </ul>
                  </ul>
              </div>
            </div>
            <div className='d-flex mt-3 mb-5'>
              <div className='mr-2'>
                <img src='img/teamwork.svg' alt='teamwork' style={{'height': '40px'}} />
              </div>
              <div>
                If at any time you are confused or something isn’t working, we don’t have tech support so try really hard to figure it out<br />(I know you can do it)!
              </div>
            </div> 
          </Col>
        </Row>

      </Container>
    </div>
  )

};

export default Directions;

