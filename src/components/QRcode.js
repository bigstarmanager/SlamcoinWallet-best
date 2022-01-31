import QR from './QR';
import { CopyToClipboard } from 'react-copy-to-clipboard';
const QRCode = (props) => {
	const { changeQrCode, address } = props;
	return (
		<div className="panel-qr" >
			<div className="close">
				<i className="fas fa-times" onClick={changeQrCode}></i>
			</div>
			<div className="image">
				<QR value={address} />
			</div>
			<div className="address">
				<p> {address.substr(0, 21)}...
					<CopyToClipboard text={address}>
						<i className="far fa-clone icon_copy" onClick={() => props.onClickCopyBtn(address)}></i>
					</CopyToClipboard>
				</p>
			</div>
		</div>
	)
}

export default QRCode;