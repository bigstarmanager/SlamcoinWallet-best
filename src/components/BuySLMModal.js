import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import SendConfirmModal from './SendConfirmModal';
import { useSelector } from 'react-redux';

import { css } from "@emotion/react";
import BeatLoader from "react-spinners/BeatLoader";

export default function BuySLMModal(props) {
    const [tokenAmount, setTokenAmount] = useState(0);
    const [showConfirmSendModal, setShowConfirmSendModal] = useState(false)

    const onChangeTokenAmount = (e) => {
        setWarning(null);
        setTokenAmount(e.target.value)
    }

    const onSetShowConfirmModal = () => {
        setShowConfirmSendModal(!showConfirmSendModal)
    }

    // dev
    const override = css`
        display: block;
        margin: 0 auto;
        border-color: red;
    `;

    const [warning, setWarning] = useState(null);
    const [txInfo, setTxInfo]   = useState(null);
    const txProcessing = useSelector(store => store.projectSetting.txProcessing);

    const processTx = () => {
        let isError = false;
        if(Number(tokenAmount) < 0.009){
            isError = true;
            setWarning('Amount should be bigger than 0.01 '+props.sendToken);
        }
        else if(props.sendToken === 'ETH' && Number(tokenAmount) > props.ethBalance) {
            isError = true;
            setWarning('Amount is bigger than its balance');
        }
        else if(props.sendToken === 'BNB' && Number(tokenAmount) > props.bnbBalance) {
            isError = true;
            setWarning('Amount is bigger than its balance');
        }

        if(isError) {
            setShowConfirmSendModal(false);
            return false;
        }else {
            // setTxInfo('Transaction is processing ...');
            onSetShowConfirmModal();
        }
    }
    const sendCryptoTx = () => {
        console.log("get crypto tx")
        props.sendCryptoTx(props.sendToken, Number(tokenAmount), "swap");
    }

    const onSendTokenSelect = (crypto) => {
        setWarning(null);
        props.sendTokenChange(crypto);
    }

    return (
        <div>
            <Modal show={props.isShow} onHide={props.hideModal} className={"buyModal " + (!props.isDay ? "NightModal" : "")}>
                <div className="modal_header ">
                    <div className="title">
                        Buy $SLM Token
                    </div>
                    <div className="close">
                        <i className="fas fa-times" onClick={props.hideModal}></i>
                    </div>
                </div>
                <div className="modal_content">
                    <div className="warning mb-1">
                        <img src="./image/danger.svg" />
                        <div className="warning_text">Processing the transaction will take up to 5~10 minutes. Please wait until $SLM is adding on your balance after you make transaction.</div>
                    </div>
                    {
                        props.warningTrans && <p className="text-center text-warning">{props.warningTrans}</p>
                    }
                    {
                        warning && <p className="text-center text-warning">{warning}</p>
                    }
                    {
                        txInfo && <p className="text-center text-info">{txInfo}</p>
                    }
                    {
                        props.txSuccess && <p className="text-center text-success">Transaction is completed!</p>
                    }
                    <div className="text-center">
                        <BeatLoader color={"#36D7B7"} loading={txProcessing} css={override} size={15} />
                    </div>
                    
                    <div className="buyTokenBtn">
                        <div className={"ethBtn " + (props.sendToken == "ETH" && "active")} onClick={()=>onSendTokenSelect("ETH")}>ETH</div>
                        <div className={"bnbBtn " + (props.sendToken != "ETH" && "active")} onClick={()=>onSendTokenSelect("BNB")}>BNB</div>
                    </div>

                    <div className="wallet_info">
                        <img src="./image/empty-wallet.svg" />
                        <div className="wallet_balance cursor-pointer" onClick={() => {
                            if(props.sendToken === 'BNB')
                                setTokenAmount(props.bnbBalance)
                            else if(props.sendToken === 'ETH')
                                setTokenAmount(props.ethBalance)
                        }}>
                        {props.sendToken === 'BNB' && new Intl.NumberFormat('en-US', {
                                        minimumFractionDigits: 6,      
                                        maximumFractionDigits: 6,
                                    }).format(props.bnbBalance)+" BNB "}
                        {props.sendToken === 'ETH' && new Intl.NumberFormat('en-US', {
                            minimumFractionDigits: 6,
                            maximumFractionDigits: 6,
                        }).format(props.ethBalance)+" ETH "}
                            (max)</div>
                    </div>

                    <div className="inputBalance">
                        <input className="full-width" type="text" placeholder="Please enter the amount" value={tokenAmount} onChange={onChangeTokenAmount} />
                    </div>

                    <div className="buyBtn" onClick={() => {processTx();}}>Buy</div>
                </div>
            </Modal>
            {(!props.txSuccess || !props.warningTrans) && 
                <SendConfirmModal isShow={showConfirmSendModal} hideModal={onSetShowConfirmModal} isDay={props.isDay} sendCryptoTx = {sendCryptoTx} text={"Are you sure?"} txMethod="SWAP"/>
            }
        </div>
    );
}