
/*
THIS IS AN ONE BIG STORE DATA
  combine all reducers => to be an STORE
  keep all data
  keep all state
*/

import { combineReducers } from 'redux';
import reducerDepartment from './reducer-department';


const allReducers = combineReducers({
  department:reducerDepartment
});

export default allReducers;
