import { combineEpics } from 'redux-observable';

import toggleMapEpic from './toggleMapEpic';
// import toggleMapVisibleEpic from './toggleMapVisibleEpic';

export default combineEpics(
  toggleMapEpic
);
