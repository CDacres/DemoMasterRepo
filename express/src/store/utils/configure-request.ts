// Utils
import { getHeaders, getUrl } from '@src/store/utils';

// Types
import { Store, SearchQueryObject } from '@src/typings/types';

type RequestOptions = SearchQueryObject & {
  apiVersion?: number;
  body?: {
    [propName: string]: any;
  };
  endpoint: string;
  headers?: {
    [propName: string]: string | number;
  };
  method: string;
  responseType?: string;
};
type RequestSettings = {
  body?: {
    [propName: string]: any;
  };
  headers: {
    [propName: string]: string | number;
  };
  method: string;
  responseType: string;
  url: string;
};

export default function configureRequest(
  auth: Store.Auth,
  config: Store.Config,
  {
    apiVersion,
    body,
    endpoint,
    headers,
    method,
    responseType,
  }: RequestOptions
): RequestSettings {
  const settings: RequestSettings = {
    headers: {
      ...headers,
      ...getHeaders(auth, config, apiVersion),
    },
    method,
    responseType: responseType ? responseType : 'json',
    url: getUrl(config, endpoint),
  };
  if (body) {
    settings.body = body;
  }
  return settings;
}
