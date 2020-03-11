import { combineEpics } from 'redux-observable';

import mapEpic from './map';

export default combineEpics(
  mapEpic
);
