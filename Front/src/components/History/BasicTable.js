import React from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

const BasicTable = () => {
  return (
    <MDBTable>
    <MDBTableHead>
      <tr>
        <th>#</th>
        <th>Account</th>
        <th>Destination Account</th>
        <th>Movement Type</th>
        <th>Amount</th>
        <th>Previus Balance</th>
        <th>Balance</th>
      </tr>
    </MDBTableHead>
    <MDBTableBody>
      <tr>
      <th>1</th>
        <th>123456</th>
        <th>999999</th>
        <th>Income</th>
        <th>$1,000</th>
        <th>$10,000</th>
        <th>$11,000</th>
      </tr>
      <tr>
      <th>2</th>
       <th>123456</th>
        <th>999999</th>
        <th>Expense</th>
        <th>-$500</th>
        <th>$10,000</th>
        <th>$10,500</th>
      </tr>
      <tr>
      <th>3</th>
      <th>123456</th>
        <th>999999</th>
        <th>Income</th>
        <th>$2,000</th>
        <th>$10,500</th>
        <th>$12,500</th>
      </tr>
    </MDBTableBody>
  </MDBTable>
  );
}

export default BasicTable;