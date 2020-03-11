// Initial state
import { verticals as getInitialState } from './initial-state';

// Utils
import { createReducer, createActionCreator } from '@src/store/utils';

// Types
import { Store, Tag } from '@src/typings/types';

export const SET_VERTICAL = 'SEARCH/VERTICALS/SET_VERTICAL';

export default createReducer(getInitialState(), {
  [SET_VERTICAL]: setVerticalReducer,
});

function setVerticalReducer(state: Store.Search.Verticals, { vertical }: { vertical: Tag }) {
  return {
    ...state,
    selected: vertical,
  };
}

export const setVertical = createActionCreator(SET_VERTICAL, 'vertical');
