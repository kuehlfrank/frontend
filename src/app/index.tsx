/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Switch,
  Route,
  HashRouter,
  BrowserRouter,
  Router,
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { GlobalStyle } from 'styles/global-styles';

import { HomePage } from './containers/HomePage/Loadable';
import { NavBar } from './components/NavBar';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { ItemsPage } from './containers/ItemsPage/Loadable';
import { Auth0ProviderWithHistory } from 'auth/Auth0ProviderWithHistory';
import { ProtectedRoute } from 'auth/ProtectedRoute';

export function App() {
  const history = createBrowserHistory();
  return (
    <>
      <Router history={history}>
        <Auth0ProviderWithHistory>
          <Helmet titleTemplate="%s - Kühlfrank" defaultTitle="Kühlfrank">
            <link
              rel="stylesheet"
              href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
              integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
              crossOrigin="anonymous"
            />
            <meta name="description" content="Smartes Kühlschrankmanagement" />
          </Helmet>
          <Route component={NavBar} />
          <HashRouter>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/home" component={HomePage} />
              <ProtectedRoute path="/items" component={ItemsPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </HashRouter>
          <GlobalStyle />
        </Auth0ProviderWithHistory>
      </Router>
    </>
  );
}
