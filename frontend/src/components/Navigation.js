import React, { useContext } from 'react';
import { Navbar, Nav, Button, Alert, Row, Col } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import logo from '../bakery-logo.png';
import { useHistory, Link } from 'react-router-dom';
import { AuthContext } from '../App';

export default function Navigation() {

  const history = useHistory();
  const { dispatch, state } = useContext(AuthContext);

  async function handleLogout() {
    try {
      //throw new Error();
      dispatch({
        type: 'LOGOUT'
      });
      history.push('/login');
    } catch (err) {
      dispatch({
        type: 'SET_ERROR',
        payload: {
          variant: 'danger',
          message: 'Hoppá, valami elromlott. :( '
        }
      });
    }
  }

  return (
    <>
      <Navbar bg="none" expand="md" className="px-2">
        <Navbar.Brand as={Link} to="/">
          <Row>
            <Col>
              <Image className="align-self-center m-2" src={logo} width={70} />
            </Col>
            <Col className="d-flex align-items-center">
              <span className="fs-2">La Merienda pékség</span>
            </Col>
          </Row>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="mr-auto">
            <Link to="/order" className="nav-link">Új rendelés</Link>
          </Nav>
          <Nav className="mr-auto">
            <Link to="/previous-orders" className="nav-link">Korábbi rendeléseim</Link>
          </Nav>
          <Button className="" variant="outline-primary" onClick={handleLogout}>Kijelentkezés</Button>
        </Navbar.Collapse>
      </Navbar>
      {state.alert &&
        <Col xs={12} sm={8} md={6} xl={4} className="m-auto">
          <Alert
            variant={state.alert.variant}
            className="m-2"
            onClose={() => dispatch({
              type: 'CLEAR_ERROR'
            })}
            dismissible
          >
            {state.alert.message}
          </Alert>
        </Col>
      }
    </>
  )
}