// Utils
import { createActionCreator, createReducer } from '../../utils';

// Types
import { Store } from '@src/typings/types';

export const FETCH_TAGS = 'SEARCH/TAGS/FETCH_TAGS';
export const FETCH_TAGS_SUCCESS = 'SEARCH/TAGS/FETCH_TAGS_SUCCESS';
export const FETCH_TAGS_FAILURE = 'SEARCH/TAGS/FETCH_TAGS_FAILURE';

export default createReducer({}, {
  [FETCH_TAGS_SUCCESS]: fetchTagsSuccessReducer,
});

function fetchTagsSuccessReducer(state: Store.Tag, { room }: Store.Tag) {
  return {
    ...state,
    room,
  };
}

export const fetchTags = createActionCreator(FETCH_TAGS);
export const fetchTagsSuccess = createActionCreator(FETCH_TAGS_SUCCESS, 'defaultTags', 'tags');
export const fetchTagsFailure = createActionCreator(FETCH_TAGS_FAILURE, 'error');
