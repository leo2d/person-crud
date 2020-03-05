import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home/';
import CreateUpdate from './pages/CreateUpdate/';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/home" exact component={Home} />
      <Route path="/new" component={CreateUpdate} />
      <Route path="/edit" component={CreateUpdate} />
    </Switch>
  );
}
