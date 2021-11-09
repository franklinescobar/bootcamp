import { useState, useRef, useContext } from 'react';
import { Card, Form, Button, Alert} from 'react-bootstrap';
import AuthContext from '../../context/auth-context';
import { Link, useHistory } from 'react-router-dom';
const Login = () => {
  const authCtx = useContext(AuthContext);
  const [error, setError] =  useState('');
  const [disabledSubmit, setDisableSubmit] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      setError('');
      setDisableSubmit(true);
      await authCtx.login(emailRef.current.value, passwordRef.current.value);
      history.push('/');
    } catch {
      setError('Fail to create account');
    }
    setDisableSubmit(false);
  }
  
  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{maxWidth: "400px"}}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Login</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required/>
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required/>
              </Form.Group>
            
              <Button 
                disabled={disabledSubmit}
                className="w-100 mt-3" 
                type="submit">LogIn</Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            Need and account? <Link to="/register">Register</Link>
          </div>
      </div>
    </div>
  );
}

export default Login;