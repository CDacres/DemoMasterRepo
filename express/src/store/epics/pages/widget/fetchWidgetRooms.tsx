import { ofType } from 'redux-observable';
import { catchError, map, switchMap } from 'rxjs/operators';
import { request } from 'universal-rxjs-ajax';
// import qs from 'qs';

// Actions
import { FETCH_WIDGET, fetchWidgetSuccess } from '@src/store/modules/pages/widget';

// Utils
import { configureRequest } from '@src/store/utils';

// Type constants
import { WIDGET } from '@src/constants/resourceTypes';

export default (action$, state$) => action$.pipe(
  ofType(FETCH_WIDGET),
  switchMap(({
    // url
  }) => {
    const { auth, config } = state$.value;
    // let query = {};
    // if (url.indexOf('?') > -1) {
    //   const urlArr = url.split('?');
    //   query = qs.parse(urlArr[1]);
    // }
    const token = ''; // quick fix for linting
    // if (typeof query['token'] !== 'undefined') {
    //   token = query['token'];
    // }
    // if (typeof query['search_filters'] !== 'undefined' && typeof query['search_filters']['token'] !== 'undefined') {
    //   token = query['search_filters']['token'];
    // }
    return request(configureRequest(auth, config, {
      endpoint: `${WIDGET}/${config.domain}/${token}`,
      method: 'GET',
    })).pipe(
      map(({ response }) =>
        fetchWidgetSuccess(response)
      ),
      catchError(error => {
        throw (error);
      })
    );
  })
);
