// Initial state
import { user as getInitialState } from '../initial-state';

// Utils
import { createActionCreator, createReducer } from '@src/store/utils';

// Types
import { Store } from '@src/typings/types';

export const FETCH_USER_ACCOUNT = 'USER/ACCOUNT/FETCH_USER_ACCOUNT';
export const FETCH_USER_ACCOUNT_SUCCESS = 'USER/ACCOUNT/FETCH_USER_ACCOUNT_SUCCESS';
export const FETCH_USER_ACCOUNT_FAILURE = 'USER/ACCOUNT/FETCH_USER_ACCOUNT_FAILURE';

export default createReducer(getInitialState(), {
  [FETCH_USER_ACCOUNT_SUCCESS]: fetchUserAccountSuccessReducer,
});

function fetchUserAccountSuccessReducer(state: Store.Auth.User, { account }: { account: Store.Auth.User }) {
  return {
    ...state,
    ...account,
    adminModeId: 0,
    isLoggedIn: true,
  };
}

export const fetchUserAccount = createActionCreator(FETCH_USER_ACCOUNT);
export const fetchUserAccountSuccess = createActionCreator(FETCH_USER_ACCOUNT_SUCCESS, 'account');
export const fetchUserAccountFailure = createActionCreator(FETCH_USER_ACCOUNT_FAILURE, 'error');
