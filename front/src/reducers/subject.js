import {
  GET_SUBJECTS,
  GET_MY_SUBJECTS,
  GET_SUBJECT,
  SUBJECT_ERROR,
  DELETE_SUBJECT,
  ADD_SUBJECT,
  SET_NOT_AVAILABLE_SUBJECT_REQUEST,
  SET_AVAILABLE_SUBJECT_REQUEST,
  SET_AVAILABLE_SUBJECT_FAIL,
  SET_AVAILABLE_SUBJECT_SUCCESS,
  SET_NOT_AVAILABLE_SUBJECT_FAIL,
  SET_NOT_AVAILABLE_SUBJECT_SUCCESS,
} from '../actions/types';
const initialState = {
  subjects: [],
  subject: null,
  loading: true,
  error: {},
  setAvailableData: null,
  setNotAvailableData: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SUBJECTS:
    case GET_MY_SUBJECTS:
      return {
        ...state,
        subjects: payload,
        loading: false,
      };
    case GET_SUBJECT:
      return {
        ...state,
        subject: payload,
        loading: false,
      };
    case ADD_SUBJECT:
      return {
        ...state,
        subjects: [payload, ...state.subjects],
        loading: false,
      };

    case DELETE_SUBJECT:
      return {
        ...state,
        subjects: state.subjects.filter((subject) => subject._id !== payload),
        loading: false,
      };
    case SUBJECT_ERROR:
      return {
        ...state,
        subjects: payload,
        loading: false,
      };
    case SET_AVAILABLE_SUBJECT_REQUEST:
      return {
        ...state,
        loading: true,
        error: {},
        setAvailableData: null,
      };
    case SET_AVAILABLE_SUBJECT_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        setAvailableData: null,
      };
    case SET_AVAILABLE_SUBJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        erorr: {},
        setAvailableData: action.payload,
      };
    case SET_NOT_AVAILABLE_SUBJECT_REQUEST:
      return {
        ...state,
        loading: true,
        error: {},
        setNotAvailableData: null,
      };
    case SET_NOT_AVAILABLE_SUBJECT_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        setNotAvailableData: null,
      };
    case SET_NOT_AVAILABLE_SUBJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        erorr: {},
        setNotAvailableData: action.payload,
      };
    default:
      return state;
  }
}
