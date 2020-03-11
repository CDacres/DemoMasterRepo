// Types
import { API } from '@src/typings/types';

export as namespace API;
declare namespace API {
  interface Request {
    data: {
      type: string;
      id: string;
      attributes: {
        [x: string]: any;
      };
    };
    relationships?: {
      [x: string]: any;
    };
  }

  interface Response {
    data: API.Responses.SingleResource | API.Responses.MultipleResources;
    links: {
      self: string;
      [x: string]: string;
    };
  }
}
