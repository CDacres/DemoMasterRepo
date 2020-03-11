import { combineEpics } from 'redux-observable';

import navigateEpic from './navigateEpic';

export default combineEpics(
  navigateEpic
);
