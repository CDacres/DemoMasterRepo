import qs from 'qs';

import convertArrayToObject from './convert-array-to-object';

export default function getRequestParams(url: string): { [x: string]: any } {
  let paramArr = url.split('/').slice(2);
  let query = {};
  if (url.indexOf('?') > -1) {
    const urlArr = url.split('?');
    paramArr = urlArr[0].split('/').slice(2);
    query = qs.parse(urlArr[1]);
  }
  const params = convertArrayToObject(paramArr);
  return {
    params,
    query,
  };
}
