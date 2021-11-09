
import Button from 'react-bootstrap/Button';
import NewTransactionModal from '../Transaction/NewTransactionModal.js';
import React, { useState } from "react"
const About = () => {
  const [transactionModalShow, setTransactionModalShow] = useState(false);
  return (
<>
  <Button variant="primary" onClick={() => setTransactionModalShow(true)}>
    Launch modal with grid.
  </Button>

  <NewTransactionModal show={transactionModalShow} onHide={() => setTransactionModalShow(false)} />
</>)
}

export default About;
