import React, { Fragment, useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';

import setAuthToken from '../../utils/setAuthToken';
// import {  } from ''

const Profile = (props) => {
  const { user } = props;
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
  });

  useEffect(() => {
    setFormData({
      ...formData,
      firstName: user.name,
      lastName: user.surname,
    });
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: firstName,
      surname: lastName,
    };
    setAuthToken(localStorage.token);
    console.log(data);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // const body = JSON.stringify({ name, email, password });

    const res = await axios.patch('/users/update-my-profile', data, config);
    // write logic for updating user
    // login(email, password);
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const { firstName, lastName } = formData;
  return (
    <Fragment>
      <Row className='login_wrapper'>
        <div className='login_container'>
          <form className='form' onSubmit={(e) => onSubmit(e)}>
            <div className='form-group'>
              <input
                placeholder='First Name'
                name='firstName'
                value={firstName}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <input
                placeholder='Last Name'
                name='lastName'
                value={lastName}
                onChange={(e) => onChange(e)}
              />
            </div>
            <input type='submit' className='btn btn-primary' value='Login' />
          </form>
        </div>
      </Row>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { login })(Profile);
