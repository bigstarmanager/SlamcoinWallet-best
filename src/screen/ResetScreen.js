import React, { useState } from 'react';
import Header from '../components/Header'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setSetting } from '../actions/projectSetting'
import { Link } from 'react-router-dom';
function ResetScreen(props) {
    const [isDay, setIsDay] = useState(props.projectSetting.isDay)
    const [showPassword, setShowPassword] = useState(false)
    const [showRegisterPanel, setShowRegisterPanel] = useState(false);


    const onSetDayStatus = () => {
        let tempDay = isDay
        setIsDay(!tempDay)
        props.setSetting(!tempDay)
    }

    const onSetShowPassword = () => {
        setShowPassword(!showPassword);
    }


    const onSetShowRegisterPanel = () => {
        setShowRegisterPanel(!showRegisterPanel);
    }

    return (
        <div className={"Resetcomponent " + (!isDay ? "NightMode" : "")}>
            {/* <Header onSetDayStatus={onSetDayStatus} isDay={isDay} /> */}
            <div className="mainContent">
                <div className="Content">
                    <div className="Content1">
                        <div className="LoginContent">
                            <div className="LogoImg">
                                <img src={"./image/Login/logo" + (isDay ? "" : "_night") + ".svg"} />
                            </div>
                            <div className="subTitle">Reset Password</div>
                            <div className="subDes">Enter the email associated with your account and we’ll send an email with instructions to reset your password.</div>
                            <div className="inputGroup">
                                <div className="label">E-mail</div>
                                <div className="inputText">
                                    <input type="text" placeholder="Enter your email " />
                                </div>
                            </div>
                            <div className="loginBtn">Login</div>
                            <div className="loginFooter1">
                                <div className="footerLabel">Don’t have an acoount yet?<Link to="./register">Register</Link></div>
                            </div>
                        </div>
                    </div>
                    <div className="Content2">
                        {/* <div className="LogoImg">
                            <img src={"./image/Login/logo" + (isDay ? "" : "_night") + ".svg"} />
                        </div>
                        <img src={"./image/Login/iPhone 27" + (isDay ? "" : "_night") + ".png"} /> */}
                        <div className="LogoImg">
                            <img src="./image/Login/image 80.png" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

ResetScreen.propTypes = {
    projectSetting: PropTypes.object.isRequired,
    setSetting: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    projectSetting: state.projectSetting
})

export default connect(mapStateToProps, { setSetting })(
    ResetScreen
)