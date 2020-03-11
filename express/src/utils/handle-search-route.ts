import qs from 'qs';

// Utils
import { cleanObjectOfUselessFalsyValues } from '@src/utils';

// Types
import { Store } from '@src/typings/types';

type SearchRoute = {
  pathname: string;
  query: Store.Search.Params;
};

export default function handleSearchRoute(params: Store.Search.Params, href?: string): SearchRoute {
  const { date, guests, lat, location, lon, tag } = params;

  const urlParams = { date, guests, lat, lon };

  // Replace the URL with the tag and location-munged url e.g. '/s/meeting/London--UK'
  let pathname = `/s/${tag}/${location}`;

  if (href) {
    pathname = href;
    let query = {};
    if (href.indexOf('?') > -1) {
      const pathnameArr = href.split('?');
      pathname = pathnameArr[0];
      query = qs.parse(pathnameArr[1]);
    }

    return {
      pathname,
      query: cleanObjectOfUselessFalsyValues({
        ...urlParams,
        ...query,
      }),
    };
  }

  if (!location) {
    // If nos location is supplied, append only the tag
    pathname = `/s/${tag}`;
  }

  if (!tag) {
    // If no tag is supplied but a location has been, add location to params for later user
    pathname = `/s`;
    if (location) {
      params.location = location;
    }
  }

  return {
    pathname,
    query: cleanObjectOfUselessFalsyValues(urlParams),
  };
}
