import React from 'react';
import { useState, useEffect } from "react";
import Header from '../components/Header';
import SideBar from '../components/Sidebar';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setSetting } from '../actions/projectSetting';
function HoldingNFT(props) {
    const [isDay, setIsDay] = useState(props.projectSetting.isDay);
    const [sideBarShow, setSideBarShow] = useState(false);
    const [showCopied, setShowCopied] = useState(false);
    const onClickSideBarShow = () => {
        setSideBarShow(!sideBarShow);
    }

    const onSetDayStatus = () => {
        let tempDay = isDay;
        setIsDay(!tempDay);
        props.setSetting(!tempDay);
    }

    useEffect(() => {
        if (showCopied === true) {
            const timer = setInterval(() => {
                setShowCopied(false);
                clearInterval(timer);
            }, 5000);
        }
    }, [showCopied]);

    return (
        <div className={!isDay ? "NightMode" : ""}>
            <Header onClickSideBarShow={onClickSideBarShow} sideBarShow={sideBarShow} onSetDayStatus={onSetDayStatus} isDay={isDay} />
            <div className="content HoldingNFTComponent">
                <SideBar page="HoldingNFT" showCopied={showCopied} setShowCopied={setShowCopied} sideBarShow={sideBarShow} isDay={isDay} onSetDayStatus={onSetDayStatus} />
                <div className="main-content">
                    <div className="title">Holding NFT</div>
                    <div className="content-panels">
                        <div className="NFT-content">
                            <img src="./image/holdingNFT/card1.png" />
                            <div className="NFT-detail">
                                <div className="NFT-title">Trippy Art</div>
                                <div className="collection">Collection “Trippy Stuff”</div>
                                <div className="price-slm">
                                    <p className="price">Price:</p>
                                    <p className="slm">0.084 $SLM</p>
                                </div>
                                <div className="widgetLine"></div>
                                <button className="button-view">View</button>

                            </div>

                        </div>
                        <div className="NFT-content">
                            <img src="./image/holdingNFT/card2.png" />
                            <div className="NFT-detail">
                                <div className="NFT-title">Gangsta Monkey</div>
                                <div className="collection">Collection “Ape Planet 2K21”</div>
                                <div className="price-slm">
                                    <p className="price">Price:</p>
                                    <p className="slm">0.084 $SLM</p>
                                </div>
                                <div className="widgetLine"></div>
                                <button className="button-view">View</button>

                            </div>

                        </div>
                        <div className="NFT-content">
                            <img src="./image/holdingNFT/card3.png" />
                            <div className="NFT-detail">
                                <div className="NFT-title">Doge</div>
                                <div className="collection">Collection “Trippy Stuff”</div>
                                <div className="price-slm">
                                    <p className="price">Price:</p>
                                    <p className="slm">0.084 $SLM</p>
                                </div>
                                <div className="widgetLine"></div>
                                <button className="button-view">View</button>

                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}
HoldingNFT.propTypes = {
    projectSetting: PropTypes.object.isRequired,
    setSetting: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    projectSetting: state.projectSetting
});

export default connect(mapStateToProps, { setSetting })(
    HoldingNFT
);