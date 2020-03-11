import { combineEpics } from 'redux-observable';

import fetchUserAccountEpic from './fetchUserAccountEpic';

export default combineEpics(
  fetchUserAccountEpic
);
