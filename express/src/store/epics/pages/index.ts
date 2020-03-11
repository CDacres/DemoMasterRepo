import { combineEpics } from 'redux-observable';

import browseEpic from './landing_pages/fetchBrowseEpic';
import landingEpic from './landing_pages/fetchLandingEpic';
// import searchEpic from './search';
import widgetEpic from './widget/fetchWidgetRooms';

export default combineEpics(
  browseEpic,
  landingEpic,
  // searchEpic,
  widgetEpic
);
