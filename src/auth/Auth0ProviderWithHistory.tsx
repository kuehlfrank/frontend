import React from 'react';
import { useHistory } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

export function Auth0ProviderWithHistory({ children }) {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN as string;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID as string;
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE as string;

  const history = useHistory();

  const onRedirectCallback = appState => {
    // history.replace(
    //   window.location.hash ? window.location.hash : window.location.pathname,
    // );
    history.push(appState?.returnTo || window.location.pathname);
  };

  return (
    <>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        redirectUri={window.location.origin}
        audience={audience}
        onRedirectCallback={onRedirectCallback}
      >
        {children}
      </Auth0Provider>
    </>
  );
}
