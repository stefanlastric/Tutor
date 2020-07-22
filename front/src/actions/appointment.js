import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_APPOINTMENT,
  GET_APPOINTMENTS,
  APPOINTMENT_ERROR,
  DELETE_APPOINTMENT,
  APPROVE_APPOINTMENT,
} from './types';

export const approveAppointment = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post(`/appointments/approve/${id}`);

    dispatch({
      type: APPROVE_APPOINTMENT,
      payload: { id },
    });
    dispatch(setAlert('Appointment Approved', 'success'));
  } catch (err) {
    dispatch({
      type: APPOINTMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get all appointments
export const getAppointments = () => async (dispatch) => {
  try {
    const res = await axios.get('/appointments');

    dispatch({
      type: GET_APPOINTMENTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: APPOINTMENT_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};

//Get appointments by ID
export const getAppointmentsById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/appointments/user/${userId}`);

    dispatch({
      type: GET_APPOINTMENT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: APPOINTMENT_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};

//Create or update appointments
export const createAppointment = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/appointments', formData, config);

    dispatch({
      type: GET_APPOINTMENT,
      payload: res.data,
    });

    dispatch(
      setAlert(edit ? 'Appointment Updated' : 'Appointment Created', 'success')
    );

    if (!edit) {
      history.push('/');
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: APPOINTMENT_ERROR,
      payload: { msg: err.response, status: err.response },
    });
  }
};

//Delete appointments

export const deleteAppointment = (id) => async (dispatch) => {
  try {
    await axios.delete(`/appointments/${id}`);

    dispatch({
      type: DELETE_APPOINTMENT,
      payload: id,
    });

    dispatch(setAlert('Appointment Removed', 'success'));
  } catch (err) {
    dispatch({
      type: APPOINTMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
