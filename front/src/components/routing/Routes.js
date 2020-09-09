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
import AddAppointment from '../appointments/AddAppointment/AddAppointment';
import Appointments from '../appointments/Appointments';
import MySubjects from '../subjects/MySubjects';
import Subjects from '../subjects/Subjects';
import AppointmentsStudent from '../appointments/AppointmentsStudent';
import AppointmentsTeacher from '../appointments/AppointmentsTeacher';
import Teachers from '../teachers/Teachers';
import Category from '../category/Category';
import AddCategory from '../category/AddCategory';

class Routes extends React.Component {
  render() {
    const { isAuthenticated, isLoading } = this.props;
    return (
      <section className='container'>
        {!isLoading && (
          <Switch>
            <Route exact path='/regstudent' component={RegStudent} />
            <Route exact path='/regteacher' component={RegTeacher} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/table' component={Table} />

            {isAuthenticated && (
              <Switch>
                <Route private path='/subject/add' component={AddSubject} />
                <Route
                  private
                  path='/appointments/student'
                  component={AppointmentsStudent}
                />
                <Route
                  private
                  path='/appointments/teacher'
                  component={AppointmentsTeacher}
                />
                <Route
                  private
                  path='/appointment/add'
                  component={AddAppointment}
                />
                <Route private path='/subjects' component={Subjects} exact />
                <Route
                  private
                  path='/mysubjects'
                  component={MySubjects}
                  exact
                />
                <Route private path='/category' component={Category} exact />
                )&& isAdmin() && (
                <Route
                  private
                  path='/appointments'
                  component={Appointments}
                  exact
                />
                <Route private path='/teachers' component={Teachers} exact />
                <Route private path='/category/add' component={AddCategory} />
              </Switch>
            )}
            <Route component={NotFound} />
          </Switch>
        )}
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.loading,
});

export default connect(mapStateToProps)(Routes);
