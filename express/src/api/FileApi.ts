import { HttpApi } from './HttpApi';
import { Ref } from '@src/core';

export class FileApi extends HttpApi {

  async create(contentType: string, data: any, onUploadProgress?: any): Promise<{
    type: string;
    id: Ref;
  }> {
    return await this.http
      .post('/api/file_bucket', data, {
        headers: {
          'Content-Type': contentType,
        },
        timeout: 1000 * 60 * 10,
        onUploadProgress: onUploadProgress,
      })
      .then(x => x.data.data);
  }
}
