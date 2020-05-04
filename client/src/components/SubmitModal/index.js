import React from 'react';
import '../WelcomeBackModal/style.scss';


function SubmitModal(props) {
  return (
    <div className="modal fade" id="submitModal" tabIndex="-1" role="dialog" aria-labelledby="submitModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="submitModalLabel"><img src="img/idea.svg" className="align-bottom modalInfoSvg" />Submit Response!!!</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">Are you sure?</div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-danger btn-sm" data-dismiss="modal">Cancel</button>
            <button type="button" className="btn btn-warning btn-sm" data-dismiss='modal' onClick={()=>props.submitAnswer()}>Yes</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubmitModal;
