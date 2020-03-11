// Initial state
import { siteImages as getInitialState } from './initial-state';

// Utils
import { createActionCreator, createReducer } from '@src/store/utils';

// Types
import { API, Store } from '@src/typings/types';

export const CREATE_IMAGE = 'ADMIN/SITE_IMAGES/CREATE_IMAGE';
export const CREATE_IMAGE_SUCCESS = 'ADMIN/SITE_IMAGES/CREATE_IMAGE_SUCCESS';
export const CREATE_IMAGE_FAILURE = 'ADMIN/SITE_IMAGES/CREATE_IMAGE_FAILURE';
export const UPLOAD_IMAGE_FILE = 'ADMIN/SITE_IMAGES/UPLOAD_IMAGE_FILE';
export const UPLOAD_IMAGE_URL = 'ADMIN/SITE_IMAGES/UPLOAD_IMAGE_URL';
export const UPLOAD_IMAGE_SUCCESS = 'ADMIN/SITE_IMAGES/UPLOAD_IMAGE_SUCCESS';
export const UPLOAD_IMAGE_FAILURE = 'ADMIN/SITE_IMAGES/UPLOAD_IMAGE_FAILURE';

export default createReducer(getInitialState(), {
  [CREATE_IMAGE_SUCCESS]: createImageSuccessReducer,
  [CREATE_IMAGE_FAILURE]: createImageFailureReducer,
  [UPLOAD_IMAGE_FILE]: uploadImageFileReducer,
  [UPLOAD_IMAGE_URL]: uploadImageUrlReducer,
  [UPLOAD_IMAGE_FAILURE]: uploadImageFailureReducer,
});

function uploadImageFileReducer(state: Store.Admin.SiteImages) {
  return {
    ...state,
    isLoading: true,
  };
}

function uploadImageUrlReducer(state: Store.Admin.SiteImages) {
  return {
    ...state,
    isLoading: true,
  };
}

function uploadImageFailureReducer(state: Store.Admin.SiteImages) {
  return {
    ...state,
    isLoading: false,
  };
}

function createImageSuccessReducer(state: Store.Admin.SiteImages, { image }: { image: API.Responses.SingleResource }) {
  return {
    ...state,
    isLoading: false,
    uploads: [
      ...state.uploads,
      image,
    ],
  };
}

function createImageFailureReducer(state: Store.Admin.SiteImages) {
  return {
    ...state,
    isLoading: false,
  };
}

export const createImage = createActionCreator(CREATE_IMAGE, 'file', 'imageTypeId');
export const createImageSuccess = createActionCreator(CREATE_IMAGE_SUCCESS, 'image');
export const createImageFailure = createActionCreator(CREATE_IMAGE_FAILURE, 'error');
export const uploadImageFile = createActionCreator(UPLOAD_IMAGE_FILE, 'contentType', 'base64', 'imageTypeId');
export const uploadImageUrl = createActionCreator(UPLOAD_IMAGE_URL, 'contentType', 'url');
export const uploadImageSuccess = createActionCreator(UPLOAD_IMAGE_SUCCESS, 'image', 'imageTypeId');
export const uploadImageFailure = createActionCreator(UPLOAD_IMAGE_FAILURE, 'error');
