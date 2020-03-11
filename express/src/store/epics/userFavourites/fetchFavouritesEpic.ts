/* tslint:disable:max-line-length */
import { ofType } from 'redux-observable';
import { of as rxOf } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { request } from 'universal-rxjs-ajax';
import normalize from 'json-api-normalizer';

// Actions
import { FETCH_USER_FAVOURITES, fetchUserFavouritesFailure, fetchUserFavouritesSuccess } from '@src/store/modules/userFavourites/favourites';

// Selectors
import { getUserFavouritesUrl } from '@src/store/selectors';

// Utils
import { configureRequest } from '@src/store/utils';

export default (action$, state$) => action$.pipe(
  ofType(FETCH_USER_FAVOURITES),
  mergeMap(() => {
    const state = state$.value;
    const { auth, config } = state;
    return request(configureRequest(auth, config, {
      endpoint: getUserFavouritesUrl(state),
      method: 'GET',
    }))
      .pipe(
        map(({ response }) => {
          const { favourites, roomAssets } = normalize(response);
          return fetchUserFavouritesSuccess(favourites, roomAssets);
        }),
        catchError(error => rxOf(fetchUserFavouritesFailure(error.xhr.response)))
      );
  })
);
