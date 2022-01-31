import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
export default function TransactionItem(props) {
    const item_status = {
        "Deposit": "Deposit",
        "Swap": "Swap",
        "BONUS": "BONUS",
        "completed": "Completed",
        "inprogress": "In progress",
        "rejected": "Rejected"
    };

    const item_type = {
        "SLM": "icon_slm_big.png",
        "BNB": "icon_bnb_big.png",
        "ETH": "icon_eth_big.png"
    }
    return (
        <div>
            <div className="transactionItem">
                <div className="itemHeader">
                    {
                        (props.tokenType === 'BNB' || props.tokenType === 'ETH') ?
                        <>
                            <img src={"../image/" + item_type[props.tokenType]} alt="" />
                        </>
                        :
                        <>
                            <img src={"../image/" + item_type['SLM']} alt="" />
                        </>
                    }
                    <div className="tokenName">{props.tokenName}</div>
                    <div className="itemNetworkContent">
                        <div className="itemNetwork">
                            {item_status[props.status]}
                        </div>
                    </div>
                </div>
                <div className="itemContent">
                    <div className="itemDate">{props.itemDate}</div>
                    {props.method && 
                    <div className={"itemAddressContent " + props.method}>
                        <div className="itemAddressTitle">Method: </div>
                        <div className="itemAddress">
                            {item_status[props.method]}
                        </div>
                    </div>}
                    <div className="itemNetwork">
                        {props.itemSlam && <div className="itemNetworkContent">
                            {/* <div className="itemNetworkTitle">Network</div> */}
                            <div className="itemNetwork">{props.itemSlam} SLM</div>
                        </div>}
                        {props.itemAddress && <div className="itemAddressContent">
                            <div className="itemAddressTitle">Address: </div>
                            <div className="itemAddress">{props.itemAddress}</div>
                            <CopyToClipboard text={props.itemAddress}>
                                <img src="../image/icon_copy.svg" alt="" className="icon_copy" onClick={() => props.onClickCopyBtn(props.itemAddress)} />
                            </CopyToClipboard>
                        </div>}
                    </div>
                    {/* <div className="itemWallet">
                        {props.depositWallet && <div className="itemDepositWallet">
                            <div className="walletTitle">Deposit Wallet</div>
                            <div className="depositWallet">{props.depositWallet}</div>
                        </div>}
                        {
                        props.itemTxID &&
                        <div className="itemTxIDContent">
                            <div className="itemTxIDTitle">TxID</div>
                            <div className="itemTxID">{props.itemTxID}</div>
                            <CopyToClipboard text={props.itemTxID}>
                                <img src="../image/icon_copy.svg" alt="" className="icon_copy" onClick={() => props.onClickCopyBtn(props.itemTxID)} />
                            </CopyToClipboard>
                        </div>}
                    </div> */}

                </div>


            </div>
        </div>
    );
}