/* tslint:disable:max-line-length */
import { ofType } from 'redux-observable';
import { of as rxOf } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { request } from 'universal-rxjs-ajax';
import normalize from 'json-api-normalizer';

// Actions
import { ADD_USER_FAVOURITE, addUserFavouriteFailure, addUserFavouriteSuccess } from '@src/store/modules/userFavourites/favourites';

// Selectors
import { getUserFavouritesUrl } from '@src/store/selectors';

// Utils
import { configureRequest } from '@src/store/utils';

export default (action$, state$) => action$.pipe(
  ofType(ADD_USER_FAVOURITE),
  mergeMap(({ assetId }) => {
    const state = state$.value;
    const { auth, config } = state;
    const { user: { id } } = auth;
    return request(configureRequest(auth, config, {
      body: {
        data: {
          id: assetId,
        },
        relationships: {
          user: {
            id,
          },
        },
      },
      endpoint: getUserFavouritesUrl(state),
      method: 'POST',
    }))
      .pipe(
        map(({ response }) => {
          const { favourites, roomAssets } = normalize(response);
          return addUserFavouriteSuccess(favourites, roomAssets);
        }),
        catchError(error => rxOf(addUserFavouriteFailure(error.xhr.response)))
      );
  })
);
