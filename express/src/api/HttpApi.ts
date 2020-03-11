import { AxiosInstance } from 'axios';

export class HttpApi {
  http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
  }
}
