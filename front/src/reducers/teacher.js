import {
  GET_TEACHERS_REQUEST,
  GET_TEACHERS_SUCCESS,
  GET_TEACHERS_FAIL,
  GET_TEACHERS_INIT,
  APPROVE_TEACHER,
  APPROVE_TEACHER_ERROR,
} from '../actions/types';
const initialState = {
  teachers: [],
  teacher: null,
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
    case APPROVE_TEACHER:
      return {
        ...state,
        teachers: state.teachers.map((teacher) =>
          teacher._id === payload.id ? { ...teacher } : teacher
        ),
        loading: false,
      };
    case GET_TEACHERS_INIT:
      return initialState;
    case APPROVE_TEACHER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
