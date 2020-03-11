// import { of as rxOf } from 'rxjs';
// import { mergeMap } from 'rxjs/operators';
// import { request } from 'universal-rxjs-ajax';

// // import { pipeFromArray } from '@src/store/utils';
// import { redirect } from '@src/utils';

// const hasRedirect = (({ response: { meta } }) => typeof meta !== 'undefined' && meta.redirectUrl !== null);

// export default function checkRedirect(config: any, actions: any) {
//   const responseObs = request(config);
//   return responseObs.pipe(mergeMap((response) => {
//     if (hasRedirect(response)) {
//       const redirectUrl = response.response.meta[0].redirectUrl;
//       const mobileRedirectUrl = redirectUrl;
//       const domain = 'uk';
//       redirect(response, { domain, mobileRedirectUrl, redirectUrl });
//       return {};
//     } else {
//       return rxOf(response).pipe(...actions);
//       // return pipeFromArray([...actions])(rxOf(response));
//     }
//   }));
// }

export default (() => null);
