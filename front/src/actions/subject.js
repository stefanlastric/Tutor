import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_SUBJECT,
  GET_SUBJECTS,
  SUBJECT_ERROR,
  GET_MY_SUBJECTS,
  DELETE_SUBJECT,
} from './types';

//export current user subjects
export const getCurrentSubject = () => async (dispatch) => {
  try {
    const res = await axios.get('/subjects/me');

    dispatch({
      type: GET_SUBJECT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SUBJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get all subjects
export const getSubjects = () => async (dispatch) => {
  try {
    const res = await axios.get('/subjects');

    dispatch({
      type: GET_SUBJECTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SUBJECT_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};

//Get my subjects
export const getMySubjects = () => async (dispatch) => {
  try {
    const res = await axios.get(`/subjects/my`);

    dispatch({
      type: GET_MY_SUBJECTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SUBJECT_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};

//Get subjects by ID
export const getSubjectsById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/subjects/user/${userId}`);

    dispatch({
      type: GET_SUBJECT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SUBJECT_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};

//Create or update subjects
export const createSubject = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/subjects', formData, config);

    dispatch({
      type: GET_SUBJECT,
      payload: res.data,
    });

    dispatch(setAlert(edit ? 'Subject Updated' : 'Subject Created', 'success'));

    if (!edit) {
      history.push('/');
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: SUBJECT_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};

//Delete subjects

export const deleteSubject = (id) => async (dispatch) => {
  try {
    await axios.delete(`/subjects/${id}`);

    dispatch({
      type: DELETE_SUBJECT,
      payload: id,
    });

    dispatch(setAlert('Subject Removed', 'success'));
  } catch (err) {
    dispatch({
      type: SUBJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
