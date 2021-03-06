import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import subjects from './subject';
import appointments from './appointments';
import teachers from './teacher';
import category from './category';

export default combineReducers({
  alert,
  auth,
  subjects,
  appointments,
  teachers,
  category,
});
