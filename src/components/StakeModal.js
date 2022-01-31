import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal } from 'react-bootstrap';

const StakeModal = (props) => {
    const [tokenAmount, setTokenAmount] = useState(0);
    const isFloat = (n) => {
        return Number(n) === n && n % 1 !== 0;
    }

    const isInt = (n) => {
        return Number(n) === n && n % 1 === 0;
    }

    const onChangeTokenAmount = (e) => {
        console.log(Number(e.target.value) === e.target.value) ;
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || isFloat(e.target.value) || isInt(e.target.value)) {
            setTokenAmount(e.target.value)
        }
    }
    return (
        <Modal show={props.isShow} id="myModal" onHide={props.hideModal} className={"defi-staking " + (!props.isDay ? "NightModal" : "")}>
            <div className="Modal-content ">

                <div className="title">
                    DeFi-Staking
                </div>
                <div className="close">
                    <i className="fas fa-times" onClick={props.hideModal}></i>
                </div>
                <div className="type">
                    <img src="./image/icon_bnb_big.png" alt="" />
                    <p className="type-name">
                        BNB
                    </p>
                </div>
                <div className="select-box-name">
                    Type
                </div>
                <select className="select_type">
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                </select>
                {/* <div className="select-box big">

                <div className="select-box__current" tabindex="2">

                    <div className="select-box__value">
                        <input className="select-box__input" type="radio" id="4" value="4" name="Ben1" checked="checked" />
                        <p className="select-box__input-text">Weekly</p>
                    </div>
                    <div className="select-box__value">
                        <input className="select-box__input" type="radio" id="5" value="5" name="Ben2" />
                        <p className="select-box__input-text">Monthly</p>
                    </div>
                    <div className="select-box__value">
                        <input className="select-box__input" type="radio" id="6" value="6" name="Ben3" />
                        <p className="select-box__input-text">Yearly</p>
                    </div>
                    <i className="select-box__icon fas fa-chevron-down"></i>
                </div>

                <ul className="select-box__list">
                    <li>
                        <label className="select-box__option" for="4" aria-hidden="aria-hidden">Weekly</label>
                    </li>
                    <li>
                        <label className="select-box__option" for="5" aria-hidden="aria-hidden">Monthly</label>
                    </li>
                    <li>
                        <label className="select-box__option" for="6" aria-hidden="aria-hidden">Yearly</label>
                    </li>
                </ul>
            </div> */}
                <div className="select-box-name">
                    <p>
                        Lock Account
                    </p>
                    <p>
                        Available amount 0.000000BNB
                    </p>
                </div>
                <div className="input-big">
                    <input type="text" placeholder="Please enter the amount" value={tokenAmount} onChange={onChangeTokenAmount}/>
                    <div>BNB</div>
                </div>
                <div className="select-box-name">
                    Locked Amount Limitation
                </div>
                <div className="amount-limitation">
                    <p>
                        Minimum: 0.00001 BNB
                    </p>
                    <p>
                        Maximum: 100 BNB
                    </p>
                </div>

                <div className="summary">
                    Summary
                </div>
                <div className="summary-item">
                    <p className="summary-item-title">Redemption Period</p>
                    <p className="summary-item-days">1 Days</p>
                </div>
                <div className="summary-item">
                    <p className="summary-item-title">Interest Period</p>
                    <p className="summary-item-days">1 Days</p>
                </div>
                <div className="summary-item">
                    <p className="summary-item-title">Est. APY</p>
                    <p className="summary-item-days summary-item-percent">5%</p>
                </div>

                <button className="button-blue-filled button-full" onClick={() => { props.hideModal(); props.stakeComingShow(); }}>Confirm</button>
            </div>
        </Modal>
    )
};

export default StakeModal;