import Router from 'next/router';
import { ofType } from 'redux-observable';
import { of as rxOf } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import qs from 'qs';

// Actions
import { TOGGLE_MAP } from '@src/store/modules/pages/search/map';

// Selectors
import { getFullyMungedSearchUrl } from '@src/store/selectors';

const IS_BROWSER = typeof window !== 'undefined';

export default (action$, state$) => action$.pipe(
  ofType(TOGGLE_MAP),
  switchMap(() => {
    if (IS_BROWSER) {
      const state = state$.value;
      const { pages: { search: { map: { isVisible } } } } = state;
      let url = getFullyMungedSearchUrl(state);
      if (isVisible) {
        let query: { [x: string]: any } = {};
        const splitUrl = url.split('?');
        if (url.indexOf('?') > -1) {
          query = qs.parse(splitUrl[1]);
        }
        // tslint:disable-next-line
        query.mapToggle = true;
        url = `${splitUrl[0]}?${qs.stringify(query)}`;
      }
      Router.replace(
        '/search', // Path to page in /pages folder
        url, // What the url should look like
        { shallow: true } // Shallow should be true if you don't want the page to reload on url change
      );
      return rxOf({ type: 'PAGES/SEARCH/MAP/TOGGLE_MAP' });
    }
    return rxOf({ type: 'PAGES/SEARCH/MAP/TOGGLE_MAP_NOOP' });
  })
);
