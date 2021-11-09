import { useState, useRef, useContext,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Card, Form, Alert} from 'react-bootstrap';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useHistory } from 'react-router-dom';
import { categories } from "../data/data";
import AuthContext from '../../context/auth-context';
import Select from 'react-select';
function NewTransactionModal(props) {
  const authCtx = useContext(AuthContext);
  const categoryRef = useRef();
  const [disabledSubmit, setDisableSubmit] = useState(false);
  const [error, setError] =  useState('');
  const  destinationAccountRef  = useRef();
  const  accountNumberRef  = useRef();
  const  amountRef  = useRef();
  const  commentRef  = useRef();
  const history = useHistory();
  const [categories, setCategories] = useState([]);
  const [value,setValue]=useState('');
  const handleSelect=(e)=>{
    console.log(e);
    setValue(e)
  }

  function handleChange(e) {
    //console.log("FRANKLIN LOG" + e.target.innerHTML);
    const {options, selectedIndex} = e.target;
    console.log(options[selectedIndex].innerHTML);
    //setValue( e.target.value)

    setValue(options[selectedIndex].innerHTML)
  }
 const [valueSelect, setValueSelect] = useState('');
 const changeHandler = value => {
  setValue(value)
};
 


  useEffect(() => {
    const getCategories = async () => {

      console.log("entrando a obtener caegorias");
      const idToken = await authCtx.currentUser.getIdToken();
     // let response = await fetch(`http://localhost:3800/category`, {
        let response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/category`, {
        
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${idToken}`
        }
      });
      let categories = await response.json();
      console.log("categories a categories categories"+categories);
      setCategories(categories.data);

    }
    getCategories();
  

  

  }, []);

  const categoriesOptions = categories.map((option) => <option key={option.id} value={option.id}>{option.description}</option>);


  const handleSubmitTransaction = async (e) => {
    console.log("EMPEZANDO A INSERTAR TRANSACCION")
    //  console.log("selected " + categoryRef.current.select.inputRef.)
    e.preventDefault();
    // if(accountRef.current.value !== passwordConfirmRed.current.value) return setError('Passwords not maching...');



    try {
      setError('');
      setDisableSubmit(true);


console.log("SELECTED IS " + value);


if(categoryRef.current.value === '') return setError('Passwords not maching...');
if(destinationAccountRef.current.value === '') return setError('Destination Account is required...');
if(amountRef.current.value === '') return setError('Amount is required...');







    setDisableSubmit(true);

   // const description = nombreCuentaRef.current.value;
    const category = Number(categoryRef.current.value);
    const destinationAccount = (destinationAccountRef.current.value);

    const ammount = Number(amountRef.current.value);
    console.log("CATEGORIA SELECCIONADA ES " +  category);

      await transactionMethod(accountNumberRef.current.value, category,destinationAccount, ammount, "commentRef.current.value");
      history.push('/');
      window.location.reload();
    } catch {
      setError('Fail to create user');
    }



  // setIsModalVisible(false);

  }
  

  const transactionMethod = (accountNumber,category,destinationAccount,amount,comment) => {
    // const idToken = await authCtx.currentUser.getIdToken();
   //  console.log( "sera idToken?" + idToken);
     return new Promise(async (resolve, reject) => {
         try {
 
           console.log("entrando a insertar transaccion ")
           const idToken =   await authCtx.currentUser.getIdToken()
          const userId = authCtx.currentUser.uid;
 
        
         //  const idToken = await credentials.user.getIdToken();
         console.log("vemos el token" +idToken);
            const response = await fetch(`http://localhost:3800/transaction`, {
                                       method: 'POST',
                                       headers: {
                                        'Authorization': `Bearer ${idToken}`,
                                         'Content-Type': 'application/json'
                                      }
                                      ,body: JSON.stringify({ "account_number": accountNumber, "destination_account": destinationAccount, "amount":amount, "category":category, "category_description" :value})
          });
             const data = await response.json();
             console.log("respuesta de insertar transaccion node. " + Object.values(data)[1]);
         var res =     Object.values(data)[1]
            
        console.log( Object.entries(res))
      
             resolve(data);
             //Dashboard.push('/');
           //  account_number, destination_account, amount, previus_balance, balance, client, transaction_date, currency, category_id
         } catch(e) {
           reject(e);
         }
     });
     
     
   }

  // const propertyNames = Object.entries(Countries);
    return (
      <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
        New Transaction for: {props.accountIs}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">      
        <Form  onSubmit={handleSubmitTransaction}>
          <Form.Group id="texts">
              <Form.Label>Origin Account Number</Form.Label>
              <Form.Control type="text" value={props.accountIs} readOnly  required ref={accountNumberRef}/>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridState">
                      <Form.Label>Category</Form.Label>
                      <Form.Select ref={categoryRef} onChange={handleChange}  required >
                        <option value=''>Seleccione una categoria</option>
                        {categoriesOptions}
                      </Form.Select>
                    </Form.Group>
        
              {/* <select className="form-control" id="exampleFormControlSelect1">
      <option>Movement between my accounts</option>
      <option>Tax Payment</option>
      <option>Credit to External Account</option>
      <option>Recharge</option>
      <option>Electricity Payment</option>
    </select> */}

    {/* <DropdownButton
      alignRight
      title="Dropdown right"
      id="dropdown-menu-align-right"
      onSelect={handleSelect}
      onChange={handleChange}
        > */}
            {/* <select>
      {items.map(item => (
        <option
          key={item.value}
          value={item.value}
        >
          {item.label}
        </option>
      ))}
    </select> */}
          {/* <Select options={propertyNames} value={valueSelect} onChange={changeHandler} /> */}
           {/* <Select options={Countries} />  */}

              {/* <Dropdown.Item eventKey="option-1">Movement between my accounts</Dropdown.Item>
              <Dropdown.Item eventKey="option-2">Tax Payment</Dropdown.Item>
              <Dropdown.Item eventKey="option-3">Credit to External Account</Dropdown.Item>
             
              <Dropdown.Item eventKey="some link">Recharge</Dropdown.Item> */}
      {/* </DropdownButton> */}
     
            {/* <Form.Group id="texts">
              <Form.Label> Type</Form.Label>
              <select className="form-control" id="exampleFormControlSelect1">
      <option>Income</option>
      <option>Expense</option>

    </select>
            </Form.Group> */}
            
            <Form.Group id="texts">
              <Form.Label>Destination Account Number</Form.Label>
              <Form.Control type="text"  ref={destinationAccountRef} required/>
            </Form.Group>
            <Form.Group id="texts">
              <Form.Label ><div> Amount  <h4>{props.SymbolCurrency} </h4></div>  </Form.Label>
              <Form.Control type="number" step="0.01"  ref={amountRef} required/>
            </Form.Group>




         
            {/* <Form.Group id="comments">
              <Form.Label>Comment</Form.Label>
              <Form.Control as="textarea"    ref={commentRef} rows={3} required/>
            </Form.Group> */}
            <Button 
             
              className="w-100 mt-3" 
              type="submit">Save</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  export default NewTransactionModal
