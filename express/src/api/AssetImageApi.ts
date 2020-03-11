import { HttpApi } from './HttpApi';
import { Ref } from '@src/core';

type AssetImageCreateResponse = {
  attributes: {
    created: string;
    is_featured: false;
    large_url: string;
    name: string;
  };
  id: Ref;
  links: {
    self: string;
  };
  type: string;
};

export class AssetImageApi extends HttpApi {
  async create(p: { fileId: Ref; assetId: Ref; imageTypeId: Ref }):
    Promise<AssetImageCreateResponse> {
    const data = {
      data: {
        type: 'asset_images',
        attributes: {
          file_id: p.fileId,
        },
        relationships: {
          asset: {
            data: {
              type: 'assets',
              id: p.assetId,
            },
          },
          type: {
            data: {
              type: 'types',
              id: p.imageTypeId,
            },
          },
        },
      },
    };

    const result = await this.http.post('/api/asset_images', data).then(x => x.data.data);
    // console.log({postAssetImage: result});
    return result;
  }
}
