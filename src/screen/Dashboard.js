import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { validate, res } from 'react-email-validator'
import { useHistory, useParams } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Header from '../components/Header'
import StakeModal from '../components/StakeModal'
import HistoryChart from '../components/historyChart'
import QRCode from '../components/QRcode'
import TransactionItem from '../components/transactionItem'
import BuySLMModal from '../components/BuySLMModal'
import ConnectWalletModal from "../components/ConnectWalletModal"

import SideBar from '../components/Sidebar'
import StakeComingModal from '../components/StakeComingModal'
import SendConfirmModal from '../components/SendConfirmModal'
import { connect, useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { setSetting } from '../actions/projectSetting'

// dev
import Web3 from 'web3'
import Web3Modal from "web3modal";
import setAuthToken from '../utils/setAuthToken';
import { ethers } from "ethers";
import {setUserBnbBalance, setUserEthBalance, setInjectedWallet, setTxProcessing} from '../actions/projectSetting';
import WalletConnectProvider from "@walletconnect/web3-provider";
import detectEthereumProvider from '@metamask/detect-provider'
import { css } from "@emotion/react";
import BeatLoader from "react-spinners/BeatLoader";
import ProgressBar from 'react-bootstrap/ProgressBar'

import bnb from './icon_bnb_big.svg';
import eth from './icon_eth_big.svg';
import slm from './icon_slm_big.svg';

function Dashboard(props) {
    const [isDay, setIsDay] = useState(props.projectSetting.isDay)
    const [modalShow, setModalShow] = useState(false)
    const [stakeComingShow, setStakeComingShow] = useState(false)
    const [qrShow, setQrShow] = useState(false)
    const [buyslmModalShow, setBuySLMModalShow] = useState(false)
    const [buyCoinFlg, setBuyCoinFlg] = useState(false)
    const [buyCoinBNB, setBuyCoinBNB] = useState(true)
    const [showCopied, setShowCopied] = useState(false)
    const [sideBarShow, setSideBarShow] = useState(false)
    const [showSendPad, setShowSendPad] = useState(false)
    const [showReceivePad, setShowReceivePad] = useState(false)
    const [showConfirmSendDialog, setShowConfirmSendDialog] = useState(false)
    const [showConfirmSendModal, setShowConfirmSendModal] = useState(false)

    const [showConnectModal, setShowConnectModal] = useState(false);
    const [sendToken, setSendToken] = useState("BNB")

    const [tokenAmount, setTokenAmount] = useState(0);
    const [walletAmount, setWalletAmount] = useState(0);
    const [walletAddress, setWalletAddress] = useState('');
    const isFloat = (n) => {
        return Number(n) == n && n % 1 != 0;
    }

    const isInt = (n) => {
        return Number(n) == n && n % 1 == 0;
    }

    const onChangeTokenAmount = (e) => {
        setOutWarning('');
        setOutSuccess('');
        console.log(Number(e.target.value) === e.target.value) ;
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || isFloat(e.target.value) || isInt(e.target.value)) {
            setTokenAmount(e.target.value)
        }
    }
    const onChangeWalletAmount = (e) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || isFloat(e.target.value) || isInt(e.target.value)) {
            setWalletAmount(e.target.value)
        }
    }

    const onChangeWalletAddress = (e) => {
        setOutWarning('');
        setOutSuccess('');
        console.log(Number(e.target.value) === e.target.value) ;
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || isFloat(e.target.value) || isInt(e.target.value)) {
            setWalletAddress(e.target.value)
        }
    }

    const onClickbuyCoin = () => {
        setBuyCoinFlg(!buyCoinFlg)
    }

    const onClickbuyCoinBNB = () => {
        setBuyCoinBNB(true)
        setBuyCoinFlg(false)
    }

    const onClickbuyCoinETH = () => {
        setBuyCoinBNB(false)
        setBuyCoinFlg(false)
    }

    const onClickStake = () => {
        setModalShow(true)
    }

    const onClickStakeComing = () => {
        setStakeComingShow(true)
    }

    const onClickBuySLM = () => {
        setBuySLMModalShow(true)
    }

    const onClickConfirm = () => {
        setModalShow(false)
    }

    const onClickConfirmComing = () => {
        setStakeComingShow(false)
    }

    const onClickBuy = () => {
        setBuySLMModalShow(false)
    }

    const handleQrShow = () => {
        setQrShow(true)
    }

    const changeQrCode = () => {
        setQrShow(false)
    }

    const clickBalanceItem = () => {
        //alert()
    }

    // const onClickCopyBtn = (text) => {
    //     setShowCopied(true)
    // }

    const onClickSideBarShow = () => {
        setSideBarShow(!sideBarShow)
    }

    const onSetDayStatus = () => {
        let tempDay = isDay
        setIsDay(!tempDay)
        props.setSetting(!tempDay)
    }

    const onSetShowSendPad = () => {
        setShowSendPad(!showSendPad)
        setShowReceivePad(false)
    }

    const onSetShowReceivePad = () => {
        setShowReceivePad(!showReceivePad)
        setShowSendPad(false)
    }

    const onSetShowConfirmDialog = () => {
        setShowConfirmSendDialog(!showConfirmSendDialog)
    }

    const onSetShowConfirmModal = () => {
        setShowConfirmSendModal(!showConfirmSendModal)
    }

    const onSetSendToken = (token) => {
        setSendToken(token);
    }
    const onSetShowConnectModal = () => {
        setShowConnectModal(!showConnectModal);
    }

    //dev
    const override = css`
        display: block;
        margin: 0 auto;
        border-color: red;
    `;

    const providerOptions = {
        // injected: {
        //     display: {
        //       logo: "data:image/gif;base64,INSERT_BASE64_STRING",
        //       name: "Injected",
        //       description: "Connect with the provider in your Browser"
        //     },
        //     package: null
        // },
        walletconnect: {
          package: WalletConnectProvider, // required
          options: {
            infuraId: process.env.REACT_APP_INFURA_ID // required
          }
        },
        metamask:{
            package: detectEthereumProvider, // required
            options: {
              infuraId: process.env.REACT_APP_INFURA_ID // required
            }
        }
    };
    const web3Modal = new Web3Modal({
        network: "mainnet", // optional
        cacheProvider: true, // optional
        disableInjectedProvider: true, // optional. For MetaMask / Brave / Opera.
        providerOptions // required
    });
      
    const userAddress = useSelector(store => store.projectSetting.userAddress);
    const dispatch = useDispatch();

    const sendTokenChange = (crypto) => {
        setSendToken(crypto);
        setWarningTrans();
        setOutWarning();
    }

    const onClickCopyBtn = (text) => {
        addressCopy(text)
        setShowCopied(true);
    }

    const addressCopy = (address) => {
        const el = document.createElement('textarea');
        el.value = address;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }

    // functional token sec
    const web3 = new Web3(process.env.REACT_APP_ETH);
    const web3_bnb = new Web3(process.env.REACT_APP_BSC);

    const [guid, setGuid] = useState('');
    const [adminWallet, setAdminWallet] = useState('');
    const [id, setId] = useState(0);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [transaction, setTransaction] = useState([]);
    const [slamBalance, setSlamBalance] = useState(0);
    // functional data sec
    const [soldAmount, setSoldAmount] = useState(0);
    const [presaleTokenNumber, setPresaleTokenNumber] = useState(0);
    const [tokenPrice, setTokenPrice] = useState(0);
    const [maximumExchange, setMaximumExchange] = useState(0);
    const [minimumExchange, setMinimumExchange] = useState(0);
    const [currentSoldAmount, setCurrentSoldAmount] = useState(0);

    const [ethBalance, setEthBalance] = useState(0);  
    const [bnbBalance, setBnbBalance] = useState(0);
    
    const [bnbPrice, setBnbPrice] = useState(0);
    const [ethPrice, setEthPrice] = useState(0);
    const [address, setAddress] = useState('');

    const [soldTokenNumber, updateSoldTokenNumber] = useState(0);

    const [providerError, setProviderError] = useState(false);
    const [providerErrorDialog, setProviderErrorDialog] = useState(false);
    
    const [buyConfirmModal, setBuyConfirmModal] = useState(false)

    const token   = localStorage.getItem('slamtoken');
    const isLogin = localStorage.getItem('isLogin');

    const [bnbprocessing, setBnbprocessing] = useState('');
    const [ethprocessing, setEthprocessing] = useState('');
    
    const [metaConnection, setMetaConnection] = useState(false);

    const [warningTrans, setWarningTrans] = useState("");
    const [txSuccess, setTxSuccess] = useState(false);
    const [outProcessing, setOutProcessing] = useState(false);

    const [provider, setProvider] = useState(false);

    const warningTransChange = (msg) => {
        setWarningTrans(msg);
    }
    const tokenData = async(token) => {
        await axios.post(process.env.REACT_APP_SLAMBACKEND+'api/token', {token:token})
        .then(res=>{
            if(res.data.status === "success"){
                const address = res.data.address;
                getBNBBalance(address);
                getETHBalance(address);
                setAddress(address);
                localStorage.setItem("address", address)
                dispatch({type: 'User_Address', payload: address})

                setGuid(res.data.guid);
                setAdminWallet(res.data.admin);
                setTransaction(res.data.trans);
                setSlamBalance(res.data.slam);
                setId(res.data.id);
                setEmail(res.data.email);
                setPhone(res.data.phone);
            }else{
                setAuthToken();
                localStorage.setItem('isLogin', '');
                window.location.href = '/login';
            }
        })
        .catch(error=>{
            setAuthToken();
            localStorage.setItem('isLogin', '');
            window.location.href = '/login';
        });
    }

    const manageData = async () => {
        const res = await axios.get(process.env.REACT_APP_SLAMBACKEND+'api/manages', {token:token});
        setSoldAmount(res.data.soldAmount);
        setPresaleTokenNumber(res.data.presaleTokenNumber);
        setTokenPrice(res.data.tokenPrice);
        
        setMaximumExchange(res.data.maximumExchange);
        setMinimumExchange(res.data.minimumExchange);
        updateSoldTokenNumber(res.data.currentSoldAmount);
    }

    const getCurSoldAmount = async() => {
        let amount = await axios.post(process.env.REACT_APP_SLAMBACKEND+'api/currentSoldTokenAmount')
        .then(
            res=>{
                // setSoldTokenNumber(res.data.currentSoldAmount);
                return res.data.currentSoldAmount;
            }
        );
        return amount;
    }

    async function getBNBBalance(address){
        await axios.get('https://api.binance.com/api/v3/avgPrice?symbol=BNBUSDT')
        .then((res) => {
          setBnbPrice(res.data.price);
        });

        await web3_bnb.eth.getBalance(address, function(error, wei) {
            if(!error) {
                setBnbBalance(parseFloat(web3_bnb.utils.fromWei(wei, 'ether')).toFixed(6));
                dispatch(setUserBnbBalance(parseFloat(web3_bnb.utils.fromWei(wei, 'ether')).toFixed(6)))
            }else {
                console.log(error, "bnb getBalance get error");
                setProviderError(true)
                setProviderErrorDialog(true);
            }
        });
    }

    async function getETHBalance(address){
        await axios.get('https://api.binance.com/api/v3/avgPrice?symbol=ETHUSDT').then((res) => {
          setEthPrice(res.data.price);
        });

        await web3.eth.getBalance(address, function(error, wei) {
            if(!error) {
                setEthBalance(parseFloat(web3.utils.fromWei(wei, 'ether')).toFixed(6));
                dispatch(setUserEthBalance(parseFloat(web3.utils.fromWei(wei, 'ether')).toFixed(6)));
            }else {
                console.log(error, "eth getBalance get error");
                setProviderError(true);
                setProviderErrorDialog(true);
            }
        });
    }
        
    async function getBNBBalanceBE(address) {
        // handleBalanceBtnClicked('bnb_proc');
        await axios.post(process.env.REACT_APP_SLAMBACKEND+'api/getBnbBalance/'+address).then((res) => {
            setBnbBalance(parseFloat(res.data).toFixed(6));
            dispatch(setUserBnbBalance(parseFloat(res.data).toFixed(6)))
        });
        // handleBalanceBtnClicked('bnb_comp');
    }

    async function getETHBalanceBE(address) {
        // handleBalanceBtnClicked('eth_proc');
        await axios.post(process.env.REACT_APP_SLAMBACKEND+'api/getEthBalance/'+address).then((res) => {
            setEthBalance(parseFloat(res.data).toFixed(6));
            dispatch(setUserEthBalance(parseFloat(res.data).toFixed(6)))
        });
        // handleBalanceBtnClicked('eth_comp');
    }

    // let metamaskBnb = new ethers.providers.Web3Provider(window.ethereum, 56);
    useEffect(() => {
        tokenData(token);
        manageData();
        // getChartData('daily');
        const interval = setInterval(async() => {
            let newValue = await getCurSoldAmount();
            updateSoldTokenNumber((oldValue) => {
                return newValue;
            });
            // updateSoldTokenNumber(10000);
        }, 4500);
    }, []);

    useEffect(async()=>{
        if(showCopied == true) {
            const timer = setInterval(() => {
                setShowCopied(false);
                clearInterval(timer);
            }, 5000);
        }
    }, [showCopied]);
    
    const connectWalletStatus = useSelector(store => store.projectSetting.connectWalletStatus); //identify metamask or wallet connect
    
    useEffect(async() => {
        try {
            connectWallet(true, connectWalletStatus);
        }catch(error) {
            console.log(error, "provider error!");
            return null;
        }
    },[connectWalletStatus]);

    async function getMetamaskWallet(provider) {
        // Prompt user for account connections
        await provider.send("eth_requestAccounts", []);
        let address = await provider.getSigner().getAddress();

        if(address) {
            setAddress(address);
            dispatch({type: 'User_Address', payload: address});  //disconnect
            setMetaConnection(true);
            await getBNBBalanceBE(address);
            await getETHBalanceBE(address);
            await dispatch(setInjectedWallet(true));
        }
    }

    const connectWallet = async(status, connectWalletStatus) => {
        // status - trur if connecting wallet, false if disconnect walet
        // connectWalletStatus - metamask, wallet connect ...........
        let walletProvider;
        if (typeof window.ethereum !== 'undefined') {
            if(connectWalletStatus === "WalletConnect") {
                walletProvider = await web3Modal.connectTo("walletconnect");
                setProvider(walletProvider);
                getMetamaskWallet(walletProvider);
            }
            else if(connectWalletStatus === "Metamask" || connectWalletStatus === "TrustWallet") {
                walletProvider = new ethers.providers.Web3Provider(window.ethereum || process.env.REACT_APP_BSC);
                setProvider(walletProvider);
                getMetamaskWallet(walletProvider);
            }
            else if(connectWalletStatus === "Not") {
                dispatch(setInjectedWallet(false));
                await web3Modal.clearCachedProvider();
                let address = localStorage.getItem('address');
                resetConnection(address);
                console.log("wallet disconnected")
            }
            else {      // in case of disconnect
                dispatch(setInjectedWallet(false));
                let address = localStorage.getItem('address');
                resetConnection(address);
                setMetaConnection(false);
            }
        }
        else {
            window.open("https://metamask.app.link/dapp/slamwallet.floki-coin.io", "_blank");
        }

    }
    const resetConnection = async(address) => {
        dispatch({type: 'User_Address', payload: address});  //disconnect
        setAddress(address);
        getBNBBalanceBE(address);
        getETHBalanceBE(address);
    }
    const [chartData, setChartData] = useState([]);
    const getChartData = async(interval) => {
        await axios.post(process.env.REACT_APP_SLAMBACKEND+'api/slamHistory/'+interval, {token:token}).
        then((res) => {
            setChartData(res.data)
        }).
        catch((error) => {
            console.log(error, "chart data error")
        })
        
    }
    // https://backend.slamcoin.io
    const sendCryptoTx = async(tokenType, amount, txType, receiver) => {
        setShowConfirmSendDialog();
        let cryptoPrice = tokenType == 'ETH' ? ethPrice : bnbPrice
        if(amount  < 0)
            return false;
        if(tokenType === "BNB") {
            setBnbprocessing('Processing');
        }else {
            setEthprocessing('Processing');
        }
        let reciptance = txType === 'SWAP' ? adminWallet : receiver;
        console.log(metaConnection, "metaConnection"+tokenType, reciptance, "txType", txType, "provider", provider)

        if(metaConnection) {
            if(txType === 'SWAP') {
                dispatch(setTxProcessing(true));
                let gasAmount = tokenType == 'BNB' ? 0.0015 : 0.0042;
                let sendAmount = ethers.utils.parseEther((amount - gasAmount).toString());
                const transaction = {
                    'to': adminWallet, // faucet address to return eth
                    'value': sendAmount, // 1 ETH
                    'gasPrice': tokenType == 'BNB' ? ethers.utils.hexlify(50000000000) : ethers.utils.hexlify(140000000000),
                    'gasLimit': tokenType == 'BNB' ? ethers.utils.hexlify(27000) : ethers.utils.hexlify(28000)
                };
                const signer = await provider.getSigner();
                let txSuccess = false;
                const signedTx = await signer.sendTransaction(transaction)
                .then(async(result) => {
                    const txResult = await result.wait();
                    // send meta tx result to backend and record
                    if(txResult.status == 1 && txResult.to == adminWallet) {
                        axios.post(process.env.REACT_APP_SLAMBACKEND+'api/cryptoTx', {token:token, user_id:id, address: txResult.from, 
                            amount: Number(amount), selectCrypto:tokenType, reciptance: txResult.to, tokenPrice: tokenPrice,
                            transactionHash: txResult.transactionHash, cryptoPrice : tokenType == 'ETH' ? ethPrice : bnbPrice, txType:txType})
                        .then(res=>{
                            if(res.data.status === 'success'){
                                if(tokenType == 'BNB') {
                                    setBnbprocessing('Completed');
                                    getBNBBalanceBE(address);
                                }
                                else {
                                    setEthprocessing('Completed');
                                    getETHBalanceBE(address);
                                }

                                setTxSuccess(true);
                                setWarningTrans("");
                            }else {
                                setTxSuccess(false);
                                setWarningTrans("There was something wrong!");
                            }
                        })
                        .catch(error => {
                            console.log(error, "meta tx error");
                        })
                    } else {
                        setEthprocessing('');
                        setBnbprocessing('');
                        setWarningTrans("There was something wrong!");
                    }
                })
                .catch((error) => {
                    // Error returned when rejected
                    setEthprocessing('');
                    setBnbprocessing('');
                });
                
                dispatch(setTxProcessing(false));
            }
        }
        else {
            txType == 'SWAP' ? 
            dispatch(setTxProcessing(true))
            :
            setOutProcessing(true);
            // http://3.122.149.23:8080
            const txHandle = await axios.post('http://3.122.149.23:8080/api/cryptoTx', {userId:id, address: address, 
            amount:Number(amount), selectCrypto:tokenType, reciptance: reciptance, guid:guid, tokenPrice: tokenPrice, 
            cryptoPrice : tokenType == 'ETH' ? ethPrice : bnbPrice, txType:txType }).then(res => 
                {
                    if(res.data.status === 'success') {
                        let sentAmount = res.data.sentAmount;
                        let slam_amount = res.data.slam_amount;
                        
                        setSlamBalance(Number(slamBalance)+Number(res.data.slam_amount));
                        if(tokenType == "BNB") {
                            setBnbBalance(parseFloat(Number(bnbBalance)-Number(sentAmount)).toFixed(6));
                            setBnbprocessing('Completed');
                        }
                        else {
                            setEthBalance(parseFloat(Number(ethBalance)-Number(sentAmount)).toFixed(6));
                            setEthprocessing('Completed');
                        }

                        axios.post(process.env.REACT_APP_SLAMBACKEND+'api/bnb_slam', {userId:id, address: address, amount:Number(res.data.sentAmount), token:token, receiver:receiver, slam_amount:slam_amount, tokenPrice: tokenPrice, cryptoPrice:cryptoPrice, txType:txType });

                        if(txType == 'SWAP') {
                            setWarningTrans('');
                            setTxSuccess(true);
                        }
                        else if(txType == 'OUT') {
                            setOutWarning('')
                            setOutSuccess(true)
                        }
                    }else {
                        if(txType == 'SWAP') {
                            setWarningTrans('There was something wrong!');
                            setTxSuccess(false);
                        }
                        else if(txType == 'OUT') {
                            setOutWarning('There was something wrong!');
                            setOutSuccess(false);
                        }                                     
                        setBnbprocessing('');
                        setEthprocessing('');
                    }
                }
            );

            txType == 'SWAP' ? 
            dispatch(setTxProcessing(false))
            :
            setOutProcessing(false);
        }
    }

    const [outWarning, setOutWarning] = useState();
    const [outSuccess, setOutSuccess] = useState();
    const onOutValidate = async(device) => {
        let isError = false;
        if(Number(tokenAmount) < 0.009){
            isError = true;
            setOutWarning('Amount should be bigger than 0.01 '+sendToken);
        }
        else if(sendToken === 'ETH' && Number(tokenAmount) > ethBalance) {
            isError = true;
            setOutWarning('Amount is bigger than its balance');
        }
        else if(sendToken === 'BNB' && Number(tokenAmount) > bnbBalance) {
            isError = true;
            setOutWarning('Amount is bigger than its balance');
        }
            
        if(isError) {
            return false;
        }else {
            if(walletAddress.length !== 42) {
                setOutWarning('Invalid Address');
                return false;
            }
            else
                setShowConfirmSendDialog(device)
        }
    }
    return (
        <div className={!isDay ? "NightMode" : "DayMode"}>
            <Header onClickSideBarShow={onClickSideBarShow} sideBarShow={sideBarShow} onSetDayStatus={onSetDayStatus} isDay={isDay} />
            <div className="content dashboardComponent">
                <SideBar 
                    page="Dashboard" showCopied={showCopied} sideBarShow={sideBarShow} 
                    isDay={isDay} onSetDayStatus={onSetDayStatus} 
                    userId={id} 
                    userEmail={email} 
                    userPhone={phone}
                    metaConnection={metaConnection}
                    connectWallet = {connectWallet}
                />
                <div className="main-content ">
                    <div className="automargin_content">
                        <div className="panel_left">
                            <div className="myWallet">
                                <p className="title">My Wallet</p>
                                <div className="panels">
                                    <div className="panel-balance">
                                        <p className="panel-title">Your Balance</p>
                                        <p className="panel-description">Here you can check your balance in USD. Here you can check your
                                            balance in
                                            USD.</p>
                                        <div className="panel-actions panel-left">
                                            <div className="panel-values">
                                                <p className="panel-value">
                                                ${new Intl.NumberFormat('en-US', {
                                                    minimumFractionDigits: 2,      
                                                    maximumFractionDigits: 2,
                                                }).format(slamBalance*tokenPrice)} 
                                                </p>
                                                <p className="panel-value-small">+12.5%</p>
                                            </div>
                                            <button className="button panel-action" onClick={onClickBuySLM}>Top Up</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="wallet-balance">
                                <p className="title">System Wallet Balance</p>
                                <div className="balance-items">
                                    <div className={"balance-item " + (sendToken == "SLM" ? "highlighted" : "")} onClick={() => onSetSendToken("SLM")}>
                                        <img src={slm} alt="" />
                                        <div className="balance-values">
                                            <div className="text">
                                                <p className="symbol">$SLM</p>
                                                <p className="amount">0</p>
                                            </div>
                                            <div className="details">
                                                <p className="symbol">Slamcoin</p>
                                                <p className="amount">$0.00</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"balance-item " + (sendToken == "BNB" ? "highlighted" : "")} onClick={() => onSetSendToken("BNB")}>
                                        <img src={bnb} alt="" />
                                        <div className="balance-values">
                                            <div className="text">
                                                <p className="symbol">BNB</p>
                                                <p className="amount">
                                                {new Intl.NumberFormat('en-US', {
                                                    minimumFractionDigits: 4,      
                                                    maximumFractionDigits: 4,
                                                }).format(bnbBalance)} 
                                                </p>
                                            </div>
                                            <div className="details">
                                                <p className="symbol">BNB (BEP-20)</p>
                                                <p className="amount">${new Intl.NumberFormat('en-US', {
                                                    minimumFractionDigits: 2,      
                                                    maximumFractionDigits: 2,
                                                }).format(parseFloat(bnbBalance*bnbPrice).toFixed(2))}</p>
                                                <div className="text-left">
                                                    {bnbprocessing !== 'Completed' && 
                                                    <i className="sync alternate icon" onClick={e => {getBNBBalanceBE(address)}} />
                                                    }
                                                    <span className={bnbprocessing+' balanceCheck'}>{bnbprocessing}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"balance-item " + (sendToken == "ETH" ? "highlighted" : "")} onClick={() => onSetSendToken("ETH")}>
                                        <img src={eth} alt="" />
                                        <div className="balance-values">
                                            <div className="text">
                                                <p className="symbol">ETH</p>
                                                <p className="amount">
                                                {new Intl.NumberFormat('en-US', {
                                                    minimumFractionDigits: 4,      
                                                    maximumFractionDigits: 4,
                                                }).format(ethBalance)} </p>
                                            </div>
                                            <div className="details">
                                                <p className="symbol">Ethereum (ERC-20)</p>
                                                <p className="amount">
                                                ${new Intl.NumberFormat('en-US', {
                                                    minimumFractionDigits: 2,      
                                                    maximumFractionDigits: 2,
                                                }).format(ethBalance*ethPrice)}</p>
                                                <div className="text-left">
                                                    {ethprocessing !== 'Completed' && 
                                                    <i className="sync alternate icon" onClick={e => {getETHBalanceBE(address)}} />
                                                    }
                                                    <span className={ethprocessing+' balanceCheck'}>{ethprocessing}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="panel-buy">
                                <div className={"dropdown_selection " + (!(showSendPad || showReceivePad) ? "noSelect" : "")}>
                                    <p className="panel-title-small">Buy</p>
                                    <div className="dropdown">
                                        <img src={"./image/icon_" + sendToken + ".png"} alt="coin Icon" className="dropdown-icon" />
                                        <p className="dropdown-value">{sendToken}</p>
                                        <div className="bnbDetail">
                                            {sendToken} {sendToken == 'BNB' && "(BEP-20) $"+new Intl.NumberFormat('en-US', {
                                                minimumFractionDigits: 2,      
                                                maximumFractionDigits: 2,
                                            }).format(parseFloat(bnbBalance*bnbPrice).toFixed(2))}
                                            {sendToken == 'ETH' && "(ERC-20) $"+new Intl.NumberFormat('en-US', {
                                                minimumFractionDigits: 2,      
                                                maximumFractionDigits: 2,
                                            }).format(parseFloat(ethBalance*ethPrice).toFixed(2))}
                                        </div>
                                    </div>
                                    <div className="send-recv-btn">
                                        <button className="button-blue" onClick={onSetShowSendPad}> Send </button>
                                        <button className="button-blue-filled right" onClick={onSetShowReceivePad}> Recieve </button>
                                    </div>
                                </div>
                                <div className={"dropdown-panel " + (!buyCoinFlg ? "hidden" : "")}>
                                    <div className="dropdown_bnb" onClick={onClickbuyCoinBNB}>
                                        <img src="./image/icon_BNB.png" alt="bnb Icon" className="dropdown-icon" />
                                        <p className="dropdown-value">BNB</p>
                                    </div>
                                    <div className="dropdown_eth" onClick={onClickbuyCoinETH}>
                                        <img src="./image/icon_eth_big.png" alt="eth Icon" className="dropdown-icon" />
                                        <p className="dropdown-value">ETH</p>
                                    </div>
                                </div>
                                {showReceivePad ? <div className="qrpad">
                                    <img src="./image/qr_small.png" onClick={handleQrShow} />
                                    <div className="walletAddress">
                                        <div className="title">Address</div>
                                        <div className="address">{address.substr(0, 21)}...</div>
                                        <CopyToClipboard text={address}>
                                            <img src="../image/icon_copy.svg" alt="" className="icon_copy" onClick={() => onClickCopyBtn(address)} />
                                        </CopyToClipboard>
                                    </div>
                                    {
                                        qrShow ?
                                            <QRCode address={address} changeQrCode={changeQrCode} onClickCopyBtn={onClickCopyBtn} /> : <></>
                                    }
                                </div>
                                    : ""}
                                {showSendPad ? <div className="sendPad">
                                    <div className="amount">Amount</div>
                                    <input type="text" className="amountText" value={tokenAmount} onChange={onChangeTokenAmount}/>
                                    <div className="amountMax cursor-pointer" onClick={() => {
                                        if(sendToken == 'BNB')
                                            setTokenAmount(bnbBalance)
                                        else if(sendToken == 'ETH')
                                            setTokenAmount(ethBalance)
                                    }}>
                                    {sendToken == 'BNB' && new Intl.NumberFormat('en-US', {
                                                    minimumFractionDigits: 6,      
                                                    maximumFractionDigits: 6,
                                                }).format(bnbBalance)+" BNB "}
                                    {sendToken == 'ETH' && new Intl.NumberFormat('en-US', {
                                        minimumFractionDigits: 6,      
                                        maximumFractionDigits: 6,
                                    }).format(ethBalance)+" ETH "}
                                     (max)</div>
                                    <div className="wallet">Wallet Address</div>
                                    <input type="text" className="walletText" value={walletAddress} onChange={onChangeWalletAddress}/>
                                    <div className="networkFee">(Network fee will be included)</div>
                                    <div className="send-recv-btn">
                                        <button className="button-blue btn_close" onClick={onSetShowSendPad}> Close </button>
                                        <button className="button-blue-filled right btn_send" onClick={e => onOutValidate('mobile')}> Send </button>
                                        {(showConfirmSendDialog == 'mobile') && <div className="sendConfirmPadMobile">
                                            <div className="confirmTitle">Do you want to send money?</div>
                                            <div className="confirmBtnGrup">
                                                <div className="Decline" onClick={e => setShowConfirmSendDialog()}>Decline</div>
                                                <div className="Approve" onClick={() => sendCryptoTx(sendToken, tokenAmount, 'OUT', walletAddress)}>Approve</div>
                                            </div>
                                        </div>}
                                    </div>
                                </div> : ""}
                            </div>

                            <div className="balance-history">
                                <div className="panel-header">
                                    <p className="title">Presale LIVE</p>
                                </div>
                                <div className="panel-content">
                                    <div className="supply-content">
                                        <p className="">
                                            {new Intl.NumberFormat('en-US', {
                                                minimumFractionDigits: 0,      
                                                maximumFractionDigits: 0,
                                            }).format(presaleTokenNumber)}
                                        </p>
                                        <p className="total-content"> &nbsp;/&nbsp;
                                        <span className="text-primary">
                                            {new Intl.NumberFormat('en-US', {
                                                minimumFractionDigits: 0,      
                                                maximumFractionDigits: 0,
                                            }).format(soldTokenNumber)}</span>
                                         &nbsp;$SLM Sold</p>
                                    </div>

                                    <div className="progressbar">
                                        <ProgressBar now={soldTokenNumber*100/presaleTokenNumber} animated width="28px" />
                                    </div>

                                    <div className="progressbar-content">
                                        <p className="min-content">0 $SLM</p>
                                        <p className="max-content">
                                            {new Intl.NumberFormat('en-US', {
                                                minimumFractionDigits: 0,      
                                                maximumFractionDigits: 0,
                                            }).format(presaleTokenNumber)} $SLM
                                        </p>
                                    </div>
                                    {/* <HistoryChart chartData={chartData}/> */}
                                    <div className="list-content">
                                        <div className="content-item">
                                            <p className="content-item-text">Token Symbol</p>
                                            <div className="content-item-icon">
                                                <img src="./image/icon_SLM.png" alt="Icon_SlamCoin" />
                                                <p className="name">$SLM</p>
                                            </div>
                                        </div>
                                        <div className="content-item">
                                            <p className="content-item-text">Tokens for Presale</p>
                                            <p className="content-item-text-value">
                                                {new Intl.NumberFormat('en-US', {
                                                    minimumFractionDigits: 0,      
                                                    maximumFractionDigits: 0,
                                                }).format(presaleTokenNumber)}
                                            </p>
                                        </div>
                                        <div className="content-item">
                                            <p className="content-item-text">Token Presale Price</p>
                                            <p className="content-item-text-value">${tokenPrice}</p>
                                        </div>
                                    </div>
                                    <div className="actions">
                                        <button className="button-blue-filled" onClick={onClickBuySLM}>Buy</button>
                                    </div>
                                </div>
                            </div>

                            <div className="defi-staking">
                                <p className="title">Defi Staking</p>

                                <div className="staking-panel">
                                    <table className="staking-table">
                                        <thead>
                                            <tr className="table-header">
                                                <th>Token</th>
                                                <th>Est. APY</th>
                                                <th>Duration (days) </th>
                                                <th>Minimum Locked Amount</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="table-content">
                                                <td className="column-token">
                                                    <img src="./image/icon_slm_big.png" alt="" />
                                                    $SLM
                                                </td>
                                                <td className="column-APY">
                                                    5%
                                                </td>
                                                <td className="column-duration">
                                                    Flexible Lock
                                                </td>
                                                <td className="column-lockAmount">
                                                    0.001 $SLM
                                                </td>
                                                <td className="column-button">
                                                    <button className="button-blue-filled small" onClick={onClickStake}>Stake
                                                        Now</button>
                                                </td>
                                            </tr>

                                            <tr className="table-content">
                                                <td className="column-token">
                                                    <img src="./image/icon_bnb_big.png" alt="" />
                                                    BNB
                                                </td>
                                                <td className="column-APY">
                                                    5%
                                                </td>
                                                <td className="column-duration">
                                                    Flexible Lock
                                                </td>
                                                <td className="column-lockAmount">
                                                    0.00001 BNB
                                                </td>
                                                <td className="column-button">
                                                    <button className="button-blue-filled small" onClick={onClickStake}>Stake Now</button>
                                                </td>
                                            </tr>

                                            <tr className="table-content">
                                                <td className="column-token">
                                                    <img src="./image/icon_eth_big.png" alt="" />
                                                    ETH
                                                </td>
                                                <td className="column-APY">
                                                    5%
                                                </td>
                                                <td className="column-duration">
                                                    Flexible Lock
                                                </td>
                                                <td className="column-lockAmount">
                                                    0.0001 ETH
                                                </td>
                                                <td className="column-button">
                                                    <button className="button-blue-filled small" onClick={onClickStake}>Stake Now</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="recent-transactions">
                                <p className="title">Recent Transactions</p>
                                {transaction.map((item, key) => {
                                    return <div key={key} className="transaction-items">
                                        <TransactionItem status="" tokenType={item.bnb} tokenName={item.eth+" "+item.bnb} itemDate={item.created_at} itemSlam={item.slam}
                                            itemNetwork=" BSC"
                                            onClickCopyBtn={onClickCopyBtn} 
                                        />
                                        </div>
                                })}
                            </div>

                            <div className="staking-modal">
                                <StakeModal isShow={modalShow} hideModal={onClickConfirm} stakeComingShow={onClickStakeComing} isDay={isDay} />
                            </div>

                            <div className="staking-coming-modal">
                                <StakeComingModal isShow={stakeComingShow} hideModal={onClickConfirmComing} isDay={isDay} />
                            </div>

                            <div className="buyslm-modal">
                                <BuySLMModal isShow={buyslmModalShow} hideModal={onClickBuy} isDay={isDay} 
                                    sendToken={sendToken} 
                                    sendTokenChange={(e)=>{sendTokenChange(e);}} 
                                    bnbBalance={bnbBalance} 
                                    ethBalance={ethBalance} 
                                    sendCryptoTx={(token, amount, method) => {sendCryptoTx(token, amount, 'SWAP');}}
                                    warningTrans = {warningTrans} txSuccess={txSuccess} 
                                    warningTransChange = {warningTransChange}
                                />
                            </div>

                            <div className="sendMoneyConfirm-modal">
                                <SendConfirmModal isShow={showConfirmSendModal} hideModal={onSetShowConfirmModal} isDay={isDay} text="Do you want to send money?" txMethod="OUT"/>
                            </div>
                        </div>
                        <div className="panel_right">
                            <div className="panel-buy">
                                <div className={"dropdown_selection " + (!(showSendPad || showReceivePad) ? "noSelect" : "")}>
                                    <p className="panel-title-small">Buy</p>
                                    <div className="dropdown">
                                        <img src={"./image/icon_" + sendToken + ".png"} alt="bnb Icon" className="dropdown-icon" />
                                        <p className="dropdown-value">{sendToken}</p>
                                        <div className="bnbDetail">{sendToken} {sendToken == 'BNB' && "(BEP-20) $"+new Intl.NumberFormat('en-US', {
                                                    minimumFractionDigits: 2,      
                                                    maximumFractionDigits: 2,
                                                }).format(parseFloat(bnbBalance*bnbPrice).toFixed(2))}
                                                {sendToken == 'ETH' && "(ERC-20) $"+new Intl.NumberFormat('en-US', {
                                                    minimumFractionDigits: 2,      
                                                    maximumFractionDigits: 2,
                                                }).format(parseFloat(ethBalance*ethPrice).toFixed(2))}
                                        </div>
                                    </div>
                                    <div className="send-recv-btn">
                                        <button className="button-blue" onClick={onSetShowSendPad}> Send </button>
                                        <button className="button-blue-filled right" onClick={onSetShowReceivePad}> Recieve </button>
                                    </div>
                                </div>
                                <div className={"dropdown-panel " + (!buyCoinFlg ? "hidden" : "")}>
                                    <div className="dropdown_bnb" onClick={onClickbuyCoinBNB}>
                                        <img src="./image/icon_BNB.png" alt="bnb Icon" className="dropdown-icon" />
                                        <p className="dropdown-value">BNB</p>
                                    </div>
                                    <div className="dropdown_eth" onClick={onClickbuyCoinETH}>
                                        <img src="./image/icon_eth_big.png" alt="bnb Icon" className="dropdown-icon" />
                                        <p className="dropdown-value">ETH</p>
                                    </div>
                                </div>
                                {showReceivePad ? <div className="qrpad">
                                    <img src="./image/qr_small.png" onClick={handleQrShow} />
                                    <div className="walletAddress">
                                        <div className="title">Address</div>
                                        <div className="address">{address.substr(0, 21)}...</div>
                                        <CopyToClipboard text={address}>
                                            <img src="../image/icon_copy.svg" alt="" className="icon_copy" onClick={() => onClickCopyBtn(address)} />
                                        </CopyToClipboard>
                                    </div>
                                    {
                                        qrShow ?
                                            <QRCode address={address} changeQrCode={changeQrCode} onClickCopyBtn={onClickCopyBtn} /> : <></>
                                    }
                                </div>
                                    : ""}
                                {showSendPad ? <div className="sendPad">
                                    {
                                        outWarning && <small className="text-danger">{outWarning}</small>
                                    }
                                    {
                                        outSuccess && <small className="text-success">Transfer is completed!</small>
                                    }
                                    <BeatLoader color={"#36D7B7"} loading={outProcessing} css={override} size={15} />

                                    <div className="amount">Amount</div>
                                    <input type="text" className="amountText" value={tokenAmount} onChange={onChangeTokenAmount}/>
                                    <div className="amountMax cursor-pointer" onClick={() => {
                                        if(sendToken == 'BNB')
                                            setTokenAmount(bnbBalance)
                                        else if(sendToken == 'ETH')
                                            setTokenAmount(ethBalance)
                                    }}>
                                    {sendToken == 'BNB' && new Intl.NumberFormat('en-US', {
                                                    minimumFractionDigits: 6,
                                                    maximumFractionDigits: 6,
                                                }).format(bnbBalance)+" BNB "}
                                    {sendToken == 'ETH' && new Intl.NumberFormat('en-US', {
                                        minimumFractionDigits: 6,      
                                        maximumFractionDigits: 6,
                                    }).format(ethBalance)+" ETH "}
                                     (max)</div>
                                    <div className="wallet">Wallet Address</div>
                                    <input type="text" className="walletText" value={walletAddress} onChange={onChangeWalletAddress}/>
                                    <div className="networkFee">(Network fee will be included)</div>
                                    <div className="send-recv-btn">
                                        <button className="button-blue btn_close" onClick={onSetShowSendPad}> Close </button>
                                        <button className="button-blue-filled right btn_send" onClick={e => onOutValidate('desktop')}> Send </button>
                                        {(showConfirmSendDialog == 'desktop') && <div className="sendConfirmPad">
                                            <div className="confirmTitle">Do you want to send money?</div>
                                            <div className="confirmBtnGrup">
                                                <div className="Decline" onClick={(e) => setShowConfirmSendDialog()}>Decline</div>
                                                <div className="Approve" onClick={() => sendCryptoTx(sendToken, tokenAmount, 'OUT', walletAddress)}>Approve</div>
                                            </div>
                                        </div>}
                                    </div>
                                </div> : ""}
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

Dashboard.propTypes = {
    projectSetting: PropTypes.object.isRequired,
    setSetting: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    projectSetting: state.projectSetting
})

export default connect(mapStateToProps, { setSetting })(
    Dashboard
)