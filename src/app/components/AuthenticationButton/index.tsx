import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { LoginButton } from '../LoginButton';
import { LogoutButton } from '../LogoutButton';
import { SignupButton } from '../SignupButton';

export function AuthenticationButton() {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? (
    <LogoutButton />
  ) : (
    <>
      <LoginButton />
      <SignupButton />
    </>
  );
}
