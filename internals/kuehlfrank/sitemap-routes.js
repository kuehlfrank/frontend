import React from 'react';
import { Switch, Route } from 'react-router';

export default (
  // Switch is added in v4 react-router
  <Switch>
    <Route path="/" />
    <Route path="/home" />
    <Route path="/items" />
    <Route path="/recipes" />
    <Route />
  </Switch>
);
