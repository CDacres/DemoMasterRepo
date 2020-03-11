import { ofType } from 'redux-observable';
import { of as rxOf } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { request } from 'universal-rxjs-ajax';

// Actions
import { FETCH_TAG_META, fetchTagMetaFailure, fetchTagMetaSuccess } from '@src/store/modules/search/tags';

// Utils
import { configureRequest } from '@src/store/utils';

// Type constants
import { TAGGING } from '@src/constants/resourceTypes';

export default (action$, state$) => action$.pipe(
  ofType(FETCH_TAG_META),
  switchMap(({ slug }) => {
    const { auth, config } = state$.value;
    return request(configureRequest(auth, config, {
      endpoint: `${TAGGING}/metas_by_slug/${slug}`,
      method: 'GET',
    })).pipe(
      map(({ response: meta }) => fetchTagMetaSuccess(meta || {})),
      catchError(error => rxOf(fetchTagMetaFailure(error.xhr.response)))
    );
  })
);
