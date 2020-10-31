import React from 'react';
import { Navbar } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';

export function UserBadge() {
  const { user, isAuthenticated } = useAuth0();
  if (isAuthenticated) {
    const { name } = user;
    return (
      <>
        <Navbar.Text>Hallo, {name}</Navbar.Text>
      </>
    );
  } else {
    return null;
  }
}
