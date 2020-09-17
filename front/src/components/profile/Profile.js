import React, { Fragment, useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import { Row } from 'react-bootstrap';
import axios from 'axios';
import './Profile.css';
import setAuthToken from '../../utils/setAuthToken';
// import {  } from ''

const Profile = (props) => {
  const { user } = props;
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userqualification: '',
    usereducation: '',
    usercity: '',
    userage: '',
  });

  useEffect(() => {
    setFormData({
      ...formData,
      firstName: user.name,
      lastName: user.surname,
      userqualification: user.qualification,
      usereducation: user.education,
      usercity: user.city,
      userage: user.age,
    });
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: firstName,
      surname: lastName,
      qualification: userqualification,
      education: usereducation,
      city: usercity,
      age: userage,
    };
    setAuthToken(localStorage.token);

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

  const {
    firstName,
    lastName,
    userqualification,
    usereducation,
    usercity,
    userage,
  } = formData;
  return (
    <Fragment>
      <Row className='login_wrapper'>
        <div className='login_container'>
          <div className='title'>Edit profile</div>
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
            <div className='form-group'>
              <input
                placeholder='Qualification'
                name='userqualification'
                value={userqualification}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <input
                placeholder='Education'
                name='usereducation'
                value={usereducation}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <input
                placeholder='City'
                name='usercity'
                value={usercity}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <input
                placeholder='Age'
                name='userage'
                value={userage}
                onChange={(e) => onChange(e)}
              />
            </div>

            <input type='submit' className='btn btn-primary' value='Save' />
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
