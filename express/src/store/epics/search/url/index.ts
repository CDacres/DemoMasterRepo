import { combineEpics } from 'redux-observable';

import searchEpic from './searchEpic';
import updateSearchUrlEpic from './updateSearchUrlEpic';

export default combineEpics(
  searchEpic,
  updateSearchUrlEpic
);
