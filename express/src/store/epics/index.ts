import { combineEpics } from 'redux-observable';

import adminEpic from './admin';
import authEpic from './auth';
import navigateEpic from './navigate';
import pagesEpic from './pages';
import searchEpic from './search';

export default combineEpics(
  adminEpic,
  authEpic,
  navigateEpic,
  pagesEpic,
  searchEpic
);
