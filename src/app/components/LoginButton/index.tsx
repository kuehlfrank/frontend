import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

export function LoginButton() {
  const { loginWithRedirect } = useAuth0();
  return (
    <>
      <Button
        type="button"
        variant="primary"
        onClick={() =>
          loginWithRedirect({
            returnTo: window.location.origin,
          })
        }
      >
        Anmelden &nbsp;
        <FontAwesomeIcon icon={faSignInAlt} />
      </Button>
    </>
  );
}
