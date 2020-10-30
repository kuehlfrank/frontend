import { ProtectedRoute } from 'auth/ProtectedRoute';
import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthenticationButton } from '../AuthenticationButton';
import { UserBadge } from '../UserBadge';
import { LinkContainer } from 'react-router-bootstrap';

export function NavBar() {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <LinkContainer to="/home">
          <Navbar.Brand>
            <img
              alt=""
              src="https://avatars1.githubusercontent.com/u/73188068?s=200&v=4"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Kühlfrank
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/home">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/recipes">
              <Nav.Link>Recipes</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/items">
              <Nav.Link>Items</Nav.Link>
            </LinkContainer>
          </Nav>
          <UserBadge />
          <AuthenticationButton />
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
