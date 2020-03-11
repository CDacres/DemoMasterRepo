import axios, { AxiosInstance } from 'axios';
import { HttpApi } from './HttpApi';
import { FileApi } from './FileApi';
import { AuthApi } from './AuthApi';
import { AssetImageApi } from './AssetImageApi';
import { AmenityApi } from './AmenityApi';

class Api extends HttpApi {
  file: FileApi;
  assetImage: AssetImageApi;
  auth: AuthApi;
  amenity: AmenityApi;

  constructor(http: AxiosInstance) {
    super(http);

    this.file = new FileApi(http);
    this.auth = new AuthApi(http);
    this.assetImage = new AssetImageApi(http);
    this.amenity = new AmenityApi(http);
  }
}

const httpClient = axios.create({
  baseURL: 'https://api.zipcube.local',
  timeout: 10000,
});

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYXBpLnppcGN1YmUubG9jYWxcL2F1dGhcL3Rva2VuX2J5X3Nlc3Npb24iLCJpYXQiOjE1NTkyMzI2MDcsImV4cCI6MTU1OTI4MzAwNywibmJmIjoxNTU5MjMyNjA3LCJqdGkiOiJQVHE2Zm96N3F0enlvUUF3Iiwic3ViIjo2LCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3IiwiaXNfYWRtaW4iOmZhbHNlfQ.JLymqvd4UoX6_-QlVUvCqt2J7_4C-W-0FO9xanWIVH4';

httpClient.interceptors.request.use((config) => {
  config.headers['Accept'] = 'application/json';

  // const token = auth.;
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }

  // TODO: fix ..... EPIC
  // if (auth.locale.language)
  //   config.headers['Accept-Language'] = store.locale.language;
  // console.log(config.headers);
  return config;
});

// TODO: load env config
export const api = new Api(httpClient);

export * from './Google';
