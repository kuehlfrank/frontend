import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';

export function SignupButton() {
  const { loginWithPopup } = useAuth0();
  return (
    <>
      <Button
        type="button"
        variant="secondary"
        onClick={() =>
          loginWithPopup({
            screen_hint: 'signup',
          })
        }
      >
        Sign Up
      </Button>
    </>
  );
}
