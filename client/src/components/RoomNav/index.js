import React from 'react';

function RoomNav(props) {
  return (
    <div>
      <nav className=" w navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Room: {props.room} [Current Round: {props.round} - Question: {props.question}]</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav w-100 d-flex justify-content-around">
            <li className="nav-item active">
              <button className='mx-auto mb-2' style={{ width: '150px' }}>
                New Round
          </button>
            </li>
            {/* New Q & Round buttons to be hidden if not Admin */}
            <li className='nav-item active'>
              <button className='mx-auto mb-2' style={{ width: '150px' }}>
                New Question
          </button>
            </li>
            <li className="nav-item">

              <button className="mx-auto px-0 mb-2" style={{ width: '150px' }} onClick={() => { document.location.replace('/gamesummary') }}>
                Score Board
          </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default RoomNav;