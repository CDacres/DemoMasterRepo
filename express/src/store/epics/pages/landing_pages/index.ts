import { combineEpics } from 'redux-observable';

import fetchBrowseEpic from './fetchBrowseEpic';

export default combineEpics(
  fetchBrowseEpic
);
