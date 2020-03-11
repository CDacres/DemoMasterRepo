import { combineEpics } from 'redux-observable';

import fetchSearchResultsEpic from './fetchSearchResultsEpic';

export default combineEpics(
  fetchSearchResultsEpic
);
