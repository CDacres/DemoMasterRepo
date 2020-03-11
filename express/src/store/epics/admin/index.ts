import { combineEpics } from 'redux-observable';

import siteImagesEpic from './site_images';

export default combineEpics(
  siteImagesEpic
);
