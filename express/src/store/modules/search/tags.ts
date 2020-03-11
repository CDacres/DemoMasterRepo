// Initial state
import { tags as getInitialState } from './initial-state';

// Utils
import { createActionCreator, createReducer } from '@src/store/utils';

// Types
import { Tag, Tags } from '@src/typings/types';

type FetchTagsSuccessArgs = {
  defaultTags: Tag[];
  tags: Tag[];
};

export const FETCH_TAG_META = 'SEARCH/TAGS/FETCH_TAG_META';
export const FETCH_TAG_META_SUCCESS = 'SEARCH/TAGS/FETCH_TAG_META_SUCCESS';
export const FETCH_TAG_META_FAILURE = 'SEARCH/TAGS/FETCH_TAG_META_FAILURE';
export const FETCH_TAGS = 'SEARCH/TAGS/FETCH_TAGS';
export const FETCH_TAGS_SUCCESS = 'SEARCH/TAGS/FETCH_TAGS_SUCCESS';
export const FETCH_TAGS_FAILURE = 'SEARCH/TAGS/FETCH_TAGS_FAILURE';

export default createReducer(getInitialState(), {
  [FETCH_TAG_META_SUCCESS]: fetchTagMetaSuccessReducer,
  [FETCH_TAGS_SUCCESS]: fetchTagsSuccessReducer,
});

function fetchTagMetaSuccessReducer(state: Tags, { meta }: Tag) {
  return {
    ...state,
    current: meta,
  };
}

function fetchTagsSuccessReducer(state: Tags, { defaultTags, tags }: FetchTagsSuccessArgs) {
  return {
    ...state,
    defaultTags,
    tags,
  };
}

export const fetchTagMeta = createActionCreator(FETCH_TAG_META, 'slug');
export const fetchTagMetaSuccess = createActionCreator(FETCH_TAG_META_SUCCESS, 'meta');
export const fetchTagMetaFailure = createActionCreator(FETCH_TAG_META_FAILURE, 'error');
export const fetchTags = createActionCreator(FETCH_TAGS);
export const fetchTagsSuccess = createActionCreator(FETCH_TAGS_SUCCESS, 'defaultTags', 'tags');
export const fetchTagsFailure = createActionCreator(FETCH_TAGS_FAILURE, 'error');
