import { ofType } from 'redux-observable';
import { of as rxOf } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { request } from 'universal-rxjs-ajax';

// Actions
import { FETCH_BROWSE, fetchBrowseFailure, fetchBrowseSuccess } from '@src/store/modules/pages/landing_pages/browse';

// Utils
import { configureRequest } from '@src/store/utils';

// Type constants
import { BROWSE } from '@src/constants/resourceTypes';

export default (action$, state$) => action$.pipe(
  ofType(FETCH_BROWSE),
  switchMap(({ params: { domain, vertical } }) => {
    const { auth, config } = state$.value;
    return request(configureRequest(auth, config, {
      endpoint: BROWSE,
      method: 'POST',
      body: {
        domain: domain,
        vertical: vertical,
      },
    })).pipe(
      map(({ response }) =>
        fetchBrowseSuccess(response)
      ),
      catchError(error =>
        rxOf(fetchBrowseFailure(error.xhr.response))
      )
    );
  })
);
