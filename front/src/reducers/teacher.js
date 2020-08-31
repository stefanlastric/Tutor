import {
  GET_TEACHERS_REQUEST,
  GET_TEACHERS_SUCCESS,
  GET_TEACHERS_FAIL,
  GET_TEACHERS_INIT,
} from '../actions/types';
const initialState = {
  teachers: [],
  loading: false,
  error: {},
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
    default:
      return state;
  }
}
