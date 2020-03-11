import { combineEpics } from 'redux-observable';

import fetchWidgetRooms from './fetchWidgetRooms';

export default combineEpics(
  fetchWidgetRooms
);
