import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
//dev
import axios from 'axios';

export default function ChangePasswordModal(props) {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const [showError, setShowError] = useState("");

    const onSetShowCurrentPassword = () => {
        setShowCurrentPassword(!showCurrentPassword);
        setShowError();
    }

    const onSetShowNewPassword = () => {
        setShowNewPassword(!showNewPassword);
        setShowError();
    }

    const onSetShowConfirmNewPassword = () => {
        setShowConfirmNewPassword(!showConfirmNewPassword);
        setShowError();
    }

    const onChangeCurrentPassword = (e) => {
        setCurrentPassword(e.target.value);
        setShowError();
    }

    const onChangeNewPassword = (e) => {
        setNewPassword(e.target.value);
        setShowError();
    }

    const onChangeConfirmNewPassword = (e) => {
        setConfirmNewPassword(e.target.value);
        setShowError();
    }

    const onNewPasswordBlur = () => {

    }

    const onConfirmNewPasswordBlur = () => {
        if(confirmNewPassword !== newPassword) {
            setShowError("Password does not match!");
        }else{
            setShowError();
        }
    }

    const token  = localStorage.getItem('slamtoken');
    const [passwdSuccess, setPasswdSuccess] = useState(false);
    const updatePassword = () => {
        if(confirmNewPassword === ''){
            setShowError("Confirm password is empty!");
        }

        if(newPassword !== ''){
            if(newPassword !== confirmNewPassword){
                setShowError("Password does not match!");
            }else{
                setShowError("");
            }
        }else {
            return false;
        }

        if(confirmNewPassword !== '' && newPassword !== '' && newPassword === confirmNewPassword){
            axios.post(process.env.REACT_APP_SLAMBACKEND+'api/'+props.id+'/resetPasswd', {token: token, cpass: currentPassword, npass: newPassword})
            .then(res => {
                // console.log(res, "result")
                if(res.data.status === "success") {
                    // console.log(res.data.status, "success")
                    setPasswdSuccess(true);
                    setConfirmNewPassword('');
                    setNewPassword('');
                    setConfirmNewPassword('');
                }else {
                    setShowError(res.data.msg);
                    setPasswdSuccess(false)
                }
            })
        }
    }

    return (
        <div>
            <Modal show={props.isShow} onHide={props.hideModal} className={"changePasswordModal " + (!props.isDay ? "NightModal" : "")}>
                <div className="modal_header ">
                    <div className="title">
                        Change Password
                    </div>
                    <div className="close">
                        <i className="fas fa-times" onClick={props.hideModal}></i>
                    </div>
                </div>
                <div className="modal_content">
                    <div className="inputGroup">
                        <div className="inputLabel">Enter Current Password</div>
                        <div className="input">
                            <input type={showCurrentPassword ? "text" : "password"} placeholder="Current Password" value = {currentPassword} onChange = {onChangeCurrentPassword}/>
                            <img alt="eye" src="./image/setting/eye.svg" onClick = {onSetShowCurrentPassword}/>
                        </div>
                    </div>
                    <div className="inputGroup">
                        <div className="inputLabel">Enter New Password</div>
                        <div className="input">
                            <input type={showNewPassword ? "text" : "password"} placeholder="At least 8 characters" value = {newPassword} onBlur = {onNewPasswordBlur} onChange = {onChangeNewPassword}/>
                            <img alt="eye" src="./image/setting/eye.svg" onClick = {onSetShowNewPassword}/>
                        </div>
                        
                    </div>
                    <div className="inputGroup">
                        <div className="inputLabel">Confirm New Password</div>
                        <div className="input">
                            <input type={showConfirmNewPassword ? "text" : "password"} placeholder="At least 8 characters" value = {confirmNewPassword} onBlur = {onConfirmNewPasswordBlur} onChange = {onChangeConfirmNewPassword}/>
                            <img alt="eye" src="./image/setting/eye.svg" onClick = {onSetShowConfirmNewPassword}/>
                        </div>
                        
                        {passwdSuccess ? <div className="text-success">Password is updated!</div> : ""}
                        {showError ? <div className="errText">{showError}</div> : ""}
                    </div>
                    <div className="resetPassBtn" onClick={(e) => {updatePassword()}}><button className="confirmBtn" >Confirm</button></div>
                </div>
            </Modal>
        </div>
    );
}