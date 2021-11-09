
import { MDBCard, MDBCardTitle, MDBCardText, MDBContainer,MDBBtn  } from "mdbreact";
//import Toggle from './Toggle/Toggle.js';
import {  MDBRow, MDBCol } from "mdbreact";
import Button from 'react-bootstrap/Button';
import NewAccountModal from '../Account/NewAccountModal.js';
import NewCategoryModal from '../Category/NewCategoryModal.js';
import NewCurrencyModal from '../Currency/NewCurrencyModal.js';
import React from "react"
import { useContext, useState, useEffect, useRef } from 'react';
import Stocks from './Stocks.js';
import "./Dashboard.css";
import AuthContext from '../../context/auth-context'
import { Container, Row, Col, Card, Form, Spinner, ListGroup } from 'react-bootstrap';
const Dashboard = () => {
  const authCtx = useContext(AuthContext);
  const [accountModalShow, setAccountModalShow] = useState(false);
  const [currencyModalShow, setCurrencyModalShow] = useState(false);
  const [categoryModalShow, setCategoryModalShow] = useState(false);
  const [transactionModalShow, setTransactionModalShow] = useState(false);
  const [historyTransactionModalShow, setHistoryTransactionModalShow] = useState(false);
  const [userAccounts, setUserAccounts] = useState([]);
  console.log(  authCtx.currentUser);
  useEffect(() => {
    
    //   getCurrenciesAndAccounTypes();
    console.log("entrando a obtener exchanges");
       const getAllUserAccounts = async () => {
          const accounts = await listUserAccounts();
          setUserAccounts(accounts.data);
       }
       getAllUserAccounts();
   
     }, []);
   
     const listUserAccounts = async () => {
       const idToken = await authCtx.currentUser.getIdToken();
       let response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/exchange`, {
         method: 'GET',
         headers: {
           'Authorization': `Bearer ${idToken}`
         }
       });
       let accounts = await response.json();
       return accounts;
     }
   
   
     const userAccountsList = userAccounts.map((exchange) => {
       return <ListGroup.Item key={exchange.account}>
         <h3>{exchange.from_currency}</h3>
         <p><b>From Currency:</b>{exchange.from_currency}   <b>To Currency:</b> {exchange.to_currency} <b>Rate:</b> {exchange.rate}</p>
       </ListGroup.Item>;
   });

return (
  <>
    <header className="headerfra">
      <h2>Dashboard</h2>
    </header>
  <MDBRow>
  <MDBCol>
    <img src="https://bestmarket.com.ng/wp-content/uploads/2020/05/comercial-bank-1.jpg" alt="thumbnail" className="img-thumbnail" />
    <h2>Golden Bank</h2>
  </MDBCol>
 <MDBCol>    <Stocks/>
  {/* <MDBContainer>
 
  <MDBCard className="card-body" style={{ width: "22rem", marginTop: "1rem" }}>
  
    <MDBCardTitle>Account #999999 Balance</MDBCardTitle>
    <MDBCardText>
    <h1>Total $: 1,500</h1>
    </MDBCardText>
    <div className='custom-control custom-switch'>
        <input
          type='checkbox'
          className='custom-control-input'
          id='customSwitches'
          readOnly
        />
        <label className='custom-control-label' htmlFor='customSwitches'>
           Active
        </label>
      </div>
      <br/>
    <div className="flex-row">
    <Button variant="success" onClick={() => setHistoryTransactionModalShow(true)}>Show Transactions</Button>
  <HistoryTransactionModal show={historyTransactionModalShow} onHide={() => setHistoryTransactionModalShow(false)} />
      <Button variant="primary" onClick={() => setTransactionModalShow(true)}>New Movement</Button>
  <NewTransactionModal show={transactionModalShow} onHide={() => setTransactionModalShow(false)} />
    </div>
  </MDBCard>
</MDBContainer>
</MDBCol>
<MDBCol>
<MDBContainer>
  <MDBCard className="card-body" style={{ width: "22rem", marginTop: "1rem" }}>
    <MDBCardTitle>Account #123456 Balance</MDBCardTitle>
    <MDBCardText>
      <h1>Total $: 12,500</h1>
    </MDBCardText>
    <div className='custom-control custom-switch'>
        <input
          type='checkbox'
          className='custom-control-input'
          id='customSwitches'
          readOnly
        />
        <label className='custom-control-label' htmlFor='customSwitches'>
           Active
        </label>
      </div>
      <br/>
     
    
    <div className="flex-row">
    <Button variant="success" onClick={() => setTransactionModalShow(true)}>
      Show Transactions
  </Button>
  <NewAccountModal show={transactionModalShow} onHide={() => setTransactionModalShow(false)} />
 <Button variant="primary" onClick={() => setTransactionModalShow(true)}>New Movement</Button>
    <NewTransactionModal show={transactionModalShow} onHide={() => setTransactionModalShow(false)} />

   
    </div>
  </MDBCard>

</MDBContainer> */}

   </MDBCol>

   <MDBCol>
<MDBContainer>
  <MDBCard className="card-body" style={{ width: "22rem", marginTop: "1rem" }}>
    <MDBCardTitle>Accounts</MDBCardTitle>
    <MDBCardText>
    <Button variant="secondary" onClick={() => setAccountModalShow(true)}>
      New Account
  </Button>
  <NewAccountModal show={accountModalShow} onHide={() => setAccountModalShow(false)} />
    </MDBCardText>
  </MDBCard>

  <MDBCard className="card-body" style={{ width: "22rem", marginTop: "1rem" }}>
    <MDBCardTitle>Categories</MDBCardTitle>
    <MDBCardText>
    <Button variant="secondary" onClick={() => setCategoryModalShow(true)}>
      New Category
  </Button>
  <NewCategoryModal show={categoryModalShow} onHide={() => setCategoryModalShow(false)} />
    </MDBCardText>
    {/* <div className="flex-row">
      <a href="#!" style={{ marginLeft: "1.25rem" }}>Create New Category</a>
    </div> */}
  </MDBCard>


  <MDBCard className="card-body" style={{ width: "22rem", marginTop: "1rem" }}>
    <MDBCardTitle>Exchange rates</MDBCardTitle>
    <MDBCardText>
    <ListGroup>
            { userAccountsList }
          </ListGroup>
    {/* <Button variant="secondary" onClick={() => setCurrencyModalShow(true)}>
     Change Currency.
  </Button> */}
  <NewCurrencyModal show={currencyModalShow} onHide={() => setCurrencyModalShow(false)} />
    </MDBCardText>
  </MDBCard>
 
</MDBContainer>
   </MDBCol>


</MDBRow>
  <div className="d-inline-flex p-2 col-example">Franklin Escobar</div>





</ >
);
};
export default Dashboard;