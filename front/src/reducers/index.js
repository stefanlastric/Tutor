import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import subjects from './subject';
import appointments from './appointments';

export default combineReducers({
  alert,
  auth,
  subjects,
  appointments,
});
