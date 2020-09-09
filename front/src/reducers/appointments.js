import {
  GET_APPOINTMENTS,
  GET_APPOINTMENT,
  APPOINTMENT_ERROR,
  DELETE_APPOINTMENT,
  ADD_APPOINTMENT,
  APPROVE_APPOINTMENT_REQUEST,
  APPROVE_APPOINTMENT_SUCCESS,
  APPROVE_APPOINTMENT_FAIL,
  CANCEL_APPOINTMENT_REQUEST,
  CANCEL_APPOINTMENT_SUCCESS,
  CANCEL_APPOINTMENT_FAIL,
} from '../actions/types';
const initialState = {
  appointments: [],
  appointment: null,
  loading: true,
  error: {},
  approved: null,
  canceled: null,
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
    case APPROVE_APPOINTMENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: {},
        approved: null,
      };
    case APPROVE_APPOINTMENT_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        approved: null,
      };
    case APPROVE_APPOINTMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: {},
        approved: action.payload,
      };
    case CANCEL_APPOINTMENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: {},
        canceled: null,
      };
    case CANCEL_APPOINTMENT_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        canceled: null,
      };
    case CANCEL_APPOINTMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: {},
        canceled: action.payload,
      };
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
