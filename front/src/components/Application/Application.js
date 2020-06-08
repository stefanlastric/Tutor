import React, { Component } from 'react';

import Navigation from '../Navigation';

import './Application.css';

class Application extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className='application'>
        <div className='header'>
          <Navigation />
        </div>
        <div className='content'>{children}</div>
        <div className='footer'>Footer</div>
      </div>
    );
  }
}

export default Application;
