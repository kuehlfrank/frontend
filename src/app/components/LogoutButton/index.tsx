import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';

export function LogoutButton() {
  const { logout } = useAuth0();
  return (
    <>
      <Button
        type="button"
        variant="danger"
        onClick={() =>
          logout({
            returnTo: window.location.origin,
          })
        }
      >
        Log out
      </Button>
    </>
  );
}
