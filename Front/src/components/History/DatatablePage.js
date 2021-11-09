import React from 'react';
import { MDBDataTable } from 'mdbreact';
import { useState, useRef, useContext,useEffect } from 'react';
import AuthContext from '../../context/auth-context';
import { Container, Row, Col, Card, Form, Button, Spinner, ListGroup } from 'react-bootstrap';
const DatatablePage = (props) => {
const authCtx = useContext(AuthContext);
  const [userAccounts, setUserAccounts] = useState([]);
  const [accountTypes, setAccountTypes] = useState([]);




  useEffect(() => {
    const getAllUserAccounts = async () => {
       const accounts = await listUserAccounts();
       setUserAccounts(accounts.data);
      // console.log( userAccounts);
    }
    getAllUserAccounts();

    console.log("EN HORA BUENA EL ID ES " + props.accountId2 );
  }, []);

  const listUserAccounts = async () => {
    const idToken = await authCtx.currentUser.getIdToken();
    let response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/transaction/`+props.accountId2, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${idToken}`
      }
    });
    let accounts = await response.json();

    // var  oo=  Object.entries(accounts.data)

     setAccountTypes(Object.values(accounts)[1]);
     console.log("MY RESPUESTA " + Object.values(accounts)[1]); 
     console.log( Object.values(accounts)[1]); 
     console.log("HOY SI " + accounts.data);
     console.log( "types " + accountTypes);
    return accounts;
  }

  const userAccountsList = userAccounts.map((account) => {
    return <ListGroup.Item key={account.account}>
      <h3>{account.description}</h3>
      <p><b>Status:</b>{account.status}, <b>Balance:</b> {account.balance}, <b>Apertura:</b> {account.opendate}</p>
    </ListGroup.Item>;
});



//console.log("types" + accountTypes);
const data = {
  columns: [
    {
      label: 'id',
      field: 'id',
      sort: 'asc',
      width: 150
    },
    // {
    //   label: 'Account',
    //   field: 'account',
    //   sort: 'asc',
    //   width: 270
    // },
    {
      label: 'Destination Account',
      field: 'destinationaccount',
      sort: 'asc',
      width: 200
    },
    {
      label: 'Movement Type',
      field: 'movementtype',
      sort: 'asc',
      width: 100
    },
    {
      label: 'Amount',
      field: 'amount',
      sort: 'asc',
      width: 150
    },
    {
      label: 'Previus Balance',
      field: 'previusbalance',
      sort: 'asc',
      width: 150
    },
    {
      label: 'Balance',
      field: 'balance',
      sort: 'asc',
      width: 100
    }
    ,
    {
      label: 'Date',
      field: 'transaction_date',
      sort: 'asc',
      width: 100
    }
    // ,
    // {
    //   label: 'Currency',
    //   field: 'currency',
    //   sort: 'asc',
    //   width: 100
    // }
  ],
    rows: 
      accountTypes
  
};

return (
<>
{/* <p>soy yo{props.accountId2}</p> */}
  <MDBDataTable  striped bordered small order={['id', 'asc' ]} data={data} />
  </>
  );
}

export default DatatablePage;

// {
//   id: '1',
//   Account: '123456',
//   DestinationAccount: '999999',
//   MovementType: 'Expense',
//   Amount: "-$100",
//   PreviusBalance: '-$1,000',
//   Balance: '$800',
// },
// {
//   id: '2',
//   Account: '123456',
//   DestinationAccount: '999999',
//   MovementType: 'Income',
//   Amount: "-$100",
//   PreviusBalance: '$1,000',
//   Balance: '$10,000',
// },
// {
//   id: '3',
//   Account: '123456',
//   DestinationAccount: '999999',
//   MovementType: 'Income',
//   PreviusBalance: '$1,000',
//   Balance: '$10,000',
// },
// {
//   id: '4',
//   Account: '123456',
//   DestinationAccount: '999999',
//   MovementType: 'Expense',
//   Amount: "-$100",
//   PreviusBalance: '-$1,000',
//   Balance: '$10,000',
// }