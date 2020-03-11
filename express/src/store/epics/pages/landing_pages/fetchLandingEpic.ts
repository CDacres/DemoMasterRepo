import { ofType } from 'redux-observable';
import { of as rxOf } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { request } from 'universal-rxjs-ajax';

// Actions
import { FETCH_LANDING, fetchLandingFailure, fetchLandingSuccess } from '@src/store/modules/pages/landing_pages/location';

// Utils
import { configureRequest } from '@src/store/utils';

// Type constants
import { LANDING } from '@src/constants/resourceTypes';

export default (action$, state$) => action$.pipe(
  ofType(FETCH_LANDING),
  switchMap(({ params: { domain, vertical, location } }) => {
    const { auth, config } = state$.value;
    return request(configureRequest(auth, config, {
      endpoint: LANDING,
      method: 'POST',
      body: {
        domain: domain,
        vertical: vertical,
        location: location,
      },
    })).pipe(
      map(({ response }) =>
        fetchLandingSuccess(response)
      ),
      catchError(error =>
        rxOf(fetchLandingFailure(error.xhr.response))
      )
    );
  })
);
