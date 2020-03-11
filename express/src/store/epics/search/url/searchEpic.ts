import { ofType } from 'redux-observable';
import { concat as rxConcat, of as rxOf } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import qs from 'qs';

// Utils
import { Logger } from '@src/store/utils';
import { cleanObjectOfUselessFalsyValues, getRequestParams, handleRequestParams, handleSearchRoute } from '@src/utils';

// Actions
import { setSearchParams } from '@src/store/modules/search/params';
import { SEARCH, searchSuccess, searchFailure } from '@src/store/modules/search/url';

export default (action$, state$) => action$.pipe(
  ofType(SEARCH),
  switchMap(({ href = '', query: q = {} }) => {
    const {
      config: { domain },
      search: { params },
    } = state$.value;
    const { pathname, query } = handleSearchRoute(params, href);
    const combinedParams = cleanObjectOfUselessFalsyValues({ ...q, ...query });
    const reqInfo = getRequestParams(`/${domain}${pathname}?${qs.stringify(combinedParams)}`);
    const { params: storeParams } = handleRequestParams(reqInfo);
    return rxConcat(
      rxOf(searchSuccess(pathname)),
      rxOf(setSearchParams(storeParams))
    );
  }),
  catchError(error => {
    Logger.error(error, { type: SEARCH });
    return rxOf(searchFailure());
  })
);
