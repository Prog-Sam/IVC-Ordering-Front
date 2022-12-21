import React, { Fragment } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navigation = ({ currentUser, onLogout, ordersCount }) => {
  return (
    <Navbar bg='dark' variant='dark' expand='lg'>
      <Container style={{ alignContent: 'stretch', marginLeft: '0px' }}>
        <Navbar.Brand as={Link} to='/'>
          IVC-ORDERING
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Link to='/orders/New' className='nav-link form-inline'>
              NEW ORDER
            </Link>
            <Link to='/orders' className='nav-link form-inline'>
              CART{' '}
              {ordersCount > 0 && (
                <span class='badge badge-danger'>{ordersCount}</span>
              )}
            </Link>
            <Link to='/catalog/New' className='nav-link'>
              CATALOG
            </Link>
            <Link to='/status' className='nav-link'>
              STATUS
            </Link>
            {currentUser && (
              <Fragment>
                <Link to='/#' className='nav-link'>
                  {currentUser.name}
                </Link>
                <Link to='/#' className='nav-link ' onClick={onLogout}>
                  LOGOUT
                </Link>
              </Fragment>
            )}
            {!currentUser && (
              <Link to='/login' className='nav-link'>
                LOGIN
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
