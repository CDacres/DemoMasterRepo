/* tslint:disable:max-line-length */
import moment from 'moment';

// Initial state
import { params as getInitialState } from './initial-state';

// Utils
import { createActionCreator, createReducer } from '@src/store/utils';

// Types
import { Store, Tag } from '@src/typings/types';

export const CLEAR_CONFIGURATIONS = 'SEARCH/PARAMS/CLEAR_CONFIGURATIONS';
export const CLEAR_PRICE_RANGE = 'SEARCH/PARAMS/CLEAR_PRICE_RANGE';
export const SELECT_DATE = 'SEARCH/PARAMS/SELECT_DATE';
export const SELECT_GUEST_OPTION = 'SEARCH/PARAMS/SELECT_GUEST_OPTION';
export const SELECT_LOCATION = 'SEARCH/PARAMS/SELECT_LOCATION';
export const SELECT_TAG = 'SEARCH/PARAMS/SELECT_TAG';
export const SET_AMENITIES = 'SEARCH/PARAMS/SET_AMENITIES';
export const SET_CONFIGURATIONS = 'SEARCH/PARAMS/SET_CONFIGURATIONS';
export const SET_PRICE_RANGE = 'SEARCH/PARAMS/SET_PRICE_RANGE';
export const SET_SEARCH_PARAMS = 'SEARCH/PARAMS/SET_SEARCH_PARAMS';

export default createReducer(getInitialState(), {
  [SELECT_DATE]: selectDateReducer,
  [SELECT_GUEST_OPTION]: selectGuestOptionReducer,
  [SELECT_LOCATION]: selectLocationReducer,
  [SELECT_TAG]: selectTagReducer,
  [SET_SEARCH_PARAMS]: setSearchParamsReducer,
});

function selectDateReducer(state: Store.Search.Params, { date }: { date: moment.Moment }) {
  return {
    ...state,
    date,
  };
}

function selectGuestOptionReducer(state: Store.Search.Params, { guests }: { guests: string }) {
  return {
    ...state,
    guests,
  };
}

function selectLocationReducer(state: Store.Search.Params, { placeId, location, latLon }: { placeId: string; location: string; latLon: object }) {
  return {
    ...state,
    ...latLon,
    placeId,
    location,
  };
}

function selectTagReducer(state: Store.Search.Params, { tag }: { tag: Tag }) {
  return {
    ...state,
    tag,
  };
}

function setSearchParamsReducer(state: Store.Search.Params, { params }: { params: Store.Search.Params }) {
  return {
    ...state,
    ...params,
  };
}

export const selectDate = createActionCreator(SELECT_DATE, 'date');
export const selectGuestOption = createActionCreator(SELECT_GUEST_OPTION, 'guests');
export const selectLocation = createActionCreator(SELECT_LOCATION, 'placeId', 'location', 'latLon');
export const selectTag = createActionCreator(SELECT_TAG, 'tag');
export const setSearchParams = createActionCreator(SET_SEARCH_PARAMS, 'params', 'shouldUpdateUrl');
