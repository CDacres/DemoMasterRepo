import { combineReducers } from 'redux';

import map from './map';
import results from './results';

export default combineReducers({
  map,
  results,
});
