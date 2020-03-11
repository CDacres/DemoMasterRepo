import Router from 'next/router';
import { ofType } from 'redux-observable';
import { from as rxFrom, of as rxOf } from 'rxjs';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import qs from 'qs';

// Utils
import { Logger } from '@src/store/utils';

// Actions
import { NAVIGATE, navigateSuccess, navigateFailure } from '@src/store/modules/config';

// Types
import { Route } from '@src/typings/types';

type Payload = {
  route: Route;
  options: {
    scroll?: boolean;
  };
};

export default (action$, state$) => action$.pipe(
  ofType(NAVIGATE),
  switchMap(({ route, options = {} }: Payload) => {
    const { config: { domain } } = state$.value;
    let pathname = route.pathname;
    let query = {};
    if (route.pathname.indexOf('?') > -1) {
      const pathnameArr = route.pathname.split('?');
      pathname = pathnameArr[0];
      query = qs.parse(pathnameArr[1]);
    }
    return rxFrom(Router.push(
      {
        pathname: route.filePath,
      },
      {
        pathname: `/${domain}${pathname}`,
        query,
      }
    )).pipe(
      mergeMap(success => {
        if (success) {
          if (options.scroll) {
            window.scrollTo(0, 0);
            document.body.focus();
          }
          return rxOf(navigateSuccess());
        }
        return rxOf(navigateFailure());
      }),
      catchError(error => {
        Logger.error(error, { type: NAVIGATE });
        return rxOf(navigateFailure());
      })
    );
  })
);
