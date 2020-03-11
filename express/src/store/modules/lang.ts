// Utils
import { createActionCreator, createReducer } from '@src/store/utils';

// Types
import { Store } from '@src/typings/types';

export const FETCH_LANG = 'LANG/FETCH_LANG';
export const FETCH_LANG_SUCCESS = 'LANG/FETCH_LANG_SUCCESS';
export const FETCH_LANG_FAILURE = 'LANG/FETCH_LANG_FAILURE';

export const reducer = createReducer({}, {
  [FETCH_LANG_SUCCESS]: fetchLangSuccessReducer,
});

function fetchLangSuccessReducer(state: Store.Lang, { lang, page }: { lang: object; page: string }) {
  if (typeof lang !== 'undefined') {
    return {
      ...state,
      [page]: lang,
    };
  }
  return state;
}

export const fetchLang = createActionCreator(FETCH_LANG, 'page');
export const fetchLangSuccess = createActionCreator(FETCH_LANG_SUCCESS, 'lang', 'page');
export const fetchLangFailure = createActionCreator(FETCH_LANG_FAILURE, 'error');
