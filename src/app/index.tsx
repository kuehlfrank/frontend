/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, HashRouter } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { HomePage } from './containers/HomePage/Loadable';
import { NavBar } from './components/NavBar';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { ItemsPage } from './containers/ItemsPage/Loadable';

export function App() {
  return (
    <HashRouter>
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
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/home" component={HomePage} />
        <Route path="/items" component={ItemsPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </HashRouter>
  );
}
