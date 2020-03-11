import { ofType } from 'redux-observable';
import { of as rxOf } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { request } from 'universal-rxjs-ajax';

// Actions
import { FETCH_USER_ACCOUNT, fetchUserAccountFailure, fetchUserAccountSuccess } from '@src/store/modules/auth/user';

// Utils
import { configureRequest } from '@src/store/utils';

// Types
import { Store } from '@src/typings/types';

export default (action$, state$) =>
  action$.pipe(
    ofType(FETCH_USER_ACCOUNT),
    switchMap(() => {
      const state = state$.value;
      const { auth, config }: { auth: Store.Auth; config: Store.Config } = state;
      return request(configureRequest(auth, config, {
        endpoint: 'auth/me',
        method: 'GET',
      }))
        .pipe(
          map(({ response: { data: { attributes, id } } }) =>
            fetchUserAccountSuccess({ id, ...attributes })
          ),
          catchError(error => rxOf(fetchUserAccountFailure(error.xhr.response)))
        );
    })
  );
