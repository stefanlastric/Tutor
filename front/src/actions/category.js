import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAIL,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
} from './types';

//Get all categories
export const getCategory = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_CATEGORY_REQUEST,
    });
    const res = await axios.get('/category');

    dispatch({
      type: GET_CATEGORY_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_CATEGORY_FAIL,
      payload: { msg: err.response, status: err.response },
    });
  }
};

//Delete category

export const deleteCategory = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_CATEGORY_REQUEST,
    });
    await axios.delete(`/category/${id}`);

    dispatch({
      type: DELETE_CATEGORY_SUCCESS,
      payload: id,
    });

    dispatch(setAlert('Category Removed', 'success'));
  } catch (err) {
    dispatch({
      type: DELETE_CATEGORY_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
