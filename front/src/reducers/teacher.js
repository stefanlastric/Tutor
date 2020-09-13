import {
  GET_TEACHERS_REQUEST,
  GET_TEACHERS_SUCCESS,
  GET_TEACHERS_FAIL,
  GET_TEACHERS_INIT,
  SUSPENDED_TEACHER_REQUEST,
  SUSPENDED_TEACHER_SUCCESS,
  SUSPENDED_TEACHER_FAIL,
} from '../actions/types';
const initialState = {
  teachers: [],
  teacher: null,
  loading: false,
  error: {},
  suspended: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_TEACHERS_REQUEST:
      return {
        ...state,
        teachers: [],
        loading: true,
        error: {},
      };
    case GET_TEACHERS_FAIL:
      return {
        ...state,
        teachers: [],
        loading: false,
        error: payload,
      };
    case GET_TEACHERS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: {},
        teachers: payload,
      };

    case GET_TEACHERS_INIT:
      return initialState;
    case SUSPENDED_TEACHER_REQUEST:
      return {
        ...state,
        loading: true,
        error: {},
        suspended: null,
      };
    case SUSPENDED_TEACHER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        suspended: null,
      };
    case SUSPENDED_TEACHER_SUCCESS:
      return {
        ...state,
        loading: false,
        erorr: {},
        suspended: action.payload,
      };
    default:
      return state;
  }
}
