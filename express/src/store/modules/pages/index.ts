import { combineReducers } from 'redux';

import browse from './landing_pages/browse';
import landing from './landing_pages/location';
import search from './search';
import widget from './widget';

export const reducer = combineReducers({
  browse,
  landing,
  search,
  widget,
});
