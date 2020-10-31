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
import '../scss/custom.scss';
import { useAuth0 } from '@auth0/auth0-react';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Recipes } from './containers/RecipesPage/Loadable';
import { KuehlfrankProvider } from './containers/KuehlfrankProvider';
import { AboutUsPage } from './containers/AboutUsPage/Loadable';
import { LegalPage } from './containers/LegalPage/Loadable';

export function App() {
  const history = createBrowserHistory();
  return (
    <>
      <Router history={history}>
        <Auth0ProviderWithHistory>
          <Helmet
            titleTemplate="%s - Kühlfrank, Warum wegwerfen?"
            defaultTitle="Kühlfrank, Warum wegwerfen?"
          >
            <meta name="description" content="Smartes Kühlschrankmanagement" />
          </Helmet>
          <HashRouter>
            <Route component={NavBar} />
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/home" component={HomePage} />
              <ProtectedRoute path="/items" component={ItemsPage} />
              <ProtectedRoute path="/recipes" component={Recipes} />
              <Route path="/aboutus" component={AboutUsPage} />
              <Route path="/legal" component={LegalPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </HashRouter>
          <GlobalStyle />
        </Auth0ProviderWithHistory>
      </Router>
    </>
  );
}
