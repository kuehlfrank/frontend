import React, {
  ClassAttributes,
  Component,
  HTMLAttributes,
  Props,
} from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import { LoadingIndicator } from 'app/components/LoadingIndicator';
import { KuehlfrankProvider } from 'app/containers/KuehlfrankProvider';

export function ProtectedRoute({ component, ...args }) {
  return (
    <>
      <Route component={withAuthenticationRequired(KuehlfrankProvider, {})} />
      <Route
        component={withAuthenticationRequired(component, {
          onRedirecting: () => <p>Not Authorized</p>,
        })}
        {...args}
      />
    </>
  );
}
