import React from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import DataTable from './BasicTable';
import DatatablePage from './DatatablePage';
import { MDBCard, MDBCardTitle, MDBCardText, MDBContainer,MDBBtn  } from "mdbreact";
const History = () => {
  return (
<>
    <div><h1>Account History: 17723456</h1></div>

<DatatablePage></DatatablePage>
<MDBContainer>
  <MDBCard className="card-body" style={{ width: "22rem", marginTop: "1rem" }}>
    <MDBCardTitle>Account #123456 Balance</MDBCardTitle>
    <MDBCardText>
      <h1>Total $: 12,500</h1>
    </MDBCardText>
    <div className="flex-row">
   
    </div>
  </MDBCard>


  
</MDBContainer>

    </ >
  );
}

export default History;