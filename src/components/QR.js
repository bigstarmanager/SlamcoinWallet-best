import React from "react";
import QRCode from "react-qr-code";

// ReactDOM.render(<QRCode value="hey" />, document.getElementById("Container"));

const QR = (props) => {
    console.log(props, "props", props.value)
    return (
        <QRCode value={props.value} size={111}/>
    )
}

export default QR;