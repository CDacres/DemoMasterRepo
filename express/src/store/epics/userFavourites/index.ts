import { combineEpics } from 'redux-observable';

import addUserFavouriteEpic from './addUserFavouriteEpic';
import fetchFavouritesEpic from './fetchFavouritesEpic';

export default combineEpics(
  addUserFavouriteEpic,
  fetchFavouritesEpic
);
