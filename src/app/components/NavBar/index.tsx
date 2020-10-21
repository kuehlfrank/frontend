import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { LoginButton } from '../LoginButton';

export function NavBar() {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/#/home">
          <img
            alt=""
            src="https://avatars1.githubusercontent.com/u/73188068?s=200&v=4"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          Kühlfrank
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/#/home">Home</Nav.Link>
            <Nav.Link href="/#/items">Items</Nav.Link>
          </Nav>
          <LoginButton />
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
