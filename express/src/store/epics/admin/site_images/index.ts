import { combineEpics } from 'redux-observable';

import createImageEpic from './createImageEpic';
import uploadImageFileEpic from './uploadImageFileEpic';
import uploadImageUrlEpic from './uploadImageUrlEpic';

export default combineEpics(
  createImageEpic,
  uploadImageFileEpic,
  uploadImageUrlEpic
);
