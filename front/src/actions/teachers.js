import axios from 'axios';

import { setAlert } from './alert';
import {
  GET_TEACHERS_INIT,
  GET_TEACHERS_REQUEST,
  GET_TEACHERS_FAIL,
  GET_TEACHERS_SUCCESS,
  SUSPENDED_TEACHER_REQUEST,
  SUSPENDED_TEACHER_SUCCESS,
  SUSPENDED_TEACHER_FAIL,
} from './types';

//Get all teachers
export const getTeachers = () => async (dispatch) => {
  dispatch({
    type: GET_TEACHERS_REQUEST,
  });
  try {
    const res = await axios.get('/teachers');

    dispatch({
      type: GET_TEACHERS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_TEACHERS_FAIL,
      payload: { msg: err.response, status: err.response },
    });
  }
};

//Suspend teacher
export const suspendedTeacher = (id) => async (dispatch) => {
  try {
    dispatch({
      type: SUSPENDED_TEACHER_REQUEST,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.patch(`/teachers/suspended/${id}`, null, config);

    dispatch({
      type: SUSPENDED_TEACHER_SUCCESS,
      payload: res.data,
    });
    dispatch(setAlert('Teacher Suspended', 'success'));
  } catch (err) {
    dispatch({
      type: SUSPENDED_TEACHER_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getTeachersInit = () => async (dispatch) => {
  dispatch({
    type: GET_TEACHERS_INIT,
  });
};
