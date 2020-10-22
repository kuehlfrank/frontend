import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';

export function SignupButton() {
  const { loginWithRedirect } = useAuth0();
  return (
    <>
      <Button
        type="button"
        variant="secondary"
        onClick={() =>
          loginWithRedirect({
            screen_hint: 'signup',
          })
        }
      >
        Sign Up
      </Button>
    </>
  );
}
