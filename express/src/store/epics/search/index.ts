import { combineEpics } from 'redux-observable';

import paramsEpic from './params';
// import resultsEpic from './results';
import tagsEpic from './tags';
import urlEpic from './url';

export default combineEpics(
  paramsEpic,
  // resultsEpic,
  tagsEpic,
  urlEpic
);
