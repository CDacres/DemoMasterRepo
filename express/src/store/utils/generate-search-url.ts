import qs from 'qs';
import { omit } from 'lodash';

// Utils
import { cleanObjectOfUselessFalsyValues, isObjectJustEmptyValues } from '@src/utils';

// Types
import { Bounds, Location, Store } from '@src/typings/types';

export default function generateSearchUrl(
  defaultLocation: Location,
  params: Store.Search.Params,
  bounds: Bounds,
  defaultTagSlug: string
) {
  const { location, tag, ...cleanParams } = params;
  const { locationSlug } = defaultLocation;
  const hasTag = !!tag;
  const hasLocation = !!location;

  let query: Store.Search.Params = cleanObjectOfUselessFalsyValues({
    ...cleanParams,
    ...bounds,
  });

  if (query.page === 1) {
    query = omit(query, 'page');
  }

  const finalLocationSlug = hasLocation ? location : locationSlug;
  const finalTagSlug = hasTag ? tag : defaultTagSlug;
  let url = `/s/${finalTagSlug}/${finalLocationSlug}`;

  if (query && !isObjectJustEmptyValues(query)) {
    url = `${url}${qs.stringify(query, { addQueryPrefix: true, arrayFormat: 'brackets' })}`;
  }

  return url;
}
