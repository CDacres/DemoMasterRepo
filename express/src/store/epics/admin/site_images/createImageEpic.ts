import { ofType } from 'redux-observable';
import { of as rxOf } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { request } from 'universal-rxjs-ajax';

// Actions
import { UPLOAD_IMAGE_SUCCESS, createImageSuccess, createImageFailure } from '@src/store/modules/admin/site_images';

// Utils
import { configureRequest } from '@src/store/utils';

// Constants
import { SITE_IMAGES } from '@src/constants/resourceTypes';

export default (action$, state$) =>
  action$.pipe(
    ofType(UPLOAD_IMAGE_SUCCESS),
    switchMap(({ image: { id }, imageTypeId }) => {
      const state = state$.value;
      const { auth, config } = state;
      return request(configureRequest(auth, config, {
        endpoint: SITE_IMAGES,
        method: 'POST',
        body: {
          data: {
            type: SITE_IMAGES,
            attributes: {
              fileId: id,
            },
          },
          relationships: {
            type: {
              id: imageTypeId,
            },
          },
        },
      })).pipe(
        map(({ response: { data } }) =>
          createImageSuccess(data)
        ),
        catchError(error => {
          console.log(error); // tslint:disable-line
          return rxOf(createImageFailure(error.xhr.response));
        })
      );
    })
  );
