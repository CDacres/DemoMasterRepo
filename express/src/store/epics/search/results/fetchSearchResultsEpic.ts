/* tslint:disable:max-line-length */
import { ofType } from 'redux-observable';
import { concat as rxConcat, of as rxOf } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { request } from 'universal-rxjs-ajax';

// Actions
import { FETCH_SEARCH_RESULTS, fetchSearchResultsFailed, fetchSearchResultsSuccess } from '@src/store/modules/pages/search/results';
import { toggleMapBoundsHaveChanged, toggleRequiresRefit } from '@src/store/modules/pages/search/map';

// Utils
import { configureRequest } from '@src/store/utils';

// Verticals
import verticals from '@src/components/Search/verticals';

export default (action$, state$) =>
  action$.pipe(
    ofType(FETCH_SEARCH_RESULTS),
    mergeMap(({ options }) => {
      const state = state$.value;
      const { auth, config, pages: { search: { map: { bounds } } }, search: { params, verticals: { selected } } } = state;
      const vertical = new verticals[`${selected.tagId || 1}`]();
      return request(configureRequest(auth, config, {
        endpoint: vertical.buildSearchUrl({ ...bounds, ...params }),
        method: 'GET',
      })).pipe(
        mergeMap(({ response: { results, search } }) => {
          const actions = [
            rxOf(toggleMapBoundsHaveChanged(false)),
            rxOf(fetchSearchResultsSuccess(results, search, options)),
          ];
          if (options.requiresRefit) {
            actions.unshift(rxOf(toggleRequiresRefit(true)));
          }
          return rxConcat(...actions);
        }),
        catchError(error => {
          console.log(error); // tslint:disable-line
          return rxOf(fetchSearchResultsFailed(error.xhr.response));
        })
      );
    })
  );
