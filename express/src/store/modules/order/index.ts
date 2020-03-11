import { createActionCreator, createReducer } from '../../utils';
import { initialState } from './initial-state';

// Types
import { Store } from '@src/typings/types';

export const ORDER = 'ORDER';
export const ORDER_MSG = 'ORDER_MSG';
export const VIEWING_DETAILS = 'VIEWING_DETAILS';
export const BACK_TO_VIEWING = 'BACK_TO_VIEWING';
export const BOOKING_INFO = 'BOOKING_INFO';

export const reducer = createReducer( initialState, {
  [ORDER]: orderReducer,
  [VIEWING_DETAILS]: orderViewReducer,
  [ORDER_MSG]: orderMsgReducer,
  [BACK_TO_VIEWING]: stepBackReducer,
  [BOOKING_INFO]: bookRoomReducer,
});

function orderReducer(state: Store.Tag, {}: Store.Tag) {
  return {
    ...state,
  };
}

function orderViewReducer(state: Store.Tag, { viewingDetails }: Store.Tag) {
  return {
    ...state,
    viewingConfirmed: true,
    viewingDetails,
  };
}

function orderMsgReducer(state: Store.Tag, { msg }: Store.Tag) {
  return {
    ...state,
    viewingConfirmed: true,
    msg,
  };
}

function stepBackReducer(state: Store.Tag, {}: Store.Tag) {
  const newState = { ...state };
  delete newState.viewingDetails;
  delete newState.msg;
  return {
    ...newState,
    viewingConfirmed: false,
  };
}

function bookRoomReducer(state: Store.Tag, { bookingData }: Store.Tag) {
  return {
    ...state,
    bookingData,
  };
}

export const order = createActionCreator(ORDER);
export const viewing = createActionCreator(VIEWING_DETAILS, 'viewingDetails');
export const orderMsg = createActionCreator(ORDER_MSG, 'msg');
export const backToViewing = createActionCreator(BACK_TO_VIEWING);
export const booking = createActionCreator(BOOKING_INFO, 'bookingData');
