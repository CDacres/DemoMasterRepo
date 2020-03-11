import { combineEpics } from 'redux-observable';

import fetchLangEpic from './fetchLangEpic';

export default combineEpics(
  fetchLangEpic
);
