/* tslint:disable:max-line-length */
import Router from 'next/router';
import { ofType } from 'redux-observable';
import { concat as rxConcat, from as rxFrom, of as rxOf } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';

// Routes
import routes from '@src/routes';

// Actions
import { setFooterState, setHeaderState } from '@src/store/modules/config';
import { SET_AMENITIES, SET_CONFIGURATIONS, SET_PRICE_RANGE, SET_SEARCH_PARAMS } from '@src/store/modules/search/params';

// Selectors
import { getFullyMungedSearchUrl } from '@src/store/selectors';

// Utils
import { Logger } from '@src/store/utils';

const IS_BROWSER = typeof window !== 'undefined';

export default (action$, state$) =>
  action$.pipe(
    ofType(
      SET_AMENITIES,
      SET_CONFIGURATIONS,
      SET_PRICE_RANGE,
      SET_SEARCH_PARAMS
    ),
    mergeMap(() => {
      if (IS_BROWSER) {
        const route = routes.get('/s');
        const oldRoute = Router.route;
        if (oldRoute === route.filePath) {
          const state = state$.value;
          const url = getFullyMungedSearchUrl(state);
          return rxFrom(Router.push(
            '/search', // Path to page in /pages folder
            url, // What the url should look like
            { shallow: true } // Shallow should be true if you don't want the page to reload on url change
          )).pipe(
            mergeMap(success => {
              if (success) {
                const actions = [rxOf({ type: 'SEARCH/URL/UPDATE_URL_SUCCESS' })];
                if (oldRoute !== route.filePath) {
                  actions.unshift(
                    rxOf(setHeaderState({ floating: true, smallLogo: true, stayAsLink: false, transparent: false, withCheckoutSteps: false, withSearchBar: true })),
                    rxOf(setFooterState({ squashed: true }))
                  );
                }
                return rxConcat(...actions);
              }
              return rxOf({ type: 'SEARCH/URL/UPDATE_URL_FAILURE' });
            }),
            catchError(error => {
              Logger.error(error, { type: SET_SEARCH_PARAMS });
              return rxOf({ type: 'SEARCH/URL/UPDATE_URL_FAILURE' });
            })
          );
        }
      }
      return rxOf({ type: 'SEARCH/URL/UPDATE_URL_NOOP' });
    })
  );
