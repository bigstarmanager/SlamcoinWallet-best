const Header = (props) => {
    const onClickOption = () => {
        alert();
    }
    return (
        <div className="header">
            <img src={"./image/Logo" + (!props.isDay ? "_night" : "") + ".svg"} alt="SlamCoin Logo" className="logo" />
            <div className={!props.sideBarShow ? "options" : "options option_close"}>
                <div className="switch_tab">
                    <img src={"./image/moon" + (!props.isDay ? "_selected" : "") +".svg"}/>
                    <label className="switch">
                        <input type="checkbox" onChange = {props.onSetDayStatus} checked={props.isDay ? true : false}/>
                        <span className="slider round"></span>
                    </label>
                    <img src={"./image/sun" + (props.isDay ? "_selected" : "") +".svg"}/>
                </div>
                {!props.sideBarShow ? <div className="option_menu" onClick={props.onClickSideBarShow}>
                    <img src={"./image/icon_menu" + (props.isDay ? "" : "_night") + ".svg"} />
                </div> : ""}
                {props.sideBarShow ? <div className="close" onClick={props.onClickSideBarShow}><i className="fas fa-times"></i></div> : ""}
                <div className="option" >
                    <i className="fas fa-dollar-sign" ></i>
                </div>
                <div className="avatar">
                    <img src="./image/avatar.png" alt="Avatar" className="avatar" />
                </div>
            </div>
        </div>
    )
}

export default Header;