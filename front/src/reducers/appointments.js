import {
  GET_APPOINTMENTS,
  GET_APPOINTMENT,
  APPOINTMENT_ERROR,
  DELETE_APPOINTMENT,
  ADD_APPOINTMENT,
  APPROVE_APPOINTMENT,
} from '../actions/types';
const initialState = {
  appointments: [],
  appointment: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_APPOINTMENTS:
      return {
        ...state,
        appointments: payload,
        loading: false,
      };
    case GET_APPOINTMENT:
      return {
        ...state,
        appointment: payload,
        loading: false,
      };
    case ADD_APPOINTMENT:
      return {
        ...state,
        appointments: [payload, ...state.appointments],
        loading: false,
      };
    case APPROVE_APPOINTMENT:
      return {
        ...state,
        appointments: state.appointments.map((appointment) =>
          appointment._id === payload.id ? { ...appointment } : appointment
        ),
        loading: false,
      };
    //fix delete
    case DELETE_APPOINTMENT:
      return {
        ...state,
        appointments: state.appointments.filter(
          (appointment) => appointment._id !== payload
        ),
        loading: false,
      };
    case APPOINTMENT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
