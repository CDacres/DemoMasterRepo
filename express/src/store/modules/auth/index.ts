import { combineReducers } from 'redux';

import tokens from './tokens';
import user from './user';

export const reducer = combineReducers({
  tokens,
  user,
});
