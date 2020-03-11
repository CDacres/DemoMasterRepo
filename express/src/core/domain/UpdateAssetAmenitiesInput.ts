import { Ref } from '@src/core';
import { AssetAmenityEdgeInput } from './AssetAmenityEdgeInput';

export type UpdateAssetAmenitiesInput = {
  amenities: AssetAmenityEdgeInput[];
  assetId: Ref;
};
