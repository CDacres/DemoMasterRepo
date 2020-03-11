// Utils
import { createActionCreator, createReducer } from '@src/store/utils';
import { deleteObjectProperty } from '@src/utils';

// Types
import { Store } from '@src/typings/types';

export const ADD_USER_FAVOURITE = 'USER/FAVOURITES/ADD_USER_FAVOURITE';
export const ADD_USER_FAVOURITE_SUCCESS = 'USER/FAVOURITES/ADD_USER_FAVOURITE_SUCCESS';
export const ADD_USER_FAVOURITE_FAILURE = 'USER/FAVOURITES/ADD_USER_FAVOURITE_FAILURE';
export const FETCH_USER_FAVOURITES = 'USER/FAVOURITES/FETCH_USER_FAVOURITES';
export const FETCH_USER_FAVOURITES_SUCCESS = 'USER/FAVOURITES/FETCH_USER_FAVOURITES_SUCCESS';
export const FETCH_USER_FAVOURITES_FAILURE = 'USER/FAVOURITES/FETCH_USER_FAVOURITES_FAILURE';
export const REMOVE_USER_FAVOURITE = 'USER/FAVOURITES/REMOVE_USER_FAVOURITE';
export const REMOVE_USER_FAVOURITE_SUCCESS = 'USER/FAVOURITES/REMOVE_USER_FAVOURITE_SUCCESS';
export const REMOVE_USER_FAVOURITE_FAILURE = 'USER/FAVOURITES/REMOVE_USER_FAVOURITE_FAILURE';

export default createReducer({}, {
  [ADD_USER_FAVOURITE_SUCCESS]: addUserFavouriteSuccessReducer,
  [FETCH_USER_FAVOURITES_SUCCESS]: fetchUserFavouritesSuccessReducer,
  [REMOVE_USER_FAVOURITE]: removeUserFavouriteReducer,
});

function addUserFavouriteSuccessReducer(state: Store.UserFavourites, { favourites, roomAssets }: Store.UserFavourites) {
  return {
    favourites: {
      ...state.favourites,
      ...favourites,
    },
    roomAssets: {
      ...state.roomAssets,
      ...roomAssets,
    },
  };
}

function fetchUserFavouritesSuccessReducer(_: Store.UserFavourites, { favourites, roomAssets }: Store.UserFavourites) {
  return {
    favourites,
    roomAssets,
  };
}

function removeUserFavouriteReducer(
  state: Store.UserFavourites,
  { assetId, favouriteId }: { assetId: string; favouriteId: string }
) {
  return {
    favourites: deleteObjectProperty(state, favouriteId),
    roomAssets: deleteObjectProperty(state, assetId),
  };
}

export const addUserFavourite = createActionCreator(ADD_USER_FAVOURITE, 'assetId');
export const addUserFavouriteSuccess = createActionCreator(ADD_USER_FAVOURITE_SUCCESS, 'favourites', 'roomAssets');
export const addUserFavouriteFailure = createActionCreator(ADD_USER_FAVOURITE_FAILURE, 'error');
export const fetchUserFavourites = createActionCreator(FETCH_USER_FAVOURITES);
export const fetchUserFavouritesSuccess =
  createActionCreator(FETCH_USER_FAVOURITES_SUCCESS, 'favourites', 'roomAssets');
export const fetchUserFavouritesFailure = createActionCreator(FETCH_USER_FAVOURITES_FAILURE, 'error');
export const removeUserFavourite = createActionCreator(REMOVE_USER_FAVOURITE, 'favouriteId', 'assetId');
export const removeUserFavouriteSuccess = createActionCreator(REMOVE_USER_FAVOURITE_SUCCESS, 'favouriteId', 'assetId');
export const removeUserFavouriteFailure = createActionCreator(REMOVE_USER_FAVOURITE_FAILURE, 'error');
