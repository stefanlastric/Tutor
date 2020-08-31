import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS_ADMIN,
  LOGIN_SUCCESS_TEACHER,
  LOGIN_SUCCESS_STUDENT,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETED,
  GET_TEACHERS,
  TEACHER_ERROR,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  // isAdmin: false,
  // isTeacher: false,
  // isStudent: false,
  loading: true,
  user: null,
  role: null,
  users: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case GET_TEACHERS:
      return {
        ...state,
        isAuthenticated: true,
        users: payload,
        loading: false,
      };
    case REGISTER_SUCCESS:
    // case LOGIN_SUCCESS_ADMIN:
    //   localStorage.setItem('role', 'Admin');
    //   return {
    //     ...state,
    //     // isAdmin: true,
    //     loading: false,
    //     role: 'Admin',
    //   };
    // case LOGIN_SUCCESS_TEACHER:
    //   localStorage.setItem('role', 'Teacher');
    //   return {
    //     ...state,
    //     // isTeacher: true,
    //     loading: false,
    //     role: 'Teacher',
    //   };
    // case LOGIN_SUCCESS_STUDENT:
    //   localStorage.setItem('role', 'Student');
    //   return {
    //     ...state,
    //     // isStudent: true,
    //     loadipropertiesng: false,
    //     role: 'Student',
    //   };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
    case TEACHER_ERROR:
    case ACCOUNT_DELETED:
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        role: null,
        loading: false,
      };
    default:
      return state;
  }
}
