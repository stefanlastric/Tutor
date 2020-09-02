import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './AppNavBar.css';
import { isAdmin, isTeacher, isStudent } from '../../utils/helpers';

const AppNavbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLink = (
    <Nav>
      <Nav.Link
        activeStyle={{ color: '#ED5035' }}
        as={NavLink}
        exact
        to='/subjects'
      >
        Subjects
      </Nav.Link>{' '}
      <Nav.Link
        activeStyle={{ color: '#ED5035' }}
        as={NavLink}
        exact
        to='/teachers'
      >
        Teachers
      </Nav.Link>
      {isTeacher() && (
        <Nav>
          <Nav.Link
            activeStyle={{ color: '#ED5035' }}
            as={NavLink}
            exact
            to='/mysubjects'
          >
            My Subjects
          </Nav.Link>
          <Nav.Link
            activeStyle={{ color: '#ED5035' }}
            as={NavLink}
            exact
            to='/subject/add'
          >
            Add New Subject
          </Nav.Link>{' '}
          <Nav.Link
            activeStyle={{ color: '#ED5035' }}
            as={NavLink}
            exact
            to='/appointments/teacher'
          >
            Appointments
          </Nav.Link>
        </Nav>
      )}
      {isAdmin() && (
        <Nav>
          <Nav.Link
            activeStyle={{ color: '#ED5035' }}
            as={NavLink}
            exact
            to='/appointments'
          >
            Appointments
          </Nav.Link>
        </Nav>
      )}
      {isStudent() && (
        <Nav>
          <Nav.Link
            activeStyle={{ color: '#ED5035' }}
            as={NavLink}
            exact
            to='/appointments/student'
          >
            Appointments
          </Nav.Link>
        </Nav>
      )}
      <Nav className='desno'>
        <Nav.Item>
          <Nav.Link to='/dashboard'>
            <i className='fas fa-user'></i>{' '}
            <span className='hide-sm'>Profile</span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={logout} href='#!'>
            <i className='fas fa-sign-out-alt'></i>{' '}
            <span className='hide-sm'>Logout</span>
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Nav>
  );

  const guestLinks = (
    <Nav className='ml-auto'>
      <Nav.Item>
        <Nav.Link to='/register' exact as={NavLink}>
          Register
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link to='/login' exact as={NavLink}>
          Login
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
  //TODO napraviti vise ovih

  return (
    <div className='navigation-bar'>
      <Navbar expand='lg'>
        <Nav>
          <Navbar.Brand to='/' exact as={NavLink}>
            Tutor.ba
          </Navbar.Brand>
        </Nav>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          {!loading && (
            <Fragment>{isAuthenticated ? authLink : guestLinks}</Fragment>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

AppNavbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(AppNavbar);
