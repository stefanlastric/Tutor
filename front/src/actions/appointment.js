import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_APPOINTMENT,
  GET_APPOINTMENTS,
  APPOINTMENT_ERROR,
  DELETE_APPOINTMENT,
  APPROVE_APPOINTMENT,
  CANCEL_APPOINTMENT,
  ADD_APPOINTMENT,
} from './types';

//Approve appointment
export const approveAppointment = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.patch(`/appointments/approve/${id}`, null, config);

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

// Cancel appointment
export const cancelAppointment = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.patch(`/appointments/cancel/${id}`);

    dispatch({
      type: CANCEL_APPOINTMENT,
      payload: { id },
    });
    dispatch(setAlert('Appointment Canceled', 'success'));
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

//Get all AppointmentsStudent
export const getAppointmentsStudent = () => async (dispatch) => {
  try {
    const res = await axios.get('/appointments/student');

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

//Get all AppointmentsTeacher
export const getAppointmentsTeacher = () => async (dispatch) => {
  try {
    const res = await axios.get('/appointments/teacher');

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
      type: ADD_APPOINTMENT,
      payload: res.data,
    });

    // dispatch(
    //   setAlert(edit ? 'Appointment Updated' : 'Appointment Created', 'success')
    // );

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
