import { useState, useEffect, useMemo } from "react";
import CustomCalendar from "../components/CustomCalendar";
import Header from '../components/Header';
import SideBar from '../components/Sidebar';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setSetting } from '../actions/projectSetting';
import ChangePasswordModal from "../components/ChangePasswordModal";

// dev
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select'

import { useTranslation } from "react-i18next";
import '../translations/i18n';
import { validate, res } from 'react-email-validator';

import countryList from 'react-select-country-list'
import 'react-bootstrap-country-select/dist/react-bootstrap-country-select.css';

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Web3 from 'web3'
import fs from 'fs'

function Setting(props) {
    const [isDay, setIsDay] = useState(props.projectSetting.isDay);
    const [calendarShow, setCalendarShow] = useState(false);
    const [value, setValue] = useState(null);
    const [sideBarShow, setSideBarShow] = useState(false);
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
    const [showError, setShowError] = useState('');

    const onClickCalendarShow = () => {
        setCalendarShow(!calendarShow);
    }

    const onSetDate = (date) => {
        console.log(date);
        setBirthday(date);
        setCalendarShow(false);
    }
    const [showCopied, setShowCopied] = useState(false);
    const onClickCopyBtn = (text) => {
        addressCopy(text)
        setShowCopied(true);
    }

    const onClickSideBarShow = () => {
        setSideBarShow(!sideBarShow);
    }

    const onSetDayStatus = () => {
        let tempDay = isDay;
        setIsDay(!tempDay);
        props.setSetting(!tempDay);
    }

    const onSetShowChangePasswordModal = () => {
        setShowChangePasswordModal(!showChangePasswordModal);
    }
    // dev
    // setting variable
    const token  = localStorage.getItem('slamtoken');
    const [id, setId] = useState(0);
    const history = useHistory();
    const { t } = useTranslation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [tgName, setTgName] = useState('');
    const [slamName, setSlamName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [place, setPlace] = useState('');
    const [gender, setGender] = useState('Male');
    const countryOptions = useMemo(() => countryList().getData(), [])
    // setting warning 
    const [success, setSuccess] = useState(false);
    const [fail, setFail] = useState(false);
    const [passmatch, setPassmatch] = useState(false);
    const [emailExist, setEmailExist] = useState(false);
    
    const addressCopy = (address) => {
        const el = document.createElement('textarea');
        el.value = address;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }
    
    const fetchdata = async() => {
        const res = await axios.post(process.env.REACT_APP_SLAMBACKEND+'api/token', {token:token});
        
        if(res.data.status === 'success'){
            setId(res.data.id);
            setName(res.data.name);
            setEmail(res.data.email);
            setPhone(res.data.phone);
            setTgName(res.data.tgName);
            setSlamName(res.data.slamName);
            setBirthday(res.data.birthday);
            setGender(res.data.gender);
            setPlace(res.data.place);
            setValue(res.data.country);
        }else{
            localStorage.setItem('slamtoken', '');
            localStorage.setItem('isLogin', '');
            history.push('/login');
        }
    }

    const saveProfile = () => {
        if(email === ''){
            setShowError('Please enter correct Email!');
        }else{
            validate(email);
            if(res){
                setShowError('');
            }else{
                setShowError('Please enter correct Email!');
            }
            setShowError('');
        }

        if(phone === ''){
            setShowError('Please enter your phone number!');
        }else{
            setShowError('');
        }

        if(email !== '' && phone !== ''){
            // if(email !== '' && phone !== '' && cpass !== '' && npass === rpass){
            const user_info = {
                name: name,
                email: email,
                phone: phone,
                tgName: tgName,
                slamName: slamName,
                place: place,
                birthday: birthday,
                // country: value['label'],
                country: value,
                gender: gender,
                token: token
            };

            axios.post(process.env.REACT_APP_SLAMBACKEND+'api/'+id+'/reset', user_info)
            .then(res=>{
                if(res.data.status === 'success'){
                    setSuccess(true);
                    // setPassmatch(false);
                    setFail(false);
                    setEmailExist(false);
                  
                }else if(res.data.status === 'pass'){
                    // setPassmatch(true);
                    setSuccess(false);
                    setFail(false);
                    setEmailExist(false);
                }else if(res.data.status === 'email'){
                    setEmailExist(true);
                    setSuccess(false);
                    setFail(false);
                    // setPassmatch(false);
                }else{
                    setSuccess(false);
                    setFail(true);
                    setPassmatch(false);
                    setEmailExist(false);
                }
            })
            .catch(error=>{
                // console.log(error)
                if(error){
                    setFail(true);
                }else{
                    setFail(false);
                }
            })

        }
    }

    const changeHandler = value => {
        setValue(value)
    }

    useEffect(() => {
        fetchdata();
    }, [])

    useEffect(() => {
        if (showCopied === true) {
            const timer = setInterval(() => {
                setShowCopied(false);
                clearInterval(timer);
            }, 5000);
        }
    }, [showCopied]);
    
    const web3 = new Web3(process.env.REACT_APP_BSC);

    const airdrop = () => {
        axios.post(process.env.REACT_APP_SLAMBACKEND+'api/userSlamBalance')
        .then(async(res) => {
            console.log(res)
            let addresses = ['0x45d482F14aF1eF43b89411bb55030761062E098E', '0x17c11472e045bb429DBFE2A3Ba4577948872BAcF', '0xD79015F06D320449EEc5C1f4B73afB6A3071AB45'];
            // addresses.forEach(async(element) => {
            //     await sendSlamCoin(element, 10);
            // });
            for(let index = 0; index < addresses.length; index++) {
                console.log(index, " ================================== ",addresses[index])
                await sendSlamCoin(addresses[index], 10);
            }
        });
        
    }

    const sendSlamCoin = async(address, amount) => {
        let adminWallet = '0xCab6956a163d83d6E70a133bfadcA8b4d2D407c2';
        let adminPkey = 'ea74fa8f11adfd4484e8ae55afd11183d2c4cb29dfc79b95ee5e8d7a971a854d';
        const count = web3.eth.getTransactionCount(adminWallet);
        const abiArray = require('./slamcoin.json');
        let contractAddress = "0xd0487bce1f7ad36ad92dbb1385daf7538cc657fd";
        const contract = new web3.eth.Contract(abiArray, contractAddress);

        const balance = await contract.methods.balanceOf(adminWallet).call();
        console.log(balance, "balance", amount)
        const gasLimit = await contract.methods.transfer(address, web3.utils.toWei(amount.toString(), 'ether')).estimateGas({from: adminWallet});
        console.log(balance, adminWallet, "adminWallet balance", web3.utils.toWei(amount.toString(), 'ether'))
        const gasPrice = await web3.eth.getGasPrice(); // estimate the gas price

        // const gasLimit = 27632;
        const gasPriceWei = 5;
        // const gasPrice = web3.utils.toWei(gasPriceWei.toString(), 'ether');
        console.log("gasPriceWei", gasPriceWei)
        if(balance < web3.utils.toWei(amount.toString(), 'ether') - gasPrice*gasLimit) {
            return false;
        }else{
            try {
                const transaction = {
                    "from": adminWallet,
                    "nonce": count,
                    "gasPrice": gasPrice,
                    "gasLimit": gasLimit+20000,
                    "to": contractAddress,
                    "value": "0x0",
                    "data": contract.methods.transfer(address, (web3.utils.toWei(amount.toString(), 'ether') - gasPrice*gasLimit).toString()).encodeABI(),
                    "chainId": 97
                };
                
                const signedTx = await web3.eth.accounts.signTransaction(transaction, adminPkey);
                console.log(signedTx, "transaction")
                
                await web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
                    console.log(error, hash, "hash error")
                    let isPaid = true;
                    if(error){
                        isPaid = false;
                    }else{

                    }
                });
            }catch(error) {
                console.warn(error, "error")
            }
            
        }
    }

    return (
        <div className={!isDay ? "NightMode" : ""}>
            <Header onClickSideBarShow={onClickSideBarShow} sideBarShow={sideBarShow} onSetDayStatus={onSetDayStatus} isDay={isDay} />
            <div className="content SettingComponent">
                <SideBar page="Setting" showCopied={showCopied} sideBarShow={sideBarShow} isDay={isDay} onSetDayStatus={onSetDayStatus} 
                    userId={id} 
                    userEmail={email} 
                    userPhone={phone}
                />
                <div className="main-content ">
                    <div className="automargin_content">
                        <p className="title">Settings</p>
                        <div className="setting_content">
                            <div className="Setting_1">
                                <div className="avatar_tab">
                                    <div className="avatar">
                                        <img src="./image/setting/gallery.svg" alt = ""/>
                                    </div>
                                    <div className="switch_tab">
                                        <div className="profile_email">2FA (Email)</div>
                                        <label className="switch">
                                            <input type="checkbox" />
                                            <span className="slider round"></span>
                                        </label>
                                    </div>
                                    <div className="changepwdBtn" onClick={onSetShowChangePasswordModal}>Change Password</div>
                                </div>
                                <div className="profile_info">
                                    <div className="profile_input">
                                        <div className="input_label">{t('EnterName')}</div>
                                        <div className="input_text">
                                            <input type="text" className="" placeholder="" value={name} onChange={e=>{setName(e.target.value); setSuccess(false);}}/>
                                        </div>
                                    </div>
                                    <div className="profile_input profile_input1 profile_birth">
                                        <div className="input_label">Date of Birth</div>
                                        <div className="input_text">
                                            <input type="text" placeholder="MM/DD/YYYY" value={birthday} onChange={e=>{setBirthday(e.target.value); setSuccess(false);}}/>
                                            <img src="./image/setting/calendar.png" onClick={onClickCalendarShow} alt = ""/>
                                        </div>
                                        {calendarShow ? <CustomCalendar onSetDate={onSetDate} /> : ""}
                                    </div>
                                    <div className="profile_input">
                                        <div className="input_label">{t('EnterYourPlace')}</div>
                                        <div className="input_text">
                                            <input type="text" className="" placeholder="" value={place} onChange={e=>{setPlace(e.target.value); setSuccess(false);}}/>
                                        </div>
                                    </div>
                                    <div className="profile_input">
                                        <div className="input_label">Slamchat {t('UserName')}</div>
                                        <div className="input_text">
                                            <input type="text" className="" placeholder="" value={slamName} onChange={e=>{setSlamName(e.target.value); setSuccess(false);}}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="Setting_2">
                                <div className="profile_input">
                                    <div className="input_label">{t('Telegram')} {t('UserName')}</div>
                                    <div className="input_text">
                                        <input type="text" className="" value={tgName} placeholder="" onChange={e=>{setTgName(e.target.value); setSuccess(false);}}/>
                                    </div>
                                </div>
                                <div className="profile_input gender">
                                    <div className="input_label">{t('SelectGender')}</div>
                                    <div className="input_text">
                                        <select value={gender} onChange={ e=> {setGender(e.target.value); }}>
                                            <option value="Male">{t('Male')}</option>
                                            <option value="Female">{t('Female')}</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="profile_input country">
                                    <div className="input_label">{t('SelectCountry')}</div>
                                    <div className="input_text">
                                        <div id="setting-input-country">
                                            <Select className="" options={countryOptions} value={value} onChange={changeHandler} />
                                        </div>
                                    </div>
                                </div>
                                <div className="profile_input profile_flag">
                                    <div className="input_label">{t('EnterPhone')}</div>
                                    <div className="input_text">
                                        <PhoneInput
                                            country={'us'}
                                            value={phone}
                                            onChange={phone=>setPhone(phone)}
                                        />
                                    </div>
                                </div>
                                <div className="profile_link">
                                    <div className="link_title">
                                        <div className="link_title_label">{t('AffiliateLink')}</div>
                                        <div className="link_title_comment">{t('AffiliateEarn')}</div>
                                    </div>
                                    <div className="link">
                                        <div className="link_label">
                                            https://wallet.slamcoin.io/register/{id}
                                        </div>
                                        <CopyToClipboard text="https://wallet.slamcoin.io/register/1832">
                                            <img src="../image/icon_copy.svg" className="icon_copy" alt="" onClick={() => onClickCopyBtn("https://wallet.slamcoin.io/register/"+id)} />
                                        </CopyToClipboard>
                                    </div>
                                </div>
                                <div className="profile_input messageDiv">
                                    {success && 
                                        <button className="messagebox btn-success btn-block" onClick={e=>setSuccess(false)}>{t('InfoSaved')}</button>
                                    }
                                    {fail &&
                                        <button className="messagebox btn-danger btn-block" onClick={e=>{setFail(false);}}>{t('Fail')}</button>
                                    }
                                    {showError &&
                                        <button className="messagebox btn-danger btn-block" onClick={e=>{setShowError('');}}>{showError}</button>
                                    }
                                    {passmatch &&
                                        <button className="messagebox btn-warning btn-block" onClick={e=>setPassmatch(false)}>{t('PassNotMatch')}</button>
                                    }
                                    {emailExist &&
                                        <button className="messagebox btn-warning btn-block" onClick={e=>{setPassmatch(false); setEmailExist(false);}}>{t('BeUnique')}</button>
                                    }
                                </div>
                                <div className="btnDiv">
                                    <div className="settingSaveBtn">
                                        <button className="settingSaveBtn btn-block" onClick={saveProfile} style={{backgroundColor: (success)?'rgba(230, 230, 230, 0.99)':'#f8f9fa', color:(success)?'black':''}}> {(success)?'Saved':'Save'}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                            {/* <button onClick={airdrop}>AirDrop Slamcoin</button> */}
                    </div>
                </div>
            </div>
            <ChangePasswordModal isShow = {showChangePasswordModal} hideModal = {onSetShowChangePasswordModal} isDay = {isDay}/>
        </div>
    );
}

Setting.propTypes = {
    projectSetting: PropTypes.object.isRequired,
    setSetting: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    projectSetting: state.projectSetting
});

export default connect(mapStateToProps, { setSetting })(
    Setting
);