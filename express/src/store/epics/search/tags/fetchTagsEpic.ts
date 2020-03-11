import { ofType } from 'redux-observable';
import { of as rxOf } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { request } from 'universal-rxjs-ajax';

// Actions
import { FETCH_TAGS, fetchTagsFailure, fetchTagsSuccess } from '@src/store/modules/search/tags';

// Utils
import { configureRequest } from '@src/store/utils';

// Type constants
import { SEARCH_LABELS, TAGGING } from '@src/constants/resourceTypes';

export default (action$, state$) => action$.pipe(
  ofType(FETCH_TAGS),
  switchMap(() => {
    const { auth, config } = state$.value;
    return request(configureRequest(auth, config, {
      endpoint: `${TAGGING}/${SEARCH_LABELS}`,
      method: 'GET',
    })).pipe(
      map(({ response: { defaultTags, tags } }) =>
        fetchTagsSuccess(defaultTags, tags)
      ),
      catchError(error => rxOf(fetchTagsFailure(error.xhr.response)))
    );
  })
);
