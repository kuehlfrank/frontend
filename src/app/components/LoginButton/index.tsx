import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';

export function LoginButton() {
  const { loginWithRedirect } = useAuth0();
  return (
    <>
      <Button
        type="button"
        variant="primary"
        onClick={() => loginWithRedirect()}
      >
        Login
      </Button>
    </>
  );
}
