import React, { useState, useEffect } from 'react';
import { useTable, usePagination } from 'react-table'
import Header from '../components/Header';
import SideBar from '../components/Sidebar';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setSetting } from '../actions/projectSetting';
// dev
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../translations/i18n";
import setAuthToken from '../utils/setAuthToken';

function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
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
            columns,
            data,
            initialState: { pageIndex: 0 },
        },
        usePagination
    )

    // Render the UI for your table
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
            <table {...getTableProps()}>
                <thead>
                    <tr className="table-header">
                        <th>Time</th>
                        <th>Email</th>
                        <th>Asset</th>
                        <th>Invest Amount</th>
                        <th>3% Bonus</th>
                    </tr>
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        return (
                            <tr key={i}>
                                <td className="column-time">{row.original["created_at"]}</td>
                                <td className="column-email">{row.original["email"]}@***</td>
                                <td className="column-asset">{row.original["currency"]}</td>
                                <td className="column-investAmount">{row.original["amount"]}</td>
                                <td className="column-bonus">{row.original["reward"]}</td>
                            </tr>
                        )

                    })}
                </tbody>
            </table>
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
function Affiliation(props) {
    const [isDay, setIsDay] = useState(props.projectSetting.isDay);
    const [sideBarShow, setSideBarShow] = useState(false);
    const onSetDayStatus = () => {
        let tempDay = isDay;
        setIsDay(!tempDay);
        props.setSetting(!tempDay);
    }
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
    
    const onClickSideBarShow = () => {
        setSideBarShow(!sideBarShow);
    }
    // dev
    const { t } = useTranslation();
    const token  = localStorage.getItem('slamtoken');
    let wallet_address = '';
    const [id, setId] = useState(0);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [totalAffiliation, setTotalAffiliation] = useState(0);
    const [data, setData] = useState([]);
    const history = useHistory();

    async function fetchdata(){
        const res = await axios.post(process.env.REACT_APP_SLAMBACKEND+'api/token', {token:token});
        
        if(res.data.status === 'success'){
            wallet_address = res.data.address;
            setId(res.data.id);
            setEmail(res.data.email);
            setPhone(res.data.phone);
        }else{
            setAuthToken('');
            localStorage.setItem('isLogin', '');
            history.push('/login');
        }
    }

    async function fetchAffiliationData () {
        axios.post(process.env.REACT_APP_SLAMBACKEND+'api/getAffiliations', {token: token})
        .then(res => {
            setData(res.data.refers)
            setTotalAffiliation(res.data.totalAffiliation);
        })
    }

    useEffect(() => {
        fetchdata();
        fetchAffiliationData();
    }, [])

    return (
        <div className={!isDay ? "NightMode" : ""}>
            <Header onClickSideBarShow={onClickSideBarShow} sideBarShow={sideBarShow} onSetDayStatus={onSetDayStatus} isDay={isDay} />

            <div className="content AffiliationComponent">
                <SideBar page="Affiliation" sideBarShow={sideBarShow} isDay={isDay} 
                    onSetDayStatus={onSetDayStatus}
                    sideBarShow={sideBarShow} 
                    userId={id} 
                    userEmail={email} 
                    userPhone={phone}
                />
                <div className="main-content ">
                    <div className="automargin_content">
                        <p className="title">Affiliation</p>
                        <div className="affiliation">
                            <Table columns={columns} data={data} />
                            <div className="bottom">
                                <div className="total">Total Affiliation</div>
                                <div className="total_value">0 $SLM</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Affiliation.propTypes = {
    projectSetting: PropTypes.object.isRequired,
    setSetting: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    projectSetting: state.projectSetting
});

export default connect(mapStateToProps, { setSetting })(
    Affiliation
);