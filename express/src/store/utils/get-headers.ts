const API_VERSION = 1;

// Types
import { Store } from '@src/typings/types';

type Headers = {
  Accept: string;
  'Accept-Language': string;
  Authorization?: string;
  'Content-Type': string;
  'X-Zip-Inflection': string;
};

export default function getHeaders(auth: Store.Auth, config: Store.Config, apiVersion: number = API_VERSION) {
  const { tokens: { dataApi } } = auth;
  const { language } = config;
  const headers: Headers = {
    Accept: `application/vnd.zip_api.v${apiVersion}+json`,
    'Accept-Language': language,
    'Content-Type': 'application/json',
    'X-Zip-Inflection': 'camel',
  };
  if (dataApi) {
    headers.Authorization = `bearer ${dataApi}`;
  }
  return headers;
}
