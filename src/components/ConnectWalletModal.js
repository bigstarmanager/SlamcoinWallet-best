import React from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'

export default function ConnectWalletModal(props) {
    const dispatch = useDispatch();
    const connectWallet = (wallet) => {
        dispatch({type: 'Connect_Wallet_Status', payload: wallet});
    }

    const connectWalletStatus = useSelector(store => store.projectSetting.connectWalletStatus);

    // const injectedWallet = useSelector(store => store.projectSetting.injectedWallet);
    // const userAddress = useSelector(store => store.projectSetting.userAddress);
    // const userBnbBalance = useSelector(store => store.projectSetting.userBnbBalance);
    // const userEthBalance = useSelector(store => store.projectSetting.userEthBalance);
    
    return (
        <div>
        {(connectWalletStatus === '' || connectWalletStatus === 'Not') &&
            <Modal show={props.isShow} onHide={props.hideModal} className={"connectModal " + (!props.isDay ? "NightModal" : "")}>
                <div className="modal_content">
                    <div className="close">
                        <i className="fas fa-times" onClick={props.hideModal}></i>
                    </div>
                    <div className="title">
                        Connect to a Wallet
                    </div>
                    <div className="connectBtn" onClick={() => {connectWallet("Metamask")}}>
                        <div className="connectWalletName">Metamask</div>
                        <img alt="" src="./image/metawallet.svg" />
                    </div>
                    <div className="connectBtn" onClick={() => {connectWallet("TrustWallet")}}>
                        <div className="connectWalletName">TrustWallet</div>
                        <img alt="" src="./image/trustwallet.svg" />
                    </div>
                    <div className="connectBtn" onClick={() => {connectWallet("WalletConnect")}}>
                        <div className="connectWalletName">WalletConnect</div>
                        <img alt="" src="./image/wallet.svg" />
                    </div>
                </div>
            </Modal>
        }
        </div>
    );
}