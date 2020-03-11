import { AnyAction } from 'redux';

// Utils
import { createActionCreator, createReducer } from '@src/store/utils';

// Types
import { Store } from '@src/typings/types';

export const FETCH_BROWSE = 'PAGES/LANDING_PAGES/FETCH_BROWSE';
export const FETCH_BROWSE_SUCCESS = 'PAGES/LANDING_PAGES/FETCH_BROWSE_SUCCESS';
export const FETCH_BROWSE_FAILURE = 'PAGES/LANDING_PAGES/FETCH_BROWSE_FAILURE';

export default createReducer({}, {
  [FETCH_BROWSE_SUCCESS]: fetchBrowseSuccessReducer,
});

function fetchBrowseSuccessReducer(state: Store.Pages.Browse, action: AnyAction) {
  const { data } = action;
  return {
    ...state,
    ...data,
  };
}

export const fetchBrowse = createActionCreator(FETCH_BROWSE, 'params');
export const fetchBrowseSuccess = createActionCreator(FETCH_BROWSE_SUCCESS, 'data');
export const fetchBrowseFailure = createActionCreator(FETCH_BROWSE_FAILURE, 'error');
