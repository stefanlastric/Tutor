import {
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAIL,
  GET_CATEGORY_INIT,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
} from '../actions/types';
const initialState = {
  category: [],
  loading: true,
  categor: null,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CATEGORY_REQUEST:
      return {
        ...state,
        category: [],
        loading: true,
        error: {},
      };
    case GET_CATEGORY_FAIL:
      return {
        ...state,
        category: [],
        loading: false,
        error: payload,
      };
    case GET_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: {},
        category: payload,
      };
    case DELETE_CATEGORY_REQUEST:
      return {
        ...state,
        category: [],
        categor: null,
        loading: true,
        error: {},
      };
    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        category: state.category.filter((categor) => categor._id !== payload),
        loading: false,
      };
    case DELETE_CATEGORY_FAIL:
      return {
        ...state,
        category: [],
        categor: null,
        loading: false,
        error: payload,
      };
    case GET_CATEGORY_INIT:
      return initialState;
    default:
      return state;
  }
}
