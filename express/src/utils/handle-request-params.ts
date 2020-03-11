// Types
import { Bounds, ReqInfo, Store } from '@src/typings/types';

type RetObj = {
  bounds?: Bounds;
  params: Store.Search.Params;
};

export default function handleRequestParams(reqInfo: ReqInfo): RetObj {
  const { '1': tagSlug, '2': locationSlug } = reqInfo.params;

  const retObj: RetObj = {
    params: {},
  };

  if (reqInfo.query) {
    // If query contains bounds
    if (reqInfo.query.swLat) {
      const { neLat, neLon, swLat, swLon, ...others } = reqInfo.query;
      // then put them in to a bounds object to return
      retObj.bounds = { neLat, neLon, swLat, swLon };
      // Add remaining query params object to params
      retObj.params = others;
    } else {
      retObj.params = reqInfo.query;
    }
  }

  if (locationSlug) {
    retObj.params.location = locationSlug;
  }

  if (tagSlug) {
    retObj.params.tag = tagSlug;
  }

  return retObj;
}
