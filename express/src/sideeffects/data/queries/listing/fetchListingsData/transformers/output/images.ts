import {
  fetchListingsData_listingsVenues_asset_images as GQLImageEdge,
} from '../../types/fetchListingsData';

import { AssetImageEdge, ImageSize } from '@src/core/domain';

export default (gqlEdges: GQLImageEdge[]): AssetImageEdge[] => {
  return gqlEdges.map(edge => ({
    image: {
      id: edge.image.id,
      type: edge.image.type,
      tags: [],
      urls: {
        thumbUrl: edge.image.imageUrls.find(i => i.imageSize === ImageSize.SMALL).url,
      },
      downloadLink: edge.image.downloadLink,
    },
    orderIndex: edge.orderIndex,
    description: edge.description,
  }));
};
