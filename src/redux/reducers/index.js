import { combineReducers } from 'redux';
import reducerDepartment from './reducer-department';
import reducerUser from './reducer-user';
import reducerOffice from './reducer-office';
import reducerRegion from './reducer-region';
import reducerSubregion from './reducer-subregion';





const allReducers = combineReducers({
  department:reducerDepartment,
  user:reducerUser,
  office:reducerOffice,
  region:reducerRegion,
  subregion:reducerSubregion

});

export default allReducers;
