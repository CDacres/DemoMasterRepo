// import normalize from 'json-api-normalizer';

// Initial state
import { placeholderResults, results as getInitialState } from './initial-state';

// Utils
import { createActionCreator, createReducer } from '@src/store/utils';

// Types
import { SearchObject, Store } from '@src/typings/types';

type FetchSearchResultsReducerArgs = {
  options: Options;
};
type FetchSearchResultsSuccessReducerArgs = {
  options: Options;
  results: Store.Pages.Search.Results;
  search: SearchObject;
};
type Options = {
  infinite: boolean;
  paginating: boolean;
};

export const FETCH_SEARCH_RESULTS = 'PAGES/SEARCH/RESULTS/FETCH_SEARCH_RESULTS';
export const FETCH_SEARCH_RESULTS_SUCCESS = 'PAGES/SEARCH/RESULTS/FETCH_SEARCH_RESULTS_SUCCESS';
export const FETCH_SEARCH_RESULTS_FAILURE = 'PAGES/SEARCH/RESULTS/FETCH_SEARCH_RESULTS_FAILURE';

export default createReducer(getInitialState(), {
  [FETCH_SEARCH_RESULTS]: fetchSearchResultsReducer,
  [FETCH_SEARCH_RESULTS_SUCCESS]: fetchSearchResultsSuccessReducer,
});

function fetchSearchResultsReducer(
  state: Store.Pages.Search.Results,
  { options: { infinite, paginating } }: FetchSearchResultsReducerArgs
) {
  const placeholders = placeholderResults();
  const data = (paginating && infinite) ? [...state.data, ...placeholders] : placeholders;
  return {
    ...state,
    data,
    isFetching: true,
  };
}

function fetchSearchResultsSuccessReducer(
  state: Store.Pages.Search.Results,
  { options: { infinite, paginating }, results, search }: FetchSearchResultsSuccessReducerArgs
) {
  const { currentPage, from, lastPage, nextPageUrl, path, perPage, prevPageUrl, to, total } = results;
  const data = (paginating && infinite) ? [
    ...state.data.slice(0, state.data.length - 24), ...results.data,
  ] : results.data;
  return {
    ...state,
    currentPage: paginating ? currentPage : state.currentPage,
    data,
    from: (paginating && infinite) ? state.from : from,
    isFetching: false,
    lastPage,
    nextPageUrl: paginating ? nextPageUrl : state.nextPageUrl,
    path,
    perPage,
    prevPageUrl,
    searchObject: search,
    to: paginating ? to : state.to,
    total,
  };
}

export const fetchSearchResults = createActionCreator(FETCH_SEARCH_RESULTS, 'options');
export const fetchSearchResultsSuccess =
  createActionCreator(FETCH_SEARCH_RESULTS_SUCCESS, 'results', 'search', 'options');
export const fetchSearchResultsFailed = createActionCreator(FETCH_SEARCH_RESULTS_FAILURE, 'error');
