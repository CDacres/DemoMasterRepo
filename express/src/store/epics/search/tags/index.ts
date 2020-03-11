import { combineEpics } from 'redux-observable';

import fetchTagMetaEpic from './fetchTagMetaEpic';
import fetchTagsEpic from './fetchTagsEpic';

export default combineEpics(
  fetchTagMetaEpic,
  fetchTagsEpic
);
