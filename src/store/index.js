
import { combineReducers } from 'redux';
import departmentStore from './department.store';

const allReducers = combineReducers({
  department:departmentStore
});

export default allReducers;
