import { AnyAction } from 'redux';

// Utils
import { createActionCreator, createReducer } from '@src/store/utils';

// Types
import { Store } from '@src/typings/types';

export const FETCH_WIDGET = 'PAGES/WIDGET/FETCH_WIDGET';
export const FETCH_WIDGET_SUCCESS = 'PAGES/WIDGET/FETCH_WIDGET_SUCCESS';

export default createReducer({}, {
  [FETCH_WIDGET_SUCCESS]: fetchWidgetSuccessReducer,
});

function fetchWidgetSuccessReducer(state: Store.Pages.Widget, action: AnyAction) {
  const { data } = action;
  return {
    ...state,
    ...data,
  };
}

export const fetchWidget = createActionCreator(FETCH_WIDGET, 'url');
export const fetchWidgetSuccess = createActionCreator(FETCH_WIDGET_SUCCESS, 'data');
