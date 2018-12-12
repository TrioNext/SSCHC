import { combineReducers } from 'redux';
import reducerDepartment from './reducer-department';
import reducerUser from './reducer-user';



const allReducers = combineReducers({
  department:reducerDepartment,
  user:reducerUser

});

export default allReducers;
