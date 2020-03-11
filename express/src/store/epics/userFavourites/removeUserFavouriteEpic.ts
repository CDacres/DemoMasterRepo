/* tslint:disable:max-line-length */
import { ofType } from 'redux-observable';
import { of as rxOf } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { request } from 'universal-rxjs-ajax';

// Actions
import { REMOVE_USER_FAVOURITE, removeUserFavouriteFailure, removeUserFavouriteSuccess } from '@src/store/modules/userFavourites/favourites';

// Selectors
import { getUserFavouritesUrl } from '@src/store/selectors';

// Utils
import { configureRequest } from '@src/store/utils';

export default (action$, state$) => action$.pipe(
  ofType(REMOVE_USER_FAVOURITE),
  mergeMap(({ favouriteId, assetId }) => {
    const { auth, config } = state$.value;
    return request(configureRequest(auth, config, {
      endpoint: `${getUserFavouritesUrl(state$.value)}/${favouriteId}`,
      method: 'DELETE',
    }))
      .pipe(
        map(() => removeUserFavouriteSuccess(favouriteId, assetId)),
        catchError(error => rxOf(removeUserFavouriteFailure(error.xhr.response)))
      );
  })
);
