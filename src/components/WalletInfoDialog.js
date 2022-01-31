import React, { useState, useEffect } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import iconBNB from '../screen/icon_bnb_big.svg';
import iconETH from '../screen/icon_eth_big.svg';
import iconSLM from '../screen/icon_slm_big.svg';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { Button, Modal } from 'react-bootstrap';

export default function WalletInfoDialog(props) {
    const dispatch = useDispatch();

    const [showCopied, setShowCopied] = useState(false);
    const [bnbPrice, setBnbPrice] = useState(false);
    const [ethPrice, setEthPrice] = useState(false);
    const onClickCopyBtn = (text) => {
        setShowCopied(true);
    }

    useEffect(() => {
        if (showCopied === true) {
            const timer = setInterval(() => {
                setShowCopied(false);
                clearInterval(timer);
            }, 5000);
        }
    }, [showCopied]);

    useEffect(() => {
        getBNBPrice();
        getETHPrice();
    }, []);

    async function getBNBPrice(){
        await axios.get('https://api.binance.com/api/v3/avgPrice?symbol=BNBUSDT')
        .then((res) => {
          setBnbPrice(res.data.price);
          console.log(res.data.price, " ==== bnb")
        });
    }
    async function getETHPrice(){
        await axios.get('https://api.binance.com/api/v3/avgPrice?symbol=ETHUSDT').then((res) => {
          setEthPrice(res.data.price);
          console.log(res.data.price, " ==== eth")
        });
    }
    const disconnectWallet = () => {
        dispatch({type: 'Connect_Wallet_Status', payload: 'Not'});  //disconnect
    }
    
    return (
        <div className="WalletInfo-Dialog">
            <div className="walletAddress">
                {/* <div className="address">0x...a37V</div>
                    <img src={isDark ? copyIconNight : copyIcon} /> */}
                <p> {props.userAddress.substr(0,5)} ... {props.userAddress.substr(38, 41)}
                {/* <i className="far fa-clone icon_copy"></i> */}
                    <CopyToClipboard text={props.userAddress}>
                        <i className="far fa-clone icon_copy"></i>
                    </CopyToClipboard>
                </p>
            </div>
            <div className="tokenInfo">
                <img src={iconBNB} />
                <div className="balanceInfo">
                    <div className="balance-title">Balance</div>
                    <div className="balance">
                        <div className="text_white">{props.userBnbBalance} BNB</div>
                        <div>
                            ${new Intl.NumberFormat('en-US', {
                                minimumFractionDigits: 2,      
                                maximumFractionDigits: 2,
                            }).format(parseFloat(props.userBnbBalance*bnbPrice).toFixed(2))}
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="tokenInfo">
                <img src={iconSLM} />
                <div className="balanceInfo">
                    <div className="balance-title">Balance</div>
                    <div className="balance">
                        <div className="text_white">0 $SLM</div>
                        <div>$0</div>
                    </div>
                </div>
            </div> */}
            <div className="tokenInfo">
                <img src={iconETH} />
                <div className="balanceInfo">
                    <div className="balance-title">Balance</div>
                    <div className="balance">
                        <div className="text_white">{props.userEthBalance} ETH</div>
                        <div>${new Intl.NumberFormat('en-US', {
                                minimumFractionDigits: 2,      
                                maximumFractionDigits: 2,
                            }).format(parseFloat(props.userEthBalance*ethPrice).toFixed(2))}
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="myProfile">My Profile</div>
            <div className="editProfile">Edit Profile</div> */}
            <div className="Disconnect" onClick={disconnectWallet}>
                <div className="disconnect-title">Disconnect</div>
                <i className="fas fa-sign-out-alt"></i>
                {/* <img src={isDark ? logoutNight : logout} /> */}
            </div>
            <div className="terms"><a href="https://slamcoin.io/SLM_Terms&Conditions.pdf">Terms and Conditions</a></div>
            <div className="copyright">ⓒ 2021 SlamWallet. All rights reserved.</div>
        </div>
    );
}