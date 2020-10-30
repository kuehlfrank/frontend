import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

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
        Log out &nbsp;
        <FontAwesomeIcon icon={faSignOutAlt} />
      </Button>
    </>
  );
}
