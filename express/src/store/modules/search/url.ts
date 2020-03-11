// Initial state
import { url as getInitialState } from './initial-state';

// Utils
import { createActionCreator, createReducer } from '@src/store/utils';

// Types
import { Store } from '@src/typings/types';

export const SEARCH = 'SEARCH/URL/SEARCH';
export const SEARCH_SUCCESS = 'SEARCH/URL/SEARCH_SUCCESS';
export const SEARCH_FAILURE = 'SEARCH/URL/SEARCH_FAILURE';

export default createReducer(getInitialState(), {
  [SEARCH]: searchReducer,
  [SEARCH_SUCCESS]: searchSuccessReducer,
});

function searchReducer(state: Store.Search.Url) {
  return {
    ...state,
    isSearching: true,
  };
}

function searchSuccessReducer(state: Store.Search.Url, { url }: { url: string }) {
  return {
    ...state,
    isSearching: false,
    url,
  };
}

export const search = createActionCreator(SEARCH, 'href', 'query');
export const searchSuccess = createActionCreator(SEARCH_SUCCESS, 'url');
export const searchFailure = createActionCreator(SEARCH_FAILURE, 'error');
