import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Footer from '../Footer';
import Routes from '../../Routes';
import Home from '../Home';
import Navigation from '../Navigation';
// Redux
import { Provider } from 'react-redux';
import store from '../../store';
import { loadUser } from '../../actions/auth';
import setAuthToken from '../../utils/setAuthToken';
import './Application.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const Application = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <div className='application'>
            <div className='header'>
              <Navigation />
              <Switch>
                <Route exact path='/' component={Home} />
                <Route component={Routes} />
              </Switch>
              <Footer />
            </div>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
};
export default Application;
