import React from 'react';

import { NavLink, Router } from 'react-router-dom';

import './Navigation.css';

const Navigation = (props) => {
  return (
    <div className='navigation'>
      <NavLink
        exact
        to='/'
        className='navigation_item'
        activeClassName='navigation_item_active'
      >
        Home
      </NavLink>
      <NavLink
        exact
        to='/login'
        className='navigation_item'
        activeClassName='navigation_item_active'
      >
        Login
      </NavLink>
      <NavLink
        exact
        to='/register'
        className='navigation_item'
        activeClassName='navigation_item_active'
      >
        Register
      </NavLink>
    </div>
  );
};

export default Navigation;
