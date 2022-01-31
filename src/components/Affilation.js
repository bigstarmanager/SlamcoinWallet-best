import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { Icon, Label, Menu, Table } from 'semantic-ui-react'
import { useParams, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import './../translations/i18n';

export default function Affiliation({childToParent}){
    const { t } = useTranslation();
    let wallet_address = '';
    const [transactions, setTransactions] = useState([]);
    const [totalAffiliation, setTotalAffiliation] = useState(0);
    const [refers, setRefers] = useState([]);
    const history = useHistory();

    useEffect(()=> {
        const token  = localStorage.getItem('slamtoken');
        
        async function fetchdata(){
            const res = await axios.post(process.env.REACT_APP_SLAMBACKEND+'api/token', {token:token});
            if(res.data.status === 'ok'){
                wallet_address = res.data.address;
                childToParent(res.data)
            }else{
                localStorage.setItem('slamtoken', '');
                localStorage.setItem('isLogin', '');
                history.push('/');
            }
        }

        async function fetchAffiliationData () {
            axios.post(process.env.REACT_APP_SLAMBACKEND+'api/getAffiliations', {token: token})
            .then(res => {
                setRefers(res.data.refers)
                setTotalAffiliation(res.data.totalAffiliation);
            })
        }
        
        fetchdata();
        fetchAffiliationData();
    }, [])
    
    return (
        <div className="row main">
            <div className="col-lg-12 col-md-12 main-content" style={{height: '100vh'}}>
                <div className="mobile"><i className="fa fa-bars"></i></div>
                <h3 className="transaction-title text-left">{t('Affiliations')}</h3>
                {/* <p className="all-yours text-center">All of Your Affiliations</p> */}
                {/* <a className="reports" href>Doanload reports</a> */}
                <div className="transaction-table">
                    {/* <hr/> */}
                    <div className="table-responsive trans-table">
                        {/* <p className="update-transaction"> Updated Table 
                            <span className="refresh">
                                <img src="image/refresh.png" className="refresh-img" alt=""/>
                            </span>
                        </p> */}
                        <p className="update-transaction"> {t('Total')} {t('Affiliations')}: {totalAffiliation} $SLM </p>
                        <Table celled>
                            <Table.Header>
                                <Table.Row role="row">
                                    <Table.HeaderCell>{t('Time')}</Table.HeaderCell>
                                    <Table.HeaderCell>{t('Email')}</Table.HeaderCell>
                                    <Table.HeaderCell>{t('Asset')}</Table.HeaderCell>
                                    <Table.HeaderCell>{t('InvestAmount')}</Table.HeaderCell>
                                    <Table.HeaderCell>3% {t('Bonus')}</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                            {refers.length > 0 && refers.map((transaction, key) => {
                                return  <Table.Row key={key}>
                                            <Table.Cell>{transaction.created_at}</Table.Cell>
                                            <Table.Cell>{transaction.email}@***</Table.Cell>
                                            <Table.Cell>{transaction.currency}</Table.Cell>
                                            <Table.Cell>{Math.abs(parseFloat(transaction.amount).toFixed(3))}</Table.Cell>
                                            <Table.Cell>{transaction.reward}</Table.Cell>
                                        </Table.Row>
                                }
                            )}
                            </Table.Body>
                        </Table>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}