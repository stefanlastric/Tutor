import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Landing.css';

import { Image } from 'react-bootstrap';
const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/subjects' />;
  }
  return (
    <div
      // style={{
      //   backgroundImage: `url("`,
      //   backgroundRepeat: 'no-repeat',
      //   opacity: '80%',
      //   color: 'white',
      //   flex: '100%',
      //   display: 'flex
      // }}
      className='landing'
    >
      <img
        src='https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940&fbclid=IwAR3-Dyp4k7YICi83jFye3STMibWROsGnCAC9cbuBI03zBRXdqgX-nwaV1IA'
        className='landing_image'
      />
    </div>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
