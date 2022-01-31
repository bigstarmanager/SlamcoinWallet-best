import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isShowing, hide }) => isShowing ? ReactDOM.createPortal(
  <React.Fragment>
    <div className="modal-overlay"/>
    <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
      <div className="modal">
        {/* <div className="modal-header">
          <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div> */}
        <div className="modal-body">
            <p>Thank you for your interest!</p>
            <p>
                PRESALE date is to be announced soon !
            </p>
            <p>
                Follow our Twitter / Telegram to be up to date: 
            </p>
            <p>
                https://t.me/slamchatnft
            </p>
            <p>
                https://twitter.com/slamchatnft
            </p>
        </div>
      </div>
    </div>
  </React.Fragment>, document.body
) : null;

export default Modal;