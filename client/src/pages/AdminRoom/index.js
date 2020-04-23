import React, { useRef, useEffect, useContext } from 'react';
import { Container, Row } from '../../components/Grid';
import RoomContext from '../../utils/API';
import RoomNav from '../../components/RoomNav';

function AdminRoom() {
  return (
    <div>
      <RoomNav />
      <Container>
        <Row>
          <textarea rows='6' className='mx-auto mb-2 mb-2 w-75' placeholder='...type or paste content here to BROADCAST to players ...'></textarea>
        </Row>
        <Row>
          <div className='mb-2 container-fluid d-flex w-75 p-0'>
            <button className="btn btn-success btn-sm px-0 mr-auto" style={{ width: '50px' }}>
              Save
              </button>
            <button className='btn btn-info btn-sm ml-auto mr-0' style={{ width: '50px' }}>
              Clear
              </button>
          </div>
        </Row>
        <Row>
          <div className='col-12 col-md-6 d-flex'>
            <select className='mx-auto w-50 mb-2'>
              <option>Round 1</option>
              <option>Round 2</option>
            </select>
          </div>
          <div className='col-12 col-md-6 d-flex'>
            <select className='mx-auto ml-auto mb-2 w-50'>
              <option>Question 1</option>
              <option>Question 2</option>
            </select>
          </div>
        </Row>
        <Row>
          <p className='text-center mx-auto mt-2 border w-75'>Player Responses: </p>
        </Row>
        <Row>
          <table className="table table-striped border">
            <thead>
              <tr>
                <th width="70%" scope="col">Player</th>
                <th scope="col" className='text-center'>Correct</th>
                <th scope="col" className='text-center'>Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Gorgon</td>
                <td>
                  <div className="d-flex">
                    <input type="checkbox" className="mx-auto" />
                  </div>
                </td>
                <td className='d-flex'>
                  <i className="mx-auto fas fa-minus-circle"></i>
                </td>
              </tr>
              <tr>
                <td colSpan='10'>Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam nec ex eget metus malesuada tristique. Donec quis suscipit ligula, mattis condimentum lectus. Quisque sollicitudin quis elit non viverra.</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>Cindy</td>
                <td>
                  <div className="d-flex">
                    <input type="checkbox" className="mx-auto" />
                  </div>
                </td>
                <td className='d-flex'>
                  <i className="mx-auto fas fa-minus-circle"></i>
                </td>
              </tr>
              <tr>
                <td colSpan='10'>Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam nec ex eget metus malesuada tristique. Donec quis suscipit ligula, mattis condimentum lectus. Quisque sollicitudin quis elit non viverra.</td>
              </tr>
            </tbody>

          </table>
        </Row>
        <div className='px-3'>
          <Row>
            <div className="col-12 col-md-4 mb-1 d-flex">

            </div>
            <div className="col-12 col-md-4 mb-1 d-flex">
            </div>
            <div className="col-12 col-md-4 mb-1 d-flex">
            </div>
          </Row>
        </div>
      </Container>
    </div>
  )
}

export default AdminRoom;