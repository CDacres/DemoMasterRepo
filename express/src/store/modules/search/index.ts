import { combineReducers } from 'redux';

import params from './params';
import tags from './tags';
import url from './url';
import verticals from './verticals';

export const reducer = combineReducers({
  params,
  tags,
  url,
  verticals,
});
