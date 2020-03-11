import qs from 'qs';

// Types
import { Store, QueryStringObject } from '@src/typings/types';

export default function getUrl(config: Store.Config, endpoint: string, query?: QueryStringObject) {
  const { apiUrl } = config;
  return `${apiUrl}api/${endpoint}?${qs.stringify(query)}`;
}
