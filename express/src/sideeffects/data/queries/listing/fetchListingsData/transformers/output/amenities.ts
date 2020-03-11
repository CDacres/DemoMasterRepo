import {
  fetchListingsData_listingsVenues as GQLVenue,
  fetchListingsData_listingsVenues_asset_usages_context_amenities as GQLVenueSpaceAmenities,
  fetchListingsData_listingsVenues_spaces_asset_context_amenities as GQLSpaceAmenities,
} from '../../types/fetchListingsData';

import { ListingsV1VenueAmenityEdgeInput } from '@src/core/domain';

export interface CanGenerateAmenityExclusionI {
  id: Ref;
  amenities: Array<GQLVenueSpaceAmenities | GQLSpaceAmenities>;
}

const generateExclusions = (venueAmenityId: Ref, exclusionGenerators: CanGenerateAmenityExclusionI[]): Ref[] => {
  return exclusionGenerators.flatMap(({ amenities, id: spaceId }) =>
    amenities
      .filter(amenity => amenity.suppressed === true)
      .flatMap(({ amenity: { id: amenityId } }) => ({ amenityId, spaceId }))
  )
    .filter(candidate => candidate.amenityId === venueAmenityId)
    .map(exclusion => exclusion.spaceId);
};

export const gqlAmenitiesToLocal = (
  venue: GQLVenue, exclusionGenerators: CanGenerateAmenityExclusionI[])
  : ListingsV1VenueAmenityEdgeInput[] => {
  return venue.asset.context.amenities.map(entry => ({
    amenityId: entry.amenity.id,
    excludedSpaces: generateExclusions(entry.amenity.id, exclusionGenerators),
    isActive: !entry.suppressed,
    note: entry.note,
    price: entry.price,
  }));
};
