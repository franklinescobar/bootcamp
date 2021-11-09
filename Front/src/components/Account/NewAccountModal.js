
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Modal from 'react-bootstrap/Modal';

import AuthContext from '../../context/auth-context';
import { useState, useRef, useContext,useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Container, Row, Col, Card, Form, Button, Spinner, ListGroup } from 'react-bootstrap';
//import {GetRequest} from './GetCurrencies';
import Select from 'react-select';
import Dashboard from '../Dashboard/Dashboard';
function NewAccountModal(props) {
  
  const [show, setShow] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currencies, setCurrencies] = useState([]);
  const [accountTypes, setAccountTypes] = useState([]);
  const [userAccounts, setUserAccounts] = useState([]);
  const authCtx = useContext(AuthContext);
  const [error, setError] =  useState('');
  const [disabledSubmit, setDisableSubmit] = useState(false);
  const accountRef = useRef();
  const currencyRef = useRef();
  const descriptionRef = useRef();
   const history = useHistory();

   const tipoDeCuentaRef = useRef();
   const monedaRef = useRef();
  
   const listUserAccounts = async () => {
    const idToken = await authCtx.currentUser.getIdToken();
    let response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/account`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${idToken}`
      }
    });
    let accounts = await response.json();
    return accounts;
  }

   useEffect(() => {
    const getCurrenciesAndAccounTypes = async () => {
      const idToken = await authCtx.currentUser.getIdToken();
      let response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/currency`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${idToken}`
        }
      });
      let currencies = await response.json();
      response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/account-type`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${idToken}`
        }
      });
      let accountTypes = await response.json();
      setCurrencies(currencies.data);
      setAccountTypes(accountTypes.data);
    }
    getCurrenciesAndAccounTypes();

    const getAllUserAccounts = async () => {
       const accounts = await listUserAccounts();
       setUserAccounts(accounts.data);
    }
    getAllUserAccounts();

  }, []);


  const accountTypesOptions = accountTypes.map((option) => <option key={option.account_type} value={option.account_type}>{option.description}</option>);
  const currenciesOptions = currencies.map((option) => <option key={option.currency} value={option.currency}>{option.description}</option>);
  const userAccountsList = userAccounts.map((account) => {
    return <ListGroup.Item key={account.account}>
      <h3>{account.description}</h3>
      <p><b>Status:</b>{account.status}, <b>Balance:</b> {account.balance}, <b>Apertura:</b> {account.opendate}</p>
    </ListGroup.Item>;
});

   console.log(authCtx.currentUser.getIdToken());
const [items, setItems] = React.useState([]);
const [itemsArreglados, setItemsArreglados] = React.useState([]);




  const accountMethod = (number,currency,description,account_type) => {
   // const idToken = await authCtx.currentUser.getIdToken();
  //  console.log( "sera idToken?" + idToken);
    return new Promise(async (resolve, reject) => {
        try {

          console.log("ENTRANDO PROMESA DE CREAR CUENTA ")
          const idToken =   await authCtx.currentUser.getIdToken()
         const userId = authCtx.currentUser.uid;

       
        //  const idToken = await credentials.user.getIdToken();
        console.log("vemos el token" +idToken);
          // const response = await fetch(`http://localhost:3800/account`, {
            let response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/account`, {
                                      method: 'POST',
                                      headers: {
                                       'Authorization': `Bearer ${idToken}`,
                                        'Content-Type': 'application/json'
                                     }
                                     ,body: JSON.stringify({ "number": number, "balance": 0, "description":description, "uid":userId, status:1, "currency":currency ,"account_type": account_type})
         });
            const data = await response.json();
            console.log("MY RESPUESTA" + Object.values(data)[1]);
        var res =     Object.values(data)[1]
           
       console.log( Object.entries(res))
     
            resolve(data);
            Dashboard.push('/');
            window.location.reload();
           
        } catch(e) {
          reject(e);
        }
    });
    
    
  }

  const monedasMethod = () => {
    // const idToken = await authCtx.currentUser.getIdToken();
   //  console.log( "sera idToken?" + idToken);
     return new Promise(async (resolve, reject) => {
         try {
 
 
           const idToken =   await authCtx.currentUser.getIdToken()
          const userId = authCtx.currentUser.uid;
 
        
         //  const idToken = await credentials.user.getIdToken();
         console.log("ENTRANDO A OBTENER MONEDAS" +idToken);

      //    const response =   await   fetch('http://localhost:3800/currency', {
      // //   //   // mode: 'no-cors',
      //      method: 'GET',
      //       headers: {
      //        Accept: 'application/json',
      //       'Authorization': `Bearer ${idToken}`,
      //        'Content-Type': 'application/json'
      //     },
      //   },
      //     ).then(response => {
      //       if (response.ok) {
      //       response.json().then(json => {
      //          console.log(  +setItems(json));
      //        });
      //       }
      //     });



              //           const result = Object.values(items);
              // var array1= Object.entries(items);
              // console.log(result[1]);

              // var arrayDatos =result[1];

              // const object = Object.values(result[1])
              // for (const property in object) {
              //   console.log(`${property}: ${object[property]}`);
              //   console.log('+>>'+ Object.values(object[property]));
              // }

              // var result2222 = object.map(a => a.currency );

              // var esto = object.map(d => ({
              //   "label" : d.description,
              //   "value" : d.currency
              // }))


          // setItemsArreglados(esto);


        //  let users = [];
        //  fetch('http://localhost:3800/currency', {
        //   //   // mode: 'no-cors',
        //     method: 'GET',
        //      headers: {
        //        Accept: 'application/json',
        //        'Authorization': `Bearer ${idToken}`,
        //        'Content-Type': 'application/json'
        //      },
        //  },
        //    ).then((res) => res.json())
        //    .then((data) => {
        //      console.log("VDA " + data);
        //    });


        //  console.log("Mis monedas response" + response);
        //      const response = await fetch(`http://localhost:3800/currency`, {
        //                                 method: 'GET',
        //                                 headers: {
        //                                  'Authorization': `Bearer ${idToken}`,
        //                                   'Content-Type': 'application/json'
        //                                }
                                     
        //    });
        //       const data = await response.json();
        //       console.log("Mis monedas response" + response);
        //       console.log("Mis monedas" + data);

          //    console.log( "MY JSON" + JSON.parse(data));
          //    resolve(data);
          //    history.push('/');
            
         } catch(e) {
           reject(e);
         }
     });
     
     
   }


  const handleSubmitAccount = async (e) => {

    e.preventDefault();
    // if(accountRef.current.value !== passwordConfirmRed.current.value) return setError('Passwords not maching...');



    try {
      setError('');
      setDisableSubmit(true);


// await monedasMethod();


if(tipoDeCuentaRef.current.value === '') return;
if(monedaRef.current.value === '') return;
    setDisableSubmit(true);

   // const description = nombreCuentaRef.current.value;
    const account_type = Number(tipoDeCuentaRef.current.value);
    const currency = Number(monedaRef.current.value);
      await accountMethod(accountRef.current.value, currency, descriptionRef.current.value, account_type);
      history.push('/');
      window.location.reload();
    } catch {
      setError('Fail to create user');
    }


   // this.props.onHide;
   setIsModalVisible(false);
 // this.handleCloseModal()
  }
  


    return (
      <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
        New Account Form
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
        <Form onSubmit={handleSubmitAccount} >
          <Form.Group id="texts">
              <Form.Label>Account Number</Form.Label>
              <Form.Control type="text"  ref={accountRef} required/>
            </Form.Group>
             {/* <Form.Group id="texts">
              <Form.Label>Currency</Form.Label>
              <Form.Control type="text"  ref={ currencyRef}   required/>
            </Form.Group>  */}
            <Form.Group id="comments">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea"  ref={ descriptionRef} rows={3} required/>
            </Form.Group>

            {/* <Form.Group id="texts">
              <Form.Label> Moneda</Form.Label>
            <Select options={itemsArreglados} />  
            </Form.Group> */}

            <Form.Group as={Col} controlId="formGridState">
                      <Form.Label>Currency</Form.Label>
                      <Form.Select ref={monedaRef} Required>
                        <option value=''>Seleccione una opción</option>
                        {currenciesOptions}
                      </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridState">
                      <Form.Label>Tipo de cuenta</Form.Label>
                      <Form.Select ref={tipoDeCuentaRef} Required>
                        <option value=''>Seleccione una opción</option>
                        {accountTypesOptions}
                      </Form.Select>
                    </Form.Group>
            <Button         disabled={disabledSubmit}   className="w-100 mt-3" 
              type="submit"onClick={handleClose} >Save</Button>

                 {/* <Button 
                disabled={disabledSubmit}
                className="w-100 mt-3" 
                type="submit" onClick={handleClose} >Save</Button> */}
                  {/* <GetRequest /> */}
                  {/* <ListGroup>MYS CUENTAS
            { userAccountsList }
          </ListGroup> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  export default NewAccountModal
