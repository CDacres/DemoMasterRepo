// Utils
import { createActionCreator, createReducer } from '@src/store/utils';

// Types
import { Store } from '@src/typings/types';

export const ADD_ERROR = 'COMMON/ERRORS/ADD_ERROR';
export const REMOVE_ERROR = 'COMMON/ERRORS/REMOVE_ERROR';

export const reducer = createReducer([], {
  [ADD_ERROR]: addErrorReducer,
  [REMOVE_ERROR]: removeErrorReducer,
});

function addErrorReducer(state: Store.Error[], { error }: { error: object }) {
  return [...state, error];
}

function removeErrorReducer(state: Store.Error[], { uid }: { uid: string }) {
  return state.filter(error => error.uid !== uid);
}

export const addError = createActionCreator(ADD_ERROR, 'error');
export const removeError = createActionCreator(REMOVE_ERROR, 'uid');
