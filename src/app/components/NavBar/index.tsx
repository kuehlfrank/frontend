import { ProtectedRoute } from 'auth/ProtectedRoute';
import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthenticationButton } from '../AuthenticationButton';
import { UserBadge } from '../UserBadge';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';

export function NavBar() {
  const { isAuthenticated } = useAuth0();
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
              <Nav.Link>Startseite</Nav.Link>
            </LinkContainer>
            {isAuthenticated && (
              <>
                <LinkContainer to="/recipes">
                  <Nav.Link>Rezepte</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/items">
                  <Nav.Link>Mein Kühlschrank</Nav.Link>
                </LinkContainer>
              </>
            )}
            <LinkContainer to="/aboutus">
              <Nav.Link>Über uns</Nav.Link>
            </LinkContainer>
          </Nav>
          <UserBadge />
          <AuthenticationButton />
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
