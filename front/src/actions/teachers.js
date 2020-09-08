import axios from 'axios';

import { setAlert } from './alert';
import {
  GET_TEACHERS_INIT,
  GET_TEACHERS_REQUEST,
  GET_TEACHERS_FAIL,
  GET_TEACHERS_SUCCESS,
  APPROVE_TEACHER,
  APPROVE_TEACHER_ERROR,
} from './types';

import { setLocalStorageRole } from '../utils/helpers';

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

//Approve teacher
export const approveTeacher = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.patch(`/teachers/approve/${id}`);

    dispatch({
      type: APPROVE_TEACHER,
      payload: { id },
    });
    dispatch(setAlert('Teacher Approved', 'success'));
  } catch (err) {
    dispatch({
      type: APPROVE_TEACHER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getTeachersInit = () => async (dispatch) => {
  dispatch({
    type: GET_TEACHERS_INIT,
  });
};
