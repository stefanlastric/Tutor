import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Application from './components/Application';

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Application>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
          </Switch>
        </Application>
      </BrowserRouter>
    );
  }
}

export default Routes;
