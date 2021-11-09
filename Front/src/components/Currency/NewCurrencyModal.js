import { Container, Row, Col, Card, Form, Button, Spinner, ListGroup } from 'react-bootstrap';
import { useState, useRef, useContext,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Modal from 'react-bootstrap/Modal';

import AuthContext from '../../context/auth-context';



import Select from 'react-select';
function NewCurrencyModal(props) {
  const authCtx = useContext(AuthContext);
  const [userAccounts, setUserAccounts] = useState([]);

  const Currencies = [
    { label: "USD", value: 1 },
    { label: "Colon", value: 54 },
    { label: "Cordoba", value: 43 },
    { label: "Euro", value: 61 }
  ];


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
      <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
           Exchanges
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
        <Form >
          <Form.Group id="texts">
              <Form.Label>List of currencies and exchanges</Form.Label>
            </Form.Group>
            {/* <Form.Group id="texts">
              <Form.Label> Currency</Form.Label>
            <Select options={Currencies} /> 
            </Form.Group> */}
            <ListGroup>
            { userAccountsList }
          </ListGroup>
            {/* <Button         className="w-100 mt-3" 
              type="submit">Save</Button> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  export default NewCurrencyModal
