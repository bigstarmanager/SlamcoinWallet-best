import React from 'react';
import { Modal } from 'react-bootstrap';

export default function SendConfirmModal(props) {
    return (
        <Modal show={props.isShow} onHide={props.hideModal} className={"sendConfirmModal " + (!props.isDay ? "NightModal" : "")}>
            <div className="modal_header ">

                <div className="close">
                    <i className="fas fa-times" onClick={props.hideModal}></i>
                </div>
            </div>
            <div className="modal_content">
                <div className="confirmTitle">{props.text}</div>
                <div className="confirmBtnGrup">
                    <div className="Decline" onClick={props.hideModal}>Decline</div>
                    <div className="Approve" onClick={e=>{props.sendCryptoTx(props.txMethod); props.hideModal();}}>Approve</div>
                </div>
            </div>
        </Modal>
    );
}