import React from 'react';
import { Link } from 'react-router-dom';
import './RegisterOption.css';
const RegisterLanding = () => {
  return (
    <div className='login_wrapper'>
      <div className='login_container'>
        <div className='buttons'>
          <Link to='/regstudent' className='btn btn-primary'>
            Register as a Student
          </Link>

          <Link to='/regteacher' className='btn btn-primary'>
            Register as a Tutor
          </Link>
        </div>
      </div>
    </div>
  );
};
export default RegisterLanding;
