

import { useState, useRef, useContext,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import AuthContext from '../../context/auth-context';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Card, Form, Alert} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
function NewCategoryModal(props) {
  const [categories, setCategories] = useState([]);
   const authCtx = useContext(AuthContext);
   const categoryRef = useRef();
   const descriptionRef = useRef();
   const categoryTypeRef = useRef();
   const category2Ref = useRef();
   const [disabledSubmit, setDisableSubmit] = useState(false);
   const [error, setError] =  useState('');
  useEffect(() => {
    const getCategories = async () => {

      console.log("entrando a obtener caegorias");
      const idToken = await authCtx.currentUser.getIdToken();
    //  let response = await fetch(`http://localhost:3800/category`, {
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


  const categoryMethod = (description,categorytype,category2) => {
    // const idToken = await authCtx.currentUser.getIdToken();
   //  console.log( "sera idToken?" + idToken);
     return new Promise(async (resolve, reject) => {
         try {
 
           console.log("entrando a insertar category ")
           const idToken =   await authCtx.currentUser.getIdToken()
          const userId = authCtx.currentUser.uid;
 
        
         //  const idToken = await credentials.user.getIdToken();
         console.log("vemos el token" +idToken);
            const response = await fetch(`http://localhost:3800/category`, {
                                       method: 'POST',
                                       headers: {
                                        'Authorization': `Bearer ${idToken}`,
                                         'Content-Type': 'application/json'
                                      }
                                      ,body: JSON.stringify({ "description": description, "idcategory": categorytype, "categorytype" :category2})
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



   const handleSubmitCategory = async (e) => {
    console.log("EMPEZANDO A INSERTAR CATEGORY")
    //  console.log("selected " + categoryRef.current.select.inputRef.)
    e.preventDefault();
    // if(accountRef.current.value !== passwordConfirmRed.current.value) return setError('Passwords not maching...');



    try {
      setError('');
      setDisableSubmit(true);


//console.log("SELECTED IS " + value);



    setDisableSubmit(true);

   // const description = nombreCuentaRef.current.value;
   const category2 = Number(categoryRef.current.value);
      await categoryMethod(descriptionRef.current.value,categoryTypeRef.current.value, category2);
     // history.push('/');
      window.location.reload();
    } catch {
      setError('Fail to create user');
    }

  }
  

  
    return (
      <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
           New Category Form
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
        <Form  onSubmit={handleSubmitCategory}>
          <Form.Group id="texts">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text"  ref={descriptionRef}   required/>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridState">
                      <Form.Label>Category Type</Form.Label>
                      <Form.Select ref={categoryTypeRef}  required >
                        <option value=''>Seleccione un tipo</option>
                        <option value='INCOME'>INCOME</option>
                        <option value='EXPENSE'>EXPENSE</option>
                      </Form.Select>
                    </Form.Group>
           



            <Form.Group as={Col} controlId="formGridState">
                      <Form.Label>Category(In the destination account)</Form.Label>
                      <Form.Select ref={categoryRef}  required >
                        <option value='0'>Seleccione una categoria</option>
                        {categoriesOptions}
                      </Form.Select>
                    </Form.Group>


            <Button         className="w-100 mt-3" 
              type="submit">Save</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  export default NewCategoryModal
