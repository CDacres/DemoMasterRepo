import { AssetImageEdge } from '@src/core/domain';
import { AssetImageEdgeInput } from '../../../../types';

export default (assetImages: AssetImageEdge[]): AssetImageEdgeInput[] => {
  return assetImages.map(image => ({
    imageId: image.image.id,
    orderIndex: image.orderIndex,
    description: image.description,
  }));
};
