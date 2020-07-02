import React from 'react';
import { Link } from 'react-router-dom';

const RegisterLanding = () => {
  return (
    <div className='budinasredini'>
      <div className='buttons'>
        <Link to='/regstudent' className='btn btn-primary'>
          Register as a Student
        </Link>
        <Link to='/regteacher' className='btn btn-primary'>
          Register as a Tutor
        </Link>
      </div>
    </div>
  );
};
export default RegisterLanding;
