import { ofType } from 'redux-observable';
import { of as rxOf } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { request } from 'universal-rxjs-ajax';

// Actions
import { FETCH_LANG, fetchLangFailure, fetchLangSuccess } from '@src/store/modules/lang';

// Utils
import { configureRequest } from '@src/store/utils';

// Type constants
import { LANG } from '@src/constants/resourceTypes';

export default (action$, state$) => action$.pipe(
  ofType(FETCH_LANG),
  switchMap(({ page }) => {
    const { auth, config } = state$.value;
    return request(configureRequest(auth, config, {
      endpoint: `${LANG}/${page}`,
      method: 'GET',
    })).pipe(
      map(({ response: lang }) =>
        fetchLangSuccess(lang)
      ),
      catchError(error => rxOf(fetchLangFailure(error.xhr.response)))
    );
  })
);
