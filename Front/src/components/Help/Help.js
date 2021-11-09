
import Button from 'react-bootstrap/Button';
import MydModalWithGrid from './MydModalWithGrid.js';
import NewAccountModal from '../Account/NewAccountModal.js';
import React, { useState } from "react"
const Help = () => {
  const [modalShow, setModalShow] = useState(false);
  const [accountmodalShow, setAccountModalShow] = useState(false);
  return (
<>
  <Button variant="primary" onClick={() => setModalShow(true)}>
    Launch MydModalWithGrid
  </Button>
  <MydModalWithGrid show={modalShow} onHide={() => setModalShow(false)} />


  <Button variant="primary" onClick={() => setAccountModalShow(true)}>
    Launch New Account Modal
  </Button>
  <NewAccountModal show={accountmodalShow} onHide={() => setAccountModalShow(false)} />



</>)
}

export default Help;

