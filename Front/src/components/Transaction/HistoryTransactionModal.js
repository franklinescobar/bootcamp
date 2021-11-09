import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Card, Form, Alert} from 'react-bootstrap';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import { useState, useRef, useContext,useEffect } from 'react';
import DatatablePage from '../History/DatatablePage';
function HistoryTransactionModal(props) {

  //const [idvalue, setIdValue] = useState();


  // setIdValue(props.accountId);
  // console.log(idvalue);
  return (
      <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Account movements    for:{props.accountIs}  
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
       <DatatablePage  accountId2 = {props.accountId} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    );
  }
  
  export default HistoryTransactionModal
