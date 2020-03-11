
import { ofType } from 'redux-observable';
import { of as rxOf } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { request } from 'universal-rxjs-ajax';

// Actions
import { UPLOAD_IMAGE_FILE, uploadImageSuccess, uploadImageFailure } from '@src/store/modules/admin/site_images';

// Utils
import { configureRequest } from '@src/store/utils';

export default (action$, state$) =>
  action$.pipe(
    ofType(UPLOAD_IMAGE_FILE),
    switchMap(({ base64, contentType, imageTypeId }) => {
      const state = state$.value;
      const { auth, config } = state;
      return request(configureRequest(auth, config, {
        endpoint: 'file_bucket',
        method: 'POST',
        headers: { 'Content-Type': contentType },
        body: base64,
      })).pipe(
        map(({ response: { data } }) =>
          uploadImageSuccess(data, imageTypeId)
        ),
        catchError(error => {
          console.log(error); // tslint:disable-line
          return rxOf(uploadImageFailure(error.xhr.response));
        })
      );
    })
  );
