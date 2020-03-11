import { ListingsV1VenueAmenityEdgeInput } from './ListingsV1VenueAmenityEdgeInput';
import { Ref } from '@src/core';

export type ListingsV1UpdateVenueAmenitiesInput = {
  amenities: ListingsV1VenueAmenityEdgeInput[];
  assetId: Ref;
};
