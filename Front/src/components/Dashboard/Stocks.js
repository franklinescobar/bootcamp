import { useState, useRef, useContext,useEffect } from 'react';
//import React, { useState } from "react"
import "./Dashboard.css";
import { stockData } from "../data/data";

import { MDBCard, MDBCardTitle, MDBCardText, MDBContainer,MDBBtn  } from "mdbreact";
//import Toggle from './Toggle/Toggle.js';
import {  MDBRow, MDBCol } from "mdbreact";
import Button from 'react-bootstrap/Button';
import {ButtonGroup,ToggleButton} from 'react-bootstrap';
//import NewCurrencyModal from '../Currency/NewCCurrencyModal.js';
import NewTransactionModal from '../Transaction/NewTransactionModal.js';

import HistoryTransactionModal from '../Transaction/HistoryTransactionModal.js';

import "./Dashboard.css";

import AuthContext from '../../context/auth-context';
 const Stocks = () => {
  const authCtx = useContext(AuthContext);
  const [userAccounts, setUserAccounts] = useState([]);
  const [stockData, setstockData] = useState([]);

  const listUserAccounts = async () => {
    const idToken = await authCtx.currentUser.getIdToken();
    let response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/account`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${idToken}`
      }
    });
    let accounts = await response.json();
    

    console.log(">EXITO>"+accounts);

    console.log("MY EXITO" + Object.values(accounts)[1]);
    var res =     Object.values(accounts)[1]
      console.log(stockData);

   console.log( Object.values(res))

   setstockData( Object.values(res));
    return accounts;
  }


  useEffect(() => {
   


    const getAllUserAccounts = async () => {
       const accounts = await listUserAccounts();
       setUserAccounts(accounts.data);
    }
    getAllUserAccounts();

  }, []);




    return (
      <>
        <HomePageHeader />
        <div className="stock-container">
          {stockData.map((data, key) => {
            return (
              <div key={key}>
                     

                  
      <MDBCol>
   
                 <Stock
                  key={key}
                  account={data.account}
                  status={data.status}
                  balance={data.balance}
                  opendate={data.opendate}
                  id={data.id}
                  type={data.type}
                  currency ={data.currency}
                />   
     </MDBCol>

              </div>
            );
          })}
        </div>
      </>
    );
  };
  const HomePageHeader = () => {
    return (
      <header className="header">
        {/* <h2>Your Stock Tracker</h2> */}
      </header>
    );
  };
  const Stock = ({id, account, status, balance, opendate, type , currency}) => {
    const [transactionModalShow, setTransactionModalShow] = useState(false);
    const [historyTransactionModalShow, setHistoryTransactionModalShow] = useState(false);
    const [radioValue, setRadioValue] = useState('1');
    const radios = [
        { name: 'Inactive', value: '1' },
        { name: 'Active', value: '2' },
        // { name: 'Radio', value: '3' },
      ];
 //   console.log("MY CONSOLA"+ id);
//console.log("MY CONSOLA"+ id+ " > " + (id%2));
  var impar = (id%2);
 ////console.log("ES IMPART"+ impar);

  if (id ==1)
  impar =1;
    if (!account) return <div />;

    if (impar==0) return (  <>


       
          <MDBContainer  style={{ 'background-color': 'gray' }}>
          <MDBCard className="card-body"   style={{ width: "52rem", marginTop: "1rem" }}>
          <MDBCardTitle>Account: {account}</MDBCardTitle>
            <MDBCardText>
            <h1>Balance: {currency}{balance}</h1>
            </MDBCardText>
            <div class="row">
  <div class="col-sm-4"><b>Type: </b> {type}</div>
  <div class="col-sm-4"><b>Status: </b> {status}</div>
  <div class="col-sm-4"><b>Open Date: </b> {opendate}</div>
</div>
            <div className='custom-control custom-switch'>
              
{/*             
                  <ButtonGroup>
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant={idx % 2 ? 'outline-success' : 'outline-danger'}
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup> */}
              </div>
              <br/>
            <div className="flex-row">
            <Button variant="primary" onClick={() => setTransactionModalShow(true)}>New transaction</Button> 
         <NewTransactionModal SymbolCurrency = {currency} accountIs = {account} accountId = {id} show={transactionModalShow} onHide={() => setTransactionModalShow(false)} /> 
         <Button variant="success" onClick={() => setHistoryTransactionModalShow(true)}>Show Transactions</Button>
          <HistoryTransactionModal  accountIs = {account} accountId = {id}  show={historyTransactionModalShow} onHide={() => setHistoryTransactionModalShow(false)} />
            </div>
            </MDBCard>
          </MDBContainer> 
     
        </>
        
        );

    return (
        <>



  <MDBContainer  style={{ 'background-color': 'LightGray' }}>
  <MDBCard className="card-body" style={{ width: "52rem", marginTop: "1rem" }}>
  <MDBCardTitle>Account: {account}</MDBCardTitle>
    <MDBCardText>
    <h1>Balance: {currency}{balance}</h1>
    </MDBCardText>
    <div class="row">
  <div class="col-sm-4"><b>Type: </b>  {type} </div>
  <div class="col-sm-4"><b>Status: </b>  {status}</div>
  <div class="col-sm-4"><b>Open Date: </b> {opendate}</div>
</div>
    <div className='custom-control custom-switch'>
    {/* <ButtonGroup>
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant={idx % 2 ? 'outline-success' : 'outline-danger'}
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup> */}
      </div>
      <br/>
    <div className="flex-row">
    <Button variant="primary" onClick={() => setTransactionModalShow(true)}>New transaction</Button> 
 <NewTransactionModal SymbolCurrency = {currency}  accountIs = {account} accountId = {id} show={transactionModalShow} onHide={() => setTransactionModalShow(false)} /> 
 <Button variant="success" onClick={() => setHistoryTransactionModalShow(true)}>Show Transactions</Button>
  <HistoryTransactionModal  accountIs = {account} accountId = {id}  show={historyTransactionModalShow} onHide={() => setHistoryTransactionModalShow(false)} />
    </div>
    </MDBCard>
  </MDBContainer> 

</>


    );
  };
export default Stocks;