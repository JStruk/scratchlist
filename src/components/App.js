import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ListPage from './ListPage';
import Home from './Home';

function App() {

  return (
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/list" component={ListPage} />
    </Switch>
  );
}

export default App;
