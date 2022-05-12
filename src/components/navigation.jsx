import userEvent from '@testing-library/user-event';
import React, { Fragment } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navigation = ({ currentUser, onLogout }) => {
  return (
    <Navbar bg='dark' variant='dark' expand='lg'>
      <Container>
        <Navbar.Brand as={Link} to='/'>
          IVC-ORDERING CRUD
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Link to='/branch-settings' className='nav-link'>
              BRANCH
            </Link>
            <Link to='/item-settings' className='nav-link'>
              ITEM
            </Link>
            <Link to='/system-settings' className='nav-link'>
              SYSTEM
            </Link>
            {currentUser && (
              <Fragment>
                <Link to='/#' className='nav-link'>
                  {currentUser.name}
                </Link>
                <Link to='/#' className='nav-link' onClick={onLogout}>
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
