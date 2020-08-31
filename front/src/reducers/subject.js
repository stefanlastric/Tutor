import {
  GET_SUBJECTS,
  GET_MY_SUBJECTS,
  GET_SUBJECT,
  SUBJECT_ERROR,
  DELETE_SUBJECT,
  ADD_SUBJECT,
} from '../actions/types';
const initialState = {
  subjects: [],
  subject: null,
  loading: true,
  error: {},
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

    //fix delete
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
    default:
      return state;
  }
}
