import React, { useState, useEffect } from "react";
import { useTable, usePagination } from 'react-table'
import Header from '../components/Header';
import SideBar from '../components/Sidebar';

import TransactionItem from "../components/transactionItem";

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setSetting } from '../actions/projectSetting';

//dev
import '../translations/i18n';
import axios from 'axios';
import { useHistory } from "react-router-dom";

function TransactionPagination(props) {
    const {
        getTableBodyProps,
        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page

        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns: props.columns,
            data: props.data,
            initialState: { pageIndex: 0 },
        },
        usePagination
    )
    return (
        <>
            <select
                value={pageSize}
                onChange={e => {
                    setPageSize(Number(e.target.value))
                }}
            >
                {[10, 20, 30, 40, 50].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                    </option>
                ))}
            </select>
            <div {...getTableBodyProps()}>
                {page.map((row, i) => {
                    return (
                        <div className="transaction-items" key={i}>
                            <TransactionItem 
                                status={row.original["status"]}
                                method={row.original["method"]}
                                tokenType={row.original["asset"]} 
                                tokenName={row.original["amount"]+" "+row.original["asset"]} 
                                itemDate={row.original["created_at"]} 
                                itemNetwork={row.original["itemNetwork"]} 
                                // itemAddress={row.original["address"]} 
                                itemTxID={row.original["itemTxID"]} 
                                depositWallet={row.original["depositWallet"]} 
                                onClickCopyBtn={props.onClickCopyBtn} 
                            />
                        </div>
                    )

                })}
            </div>
            {/* 
          Pagination can be built however you'd like. 
          This is just a very basic UI implementation:
        */}
            <div className="pagination">

                <div className="pageControl">
                    <button className="btnfirst" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                        {'First'}
                    </button>
                    <button className="btnprev" onClick={() => previousPage()} disabled={!canPreviousPage}>
                        {'<'}
                    </button>
                    {/* <input
                        type="number"
                        value={pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(page)
                        }}
                        style={{ width: '40px', height: '40px' }}
                    /> */}
                    <div className="pageNum">
                        <span>
                            Page{' '}
                            <strong>
                                {pageIndex + 1} of {pageOptions.length}
                            </strong>{' '}
                        </span>
                    </div>
                    <button className="btnnext" onClick={() => nextPage()} disabled={!canNextPage}>
                        {'>'}
                    </button>
                    <button className="btnlast" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                        {'Last'}
                    </button>
                </div>

            </div>
        </>
    )
}
function Transaction(props) {
    const [isDay, setIsDay] = useState(props.projectSetting.isDay);
    const [showCopied, setShowCopied] = useState(false);
    const [sideBarShow, setSideBarShow] = useState(false);

    const onClickSideBarShow = () => {
        setSideBarShow(!sideBarShow);
    }

    const onSetDayStatus = () => {
        let tempDay = isDay;
        setIsDay(!tempDay);
        props.setSetting(!tempDay);
    }

    useEffect(() => {
        if (showCopied === true) {
            const timer = setInterval(() => {
                setShowCopied(false);
                clearInterval(timer);
            }, 5000);
        }
    }, [showCopied]);
    const columns = React.useMemo(
        () => [

            {
                Header: 'Age',
                accessor: 'age',
            },
            {
                Header: 'Visits',
                accessor: 'visits',
            },
            {
                Header: 'Status',
                accessor: 'status',
            },
            {
                Header: 'Profile Progress',
                accessor: 'progress',
            },
        ]
    )
    
    //dev
    const token  = localStorage.getItem('slamtoken');
    const [id, setId] = useState(0);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [walletAddress, setWalletAddress] = useState('');
    
    // const [totalAffiliation, setTotalAffiliation] = useState(0);
    const [data, setData] = useState([]);
    const history = useHistory();

    useEffect(() => {
        async function fetchdata(){
            const res = await axios.post(process.env.REACT_APP_SLAMBACKEND+'api/token', {token:token});
            if(res.data.status === 'success'){
                setWalletAddress(res.data.address);
                setId(res.data.id);
                setEmail(res.data.email);
                setPhone(res.data.phone);
            }else{
                localStorage.setItem('slamtoken', '');
                localStorage.setItem('isLogin', '');
                history.push('/login');
            }
        }
        
        async function fetchTranHist() {
            const res = await axios.post(process.env.REACT_APP_SLAMBACKEND+'api/transaction', {token:token, wallet_address: walletAddress});
            if(res.data.status === 'success'){
                setData(res.data.transactions);
            }
        }
        
        fetchdata();
        fetchTranHist();
    }, [])

    return (
        <div className={!isDay ? "NightMode" : ""}>
            <Header onClickSideBarShow={onClickSideBarShow} sideBarShow={sideBarShow} onSetDayStatus={onSetDayStatus} isDay={isDay} />

            <div className="content TransactionComponent">
                <SideBar page="Transaction" showCopied={showCopied} 
                    sideBarShow={sideBarShow} isDay={isDay} 
                    onSetDayStatus={onSetDayStatus} 
                    userId={id} 
                    userEmail={email} 
                    userPhone={phone}
                />
                <div className="main-content ">
                    <div className="automargin_content">
                        <p className="title">Transactions</p>
                        <div className="recent-transactions">
                            {/* <p className="title">Recent Transactions</p> */}
                            <TransactionPagination data={data} columns={columns} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Transaction.propTypes = {
    projectSetting: PropTypes.object.isRequired,
    setSetting: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    projectSetting: state.projectSetting
});

export default connect(mapStateToProps, { setSetting })(
    Transaction
);