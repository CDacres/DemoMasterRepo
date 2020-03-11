// Initial state
import { tokens as getInitialState } from '../initial-state';

// Utils
import { createActionCreator, createReducer } from '@src/store/utils';

// Types
import { Store } from '@src/typings/types';

export const SET_DATA_API_TOKEN = 'USER/ACCOUNT/SET_DATA_API_TOKEN';

export default createReducer(getInitialState(), {
  [SET_DATA_API_TOKEN]: setDataApiTokenReducer,
});

function setDataApiTokenReducer(state: Store.Auth.Tokens, { dataApiToken }: { dataApiToken: string }) {
  return {
    ...state,
    dataApi: dataApiToken,
  };
}

export const setDataApiToken = createActionCreator(SET_DATA_API_TOKEN, 'dataApiToken');
