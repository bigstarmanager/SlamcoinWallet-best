import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const StakeComingModal = (props) => (
    <Modal show={props.isShow} id="myModal" onHide={props.hideModal} className={"defi-staking coming-soon " + (!props.isDay ? "NightModal" : "")}>
        <div className="Modal-content ">

            <div className="title">
                DeFi-Staking
            </div>
            <div className="close">
                <i className="fas fa-times" onClick={props.hideModal}></i>
            </div>
            <div className="StakeComing">
                <img src="./image/danger.png"/>
                <div>Coming Soon</div>
            </div>

            <button className="button-blue-filled button-full" onClick={props.hideModal}>Close</button>
        </div>
    </Modal>
);

export default StakeComingModal;