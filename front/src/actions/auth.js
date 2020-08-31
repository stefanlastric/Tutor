import axios from 'axios';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_SUCCESS_STUDENT,
  LOGIN_SUCCESS_TEACHER,
  LOGIN_SUCCESS_ADMIN,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
  GET_TEACHERS,
  TEACHER_ERROR,
} from './types';

import setAuthToken from '../utils/setAuthToken';
import { setLocalStorageRole } from '../utils/helpers';
//Load user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);

    try {
      const res = await axios.get('/login');
      setLocalStorageRole(res.data.role);
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });

      // if (res.data.role.name === 'Admin') {
      //   dispatch({
      //     type: LOGIN_SUCCESS_ADMIN,
      //     payload: res.data,
      //   });
      // } else if (res.data.role.name === 'Teacher') {
      //   dispatch({
      //     type: LOGIN_SUCCESS_TEACHER,
      //     payload: res.data,
      //   });
      // } else {
      //   dispatch({
      //     type: LOGIN_SUCCESS_STUDENT,
      //     payload: res.data,
      //   });
      // }
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  } else {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//Login user
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/login', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//Register student
export const student = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/students', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

//Register teacher
export const teacher = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/teachers', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

//LOGOUT - Clear profile
export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
