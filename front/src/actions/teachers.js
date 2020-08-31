import axios from 'axios';

import {
  GET_TEACHERS_INIT,
  GET_TEACHERS_REQUEST,
  GET_TEACHERS_FAIL,
  GET_TEACHERS_SUCCESS,
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

export const getTeachersInit = () => async (dispatch) => {
  dispatch({
    type: GET_TEACHERS_INIT,
  });
};
