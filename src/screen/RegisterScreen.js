import React, { useState, useEffect } from 'react';
import Header from '../components/Header'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setSetting } from '../actions/projectSetting'
import { Link } from 'react-router-dom';

//dev
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";

import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { validate, res } from 'react-email-validator';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useTranslation } from "react-i18next";
import "../translations/i18n";

function RegisterScreen(props) {
    const [isDay, setIsDay] = useState(props.projectSetting.isDay)
    const [showRegisterPassword, setShowRegisterPassword] = useState(false);
    const [showRegisterConfirmPassword, setShowRegisterConfirmPassword] = useState(false);
    const [showError, setShowError] = useState('');

    const onSetDayStatus = () => {
        let tempDay = isDay
        setIsDay(!tempDay)
        props.setSetting(!tempDay)
    }

    const onSetShowRegisterPassword = () => {
        setShowRegisterPassword(!showRegisterPassword);
    }

    const onSetShowRegisterConfrimPassword = () => {
        setShowRegisterConfirmPassword(!showRegisterConfirmPassword);
    }

    //dev
    const { t } = useTranslation();
    // inputs values
    const [phone, setPhone] = useState("");
    const [country, setCountry] = useState("");
    
    const [pass, setPass] = useState("");
    const [cpass, setCpass] = useState("");
    const [email, setEmail] = useState("");
    const [termsCond, setTermsCond] = useState(false);

    const history = useHistory();
    let user_id = 0;
    const registerUrl = window.location.pathname.split('/');
    if(registerUrl.length === 3 && registerUrl[1] === "register")
        user_id = registerUrl[2];

    useEffect(() => {
        const token   = localStorage.getItem('slamtoken');
        const isLogin = localStorage.getItem('isLogin');
        if(token && isLogin) 
          history.push('/');
    }, []);

    const register = () => {
        if(!termsCond) {
            setShowError('Please check terms and condition!');
        }else
            setShowError('');

        if(pass === ""){
            setShowError('Please enter password!');
        }else{
            setShowError('');
        }

        if(email === ""){
            setShowError('Please enter email address!');
        }else{
            validate(email);
            if(res){
                setShowError('');
            }else{
                setShowError('Invalid email address!');
            }
            setShowError('');
        }

        if(phone === ""){
            setShowError('Phone Number is mandatory!');
        }else{
            setShowError('');
        }

        if(cpass === ""){
            setShowError('Please enter confirm password!');
        }else{
            setShowError('');
        }

        if(cpass !== "" && pass !== "" && cpass !== pass){
            setShowError('Password must be same!');
        }else{
            setShowError('');
        }
        
        if(phone!=="" && email!=="" && pass!=="" && cpass!=="" && cpass === pass && termsCond){
            const provider = new WalletConnectProvider({
                infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
            });
            
            const web3 = new Web3(provider);
            const ethscan = web3.eth.accounts.create();
            const account_adress = ethscan.address;
            const authHash = ethscan.address;

            const reginfo = {
                phone: phone,
                email: email,
                address: account_adress,
                country: country,
                password: pass,
                refer_id: user_id,
                guid: authHash,
                termsCond: termsCond
            };
            
            axios.post(process.env.REACT_APP_SLAMBACKEND+`api/signup`, reginfo) 
            .then(res => {
              if(res.data.status === "success"){
                localStorage.setItem('isLogin', "1");
                localStorage.setItem('slamtoken', res.data.token);
                history.push('/');
              }
              if(res.data.status === 'mail'){
                setShowError('Phone number or Email is in use!');
              }
              if(res.data.status === 'refer'){
                
              }
            })
        }
    }

    return (
        <div className={"LoginComponent " + (!isDay ? "NightMode" : "")}>
            <Header onSetDayStatus={onSetDayStatus} isDay={isDay} />
            <div className="mainContent">
                <div className="Content">
                    <div className="Content1">
                        <div className={isDay ? "RegisterContent" : "RegisterContent Night"}>
                            <div className="LogoImg">
                                <img alt="Logo" src={"./image/Login/logo" + (isDay ? "" : "_night") + ".png"} />
                            </div>
                            <div className="subTitle">Registration</div>
                            <div className="subDes mb-2">
                                Type in your email and pasword to get access to <a>Slamwallet</a>
                            </div>
                            
                            <div className="mb-4">
                                {showError ? <div className="text-danger">{showError}</div> : ""}
                            </div>
                            
                            <PhoneInput
                                country={'us'}
                                value={phone}
                                inputClass="phoneInput"
                                onChange={(phone, country)=>{setPhone(phone); setCountry(country.name)}}
                            />
                            <div className="inputText">
                                <input type="email" placeholder="Your Email*" onChange={e=>{setEmail(e.target.value);}}/>
                            </div>
                            <div className="inputText">
                                <input type={showRegisterPassword ? "text" : "password"} placeholder="Your Password*" value={pass} onChange={e=>{setPass(e.target.value);}} />
                                <img alt="" src="./image/setting/eye.svg" onClick={onSetShowRegisterPassword} />
                            </div>
                            <div className="inputText">
                                <input type={showRegisterConfirmPassword ? "text" : "password"} placeholder="Repeat Your Password*" value={cpass} onChange={e=>{setCpass(e.target.value);}} />
                                <img alt="" src="./image/setting/eye.svg" onClick={onSetShowRegisterConfrimPassword} />
                            </div>

                            <div className="registerText">Please take a few minutes to read and understand SlamWallet 
                                <a href="https://slamcoin.io/SLM_Terms&Conditions.pdf">Terms of Service</a>. 
                                To continue, you’ll need to accept the Terms of Service by checking the box.
                            </div>

                            <div className="checkGroup">
                                <input type="checkbox" id="rememberMe" onClick={e => {setTermsCond(!termsCond)}} />
                                <div className="checkLabel"><label htmlFor="rememberMe">I accept the SlamNFTs Terms of Service</label></div>
                            </div>

                            <div className="loginBtn">
                                <button className={(email !== '' && termsCond) ? "btn btn-block slam-auth-button":"btn btn-block slam-auth-button disabled"} onClick={register}>{t('Register')}</button>
                            </div>
                            <div className="registerFooter">Already have an account? <Link to="/login">Log in</Link></div>
                        </div>
                    </div>
                    <div className="Content2">
                        <div className="LogoImg">
                            <img alt="Logo" src={"./image/Login/logo" + (isDay ? "" : "_night") + ".png"} />
                        </div>
                        <img alt="Logo" src={"./image/Login/iPhone 27" + (isDay ? "" : "_night") + ".png"} />
                    </div>
                </div>
            </div>
        </div>
    )
}

RegisterScreen.propTypes = {
    projectSetting: PropTypes.object.isRequired,
    setSetting: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    projectSetting: state.projectSetting
})

export default connect(mapStateToProps, { setSetting })(
    RegisterScreen
)