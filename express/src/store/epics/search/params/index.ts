import { combineEpics } from 'redux-observable';

import setParamsEpic from './setParamsEpic';

export default combineEpics(
  setParamsEpic
);
