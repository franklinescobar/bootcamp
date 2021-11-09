
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import AuthContext from '../../context/auth-context';
import { useState, useRef, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {  Form } from 'react-bootstrap';

import Select from 'react-select';
function GetMonedas(props) {
  
  const [show, setShow] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
   // const response =   await   fetch('http://localhost:3800/currency', {
      let response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/currency`, {
      //   //   // mode: 'no-cors',
           method: 'GET',
            headers: {
             Accept: 'application/json',
            'Authorization': `Bearer ${idToken}`,
             'Content-Type': 'application/json'
          },
        },
          ).then(response => {
            if (response.ok) {
            response.json().then(json => {
               console.log(  +setItems(json));
             });
            }
          });
    document.title = `You clicked ${count} times`;
  });
sdfsdf






    return (
      // options={itemsArreglados}
        <Select  />  
    );
  }
  export default GetMonedas


// render() {
//     const { totalReactPackages } = this.state;
//     return (
//         <div className="card text-center m-3">
//             <h5 className="card-header">Simple GET Request</h5>
//             <div className="card-body">
//                 Total react packages: {totalReactPackages}
//             </div>
//         </div>
//     );