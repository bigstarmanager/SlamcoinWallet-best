import React from 'react';
import { useState, useEffect } from "react";
import Header from '../components/Header';
import SideBar from '../components/Sidebar';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setSetting } from '../actions/projectSetting';
function Stacking(props) {
    const [isDay, setIsDay] = useState(props.projectSetting.isDay);
    const [sideBarShow, setSideBarShow] = useState(false);
    const [showCopied, setShowCopied] = useState(false);
    const [showStakingPad, setShowStakingPad] = useState(false);
    const [tokenAmount, setTokenAmount] = useState(0);
    const [choosePool, setChoosePool] = useState("QUICK POOL");

    const onClickSideBarShow = () => {
        setSideBarShow(!sideBarShow);
    }

    const isFloat = (n) => {
        return Number(n) == n && n % 1 != 0;
    }

    const isInt = (n) => {
        return Number(n) == n && n % 1 == 0;
    }

    const onChangeTokenAmount = (e) => {
        console.log(Number(e.target.value) === e.target.value);
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || isFloat(e.target.value) || isInt(e.target.value)) {
            setTokenAmount(e.target.value)
        }
    }

    const onSetDayStatus = () => {
        let tempDay = isDay;
        setIsDay(!tempDay);
        props.setSetting(!tempDay);
    }

    const onSetShowStakingPad = () => {
        setShowStakingPad(!showStakingPad)
    }

    useEffect(() => {
        if (showCopied === true) {
            const timer = setInterval(() => {
                setShowCopied(false);
                clearInterval(timer);
            }, 5000);
        }
    }, [showCopied]);

    const onSetChoosePool = (pool) => {
        setChoosePool(pool);
    }

    return (
        <div className={!isDay ? "NightMode" : ""}>
            <Header onClickSideBarShow={onClickSideBarShow} sideBarShow={sideBarShow} onSetDayStatus={onSetDayStatus} isDay={isDay} />
            <div className="content StackingComponent">
                <SideBar page="Staking" showCopied={showCopied} setShowCopied={setShowCopied} sideBarShow={sideBarShow} isDay={isDay} onSetDayStatus={onSetDayStatus} />
                <div className="stackingContent">
                    {/* <div className="responsiveTitle">Staking</div> */}
                    <div className="main-content">
                        <div className='stackingContentBody'>
                            <div className="staking1">
                                <div className="subtitle">Staking</div>
                                <div className='subcontent'>
                                    <div className="content-detail">Choose a pool</div>
                                    <div className="chosse-pool">
                                        <button className={"button-grey-filled " + (choosePool == "QUICK POOL" ? "blue-filled" : "")} onClick={() => onSetChoosePool("QUICK POOL")}>Quick Pool</button>
                                        <button className={"button-grey-filled " + (choosePool == "MID POOL" ? "blue-filled" : "")} onClick={() => onSetChoosePool("MID POOL")}>Mid Pool</button>
                                        <button className={"button-grey-filled " + (choosePool == "DEEP POOL" ? "blue-filled" : "")} onClick={() => onSetChoosePool("DEEP POOL")}>Deep Pool</button>
                                    </div>
                                    <div className="stake-status">
                                        <p className="enabled">Stake</p>
                                        <p className="disabled"> &nbsp;-&nbsp;</p>
                                        <p className="disabled">Unstake</p>
                                    </div>
                                    <div className="button-get">
                                        <button className={"button-blue " + (showStakingPad ? "hidden-item" : "show-item")} onClick={onSetShowStakingPad}>
                                            {(() => {
                                                switch (choosePool) {
                                                    case "QUICK POOL": return "Get started!";
                                                    case "MID POOL": return "Get started!";
                                                    case "DEEP POOL": return "Approve $SLM";
                                                    default: return "Get started!";
                                                }
                                            })()}
                                        </button>
                                        {showStakingPad ? <div className="sendPad">
                                            <div className="token-amount-text">$SLM Token balance - 0</div>
                                            <div className='amount-input-body'>
                                                <input type="text" className="amount-input" value={tokenAmount} onChange={onChangeTokenAmount} />
                                                <div className='amount-max'>Max</div>
                                            </div>
                                            <div className="staking-days">Your staked tokens will be locked untill: 24/12/2022</div>
                                            <div className="send-recv-btn">
                                                <button className="button-blue-filled staking-button" > Stake </button>
                                            </div>
                                        </div> : ""}
                                    </div>
                                    <div className="stake-info">Staked & Claims</div>
                                    <div className="content1-detail">Total staked = 12,321.24 $SLM ~ $12,765.37</div>
                                    <div className="poolname">Mid pool</div>
                                    <div className="content-detail">12,321.24 $SLM ~ $12,765.37</div>
                                    <div className="poolname">Deep pool</div>
                                    <div className="content-detail">16,422.31 $SLM ~ $16,433.21</div>
                                    <div className="content1-detail">Pending rewards 25.12 $SLM ~ $5.12</div>
                                    <div className="content-detail">Daily reward = 15.23 $SLM</div>
                                    <div className="content-detail">Total harvest = 0 $SLM</div>
                                    <div className="btn-claim">
                                        <button className="button-claim">Claim pending rewards</button>
                                    </div>
                                </div>
                            </div>
                            <div className="staking2">
                                <div className="up-panel"><p className="choose-pool">{choosePool}</p></div>
                                <div className="center-panel">
                                    <div className="panel-content-text">12 months</div>
                                    <div className="panel-content-text look-up-days">
                                        {(() => {
                                            switch (choosePool) {
                                                case "QUICK POOL": return "(No Lock-up)";
                                                case "MID POOL": return "(Lock-up: 228 days)";
                                                case "DEEP POOL": return "(Lock-up:323 days)";
                                                default: return "(No Lock-up)";
                                            }
                                        })()}
                                    </div>
                                    <div className="content-detail">
                                        {(() => {
                                            switch (choosePool) {
                                                case "QUICK POOL": return "9% APR";
                                                case "MID POOL": return "12% APR";
                                                case "DEEP POOL": return "25% APR";
                                                default: return "9% APR";
                                            }
                                        })()}
                                    </div>
                                </div>
                                <div className="down-panel"><p className={"panel-content-text " + (choosePool == "DEEP POOL" ? "red-text" : "")}>
                                    {(() => {
                                        switch (choosePool) {
                                            case "QUICK POOL": return "Space Left: 37.3M";
                                            case "MID POOL": return "Space Left: 6.5M";
                                            case "DEEP POOL": return "SOLD OUT";
                                            default: return "Space Left: 37.3M";
                                        }
                                    })()}
                                </p></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
Stacking.propTypes = {
    projectSetting: PropTypes.object.isRequired,
    setSetting: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    projectSetting: state.projectSetting
});

export default connect(mapStateToProps, { setSetting })(
    Stacking
);