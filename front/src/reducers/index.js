import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import subject from './auth';

export default combineReducers({
  alert,
  auth,
  subject,
});
