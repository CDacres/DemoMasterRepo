
import { ofType } from 'redux-observable';
import { of as rxOf } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { request } from 'universal-rxjs-ajax';

// Actions
import { UPLOAD_IMAGE_URL, createImageSuccess, uploadImageFailure } from '@src/store/modules/admin/site_images';

// Utils
import { configureRequest } from '@src/store/utils';

// Constants
import { SITE_IMAGES } from '@src/constants/resourceTypes';

export default (action$, state$) =>
  action$.pipe(
    ofType(UPLOAD_IMAGE_URL),
    switchMap(({ contentType, url }) => {
      const state = state$.value;
      const { auth, config } = state;
      return request(configureRequest(auth, config, {
        endpoint: SITE_IMAGES,
        method: 'POST',
        headers: { 'Content-Type': contentType },
        body: {
          data: {
            attributes: {
              url: url,
            },
          },
        },
      })).pipe(
        map(({ response: { data } }) =>
          createImageSuccess(data)
        ),
        catchError(error => {
          console.log(error); // tslint:disable-line
          return rxOf(uploadImageFailure(error.xhr.response));
        })
      );
    })
  );
