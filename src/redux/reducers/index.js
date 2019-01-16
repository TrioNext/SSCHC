import { combineReducers } from 'redux';

import reducerRegion from './reducer-region';
import reducerSubregion from './reducer-subregion';
import reducerDepartment from './reducer-department';
import reducerOffice from './reducer-office';
import reducerStore from './reducer-store';
import reducerUser from './reducer-user';

import reducerInventory from './reducer-inventory';
import reducerInventoryTrack from './reducer-inventory-track';

import reducerPurchase from './reducer-purchase';





const allReducers = combineReducers({
  department:reducerDepartment,
  user:reducerUser,
  office:reducerOffice,
  region:reducerRegion,
  subregion:reducerSubregion,
  store:reducerStore,
  inventory:reducerInventory,
  inventory_track:reducerInventoryTrack,
  purchase:reducerPurchase

});

export default allReducers;
