import React, { useState, useEffect } from 'react';
import Header from '../components/Header'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setSetting } from '../actions/projectSetting'
import { Link } from 'react-router-dom';

//dev
import setAuthToken from '../utils/setAuthToken';
import axios from 'axios';
import { validate, res } from 'react-email-validator';
import { useHistory } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import "../translations/i18n";

function LoginScreen(props) {
    const [isDay, setIsDay] = useState(props.projectSetting.isDay);
    const [showPassword, setShowPassword] = useState(false);
    const [showRegisterPanel, setShowRegisterPanel] = useState(false);
    const onSetDayStatus = () => {
        let tempDay = isDay
        setIsDay(!tempDay)
        props.setSetting(!tempDay)
    }
    const onSetShowPassword = () => {
        setShowPassword(!showPassword);
    }
    
    //dev
    const { t } = useTranslation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validEamil, setValidEamil] = useState(false);
    const [credential, setCredential] = useState(false);
    const [emailCode, setEmailCode] = useState("");
    const [termsCond, setTermsCond] = useState(false);
    const [emailVerify, setEmailVerify] = useState(false);
    const [verifyStatus, setVerifyStatus] = useState('');

    const [showError, setShowError] = useState('');

    const history = useHistory();
    const token   = localStorage.getItem('slamtoken');
    const isLogin = localStorage.getItem('isLogin');

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const status = queryParams.get('status'); //code
        setVerifyStatus(status);
        
        if(token && isLogin)
            history.push('/');
    }, []);

    const handleEnterKeyPress = (event) => {
        if(event.key === "Enter")
            login()
    }

    const login = () => {
        if(!termsCond)
            return false;

        if(email===""){
            setShowError('Please enter email address!');
        }else{
            setShowError('');
        }

        if(password===""){
            setShowError('Please enter password!');
        }else{
            setShowError();
        }

        if(email !== ""){
            validate(email);
            if(res){
                setShowError();
            }else{
                setShowError('Please enter valid email address!');
            }
        }

        if(email !== "" && password !== "" && validEamil === false && termsCond){
            axios.post(process.env.REACT_APP_SLAMBACKEND+'api/signin', {email:email, password: password})
            .then(res=>{
                if(res.data.status === "success"){
                    setCredential(false);
                    setAuthToken(res.data.token);
                    localStorage.setItem('isLogin', "1");
                    // localStorage.setItem('slamtoken', res.data.token);
                    history.push('/');
                }
                else if(res.data.status === "emailVerify"){
                    setEmailVerify(true);
                }
                else if(res.data.status === "email"){
                    setCredential(false);
                }else {
                    setCredential(true);
                }
            })
            .catch(error=>{
                // console.log(error, "this is catch error")
            })
        }
    }

    const emailCodeSend = () => {
        const send = {
            email: email,
            emailCode: emailCode,
        }

        if(emailCode){
            axios.post(process.env.REACT_APP_SLAMBACKEND+'api/email-verify', send)
            .then(res => {
                if(res.data.status === "success"){
                    localStorage.setItem('isLogin', "1");
                    localStorage.setItem('slamtoken', res.data.token);
                    history.push('/');
                }else{
           
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
                        <div className="LoginContent">
                            <div className="LogoImg">
                                <img src={"./image/Login/logo" + (isDay ? "" : "_night") + ".png"} />
                            </div>
                            <div className="subTitle">Log in</div>
                            <div className="subDes">Log in with your data that you entered during your registration.</div>

                            <div className="inputGroup">
                                {showError && <div className="text-danger">{showError}</div>}
                                {emailVerify && <div className="text-danger">{t('VerificationLink')} <br/>{t('VerifyEmail')}</div>}
                                {verifyStatus == 'emailVerified' && <div className="text-success">{t('Verified')}</div>}
                                {verifyStatus == 'emailNotVerified' && <div className="text-danger">{t('NotVerified')}</div>}
                                {credential && <div className="label credential">{t('AuthIncorrect')}</div>}
                            </div>

                            <div className="inputGroup">
                                <div className="label">E-mail</div>
                                <div className="inputText">
                                    <input type="email" className="slam-login-email" id="email" placeholder={t('EnterEmail')}  onChange={e=>{setEmail(e.target.value);}}/>
                                </div>
                            </div>
                            <div className="inputGroup">
                                <div className="label">Password</div>
                                <div className="inputText">
                                    <input type={showPassword ? "text" : "password"} className="slam-login-pass" id="pass" placeholder={t('EnterPassword')} onKeyPress={handleEnterKeyPress} onChange={e=>{setPassword(e.target.value);}}/>
                                    <img src="./image/setting/eye.svg" onClick={onSetShowPassword} />
                                </div>
                            </div>
                            {/* <div className="checkGroup">
                                <input type="checkbox" />
                                <div className="checkLabel">Keep me logged in</div>
                            </div> */}

                            <div className="checkGroup">
                                <input type="checkbox" value="lsRememberMe" id="rememberMe" className="rememberMe form-control" onClick={e => {setTermsCond(e.target.checked)}} />
                                <label htmlFor="rememberMe" className="checkLabel rememberMeLabel">
                                    {t('Accept')} &nbsp;
                                    <a className="" href="https://slamcoin.io/SLM_Terms&Conditions.pdf" target="_blank">
                                        <strong>{t('Terms')}</strong> {t('And')} <strong>{t('Conditons')}</strong>
                                    </a>
                                </label>
                            </div>
                            
                            <div className="loginBtn">
                                <button className={(email != '' && password !== "" && validEamil === false && termsCond) ? "btn btn-block slam-auth-button":"btn btn-block slam-auth-button disabled"} onClick={login}>{t('Login')}</button>
                            </div>
                            <div className="loginFooter1">
                                <div className="footerLabel">Don’t have an acoount yet?<Link to="./register">Register</Link></div>
                            </div>
                            <div className="loginFooter2">
                                <div className="forgotBtn"><Link to="./forgetpassword">Forgot Password?</Link></div>
                            </div>
                        </div>
                    </div>
                    <div className="Content2">
                        <div className="LogoImg">
                            <img src={"./image/Login/logo" + (isDay ? "" : "_night") + ".png"} />
                        </div>
                        <img src={"./image/Login/iPhone 27" + (isDay ? "" : "_night") + ".png"} />
                    </div>
                </div>
            </div>
        </div>
    )
}

LoginScreen.propTypes = {
    projectSetting: PropTypes.object.isRequired,
    setSetting: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    projectSetting: state.projectSetting
})

export default connect(mapStateToProps, { setSetting })(
    LoginScreen
)