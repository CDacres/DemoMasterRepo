import { AnyAction } from 'redux';

// Utils
import { createActionCreator, createReducer } from '@src/store/utils';

// Types
import { Store } from '@src/typings/types';

export const FETCH_LANDING = 'PAGES/LANDING_PAGES/FETCH_LANDING';
export const FETCH_LANDING_SUCCESS = 'PAGES/LANDING_PAGES/FETCH_LANDING_SUCCESS';
export const FETCH_LANDING_FAILURE = 'PAGES/LANDING_PAGES/FETCH_LANDING_FAILURE';

export default createReducer({}, {
  [FETCH_LANDING_SUCCESS]: fetchLandingSuccessReducer,
});

function fetchLandingSuccessReducer(state: Store.Pages.Landing, action: AnyAction) {
  const { data } = action;
  return {
    ...state,
    ...data,
  };
}

export const fetchLanding = createActionCreator(FETCH_LANDING, 'params');
export const fetchLandingSuccess = createActionCreator(FETCH_LANDING_SUCCESS, 'data');
export const fetchLandingFailure = createActionCreator(FETCH_LANDING_FAILURE, 'error');
