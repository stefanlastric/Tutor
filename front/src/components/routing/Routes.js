import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/RegisterOption';
import Login from '../auth/Login';
import RegStudent from '../auth/RegStudent';
import RegTeacher from '../auth/RegTeacher';
import NotFound from '../layout/ErrorPage';
import Table from '../table/Table';
import AddSubject from '../subjects/AddSubject';
import AddAppointment from '../appointments/AddAppointment';

class Routes extends React.Component {
  render() {
    console.log(this.props);
    const { isAuthenticated } = this.props;
    return (
      <section className='container'>
        <Switch>
          <Route exact path='/regstudent' component={RegStudent} />
          <Route exact path='/regteacher' component={RegTeacher} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/table' component={Table} />
          {isAuthenticated && (
            <Route private path='/subject/add' component={AddSubject} />
          )}
          {isAuthenticated && (
            <Route private path='/appointment/add' component={AddAppointment} />
          )}
          <Route component={NotFound} />
        </Switch>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Routes);
