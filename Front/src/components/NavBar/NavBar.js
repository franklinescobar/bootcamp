import { Navbar, Container, Nav, NavDropdown, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'; 
import { useState, useContext } from 'react';
import AuthContext from '../../context/auth-context';

const NavBar = () => {
  const authCtx = useContext(AuthContext);
  const [error, setError] = useState('');
  const history = useHistory();

  const HandlerLogout = async () => {
    try {
      setError('');
      await authCtx.logout();
      history.push('/register');
    } catch {
      setError('Impossible to scape');
    }
  }

  return (
    <header>
      <Navbar  className="navbar navbar-dark bg-primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Account Application</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* <Nav.Link as={Link} exact to="/">Accounts Overview </Nav.Link> */}
              <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
              {/* <Nav.Link as={Link} to="/history">History</Nav.Link>
              <Nav.Link as={Link} to="/transaction">Transaction</Nav.Link> */}
              <Nav.Link as={Link} to="/about">About</Nav.Link>
              <Nav.Link as={Link} to="/help">Help</Nav.Link>
            </Nav>
            <Nav>
              <NavDropdown title={authCtx.currentUser.email}>
                <NavDropdown.Item onClick={HandlerLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {error && <Alert variant="danger">{error}</Alert>}
    </header>
  );
}

export default NavBar;