import { uid } from '@src/core';

import { gqlSpaceToSpaceKind, gqlVenueUsageToSpaceKind, gqlVenueUsageToSpaceCategory, gqlSpaceToSpaceCategory } from './spaceKind';
import { gqlProductsToSpaceProducts, gqlProductsToVenuePackages } from './products';
import gqlImagesToLocal from './images';
import gqlTagsToLocal from './tags';
import { gqlAmenitiesToLocal, CanGenerateAmenityExclusionI } from './amenities';

import {
  fetchListingsData_listingsVenues as GQLVenue,
} from '../../types/fetchListingsData';

import {
  ListingsV1Space,
  ListingsV1VenueAndSpaces,
} from '@src/core/domain';

type SpaceWithAmenities = ListingsV1Space & CanGenerateAmenityExclusionI;

const requiresSpace = (space: SpaceWithAmenities): boolean => {
  return space.kind !== null && (
    space.amenities.count() > 0
    || space.prices.count() > 0
    || space.capacity.configurations.count() > 0
  );
};

const gqlVenueUsageToLocalSpaces = (venue: GQLVenue): SpaceWithAmenities[] => {
  return venue.asset.usages.map(usage => ({
    id: uid(),
    venueId: venue.asset.id,
    description: usage.description,
    name: usage.name,
    styles: [],
    category: gqlVenueUsageToSpaceCategory(usage),
    kind: gqlVenueUsageToSpaceKind(usage),
    capacity: {
      area: venue.asset.area,
      configurations: usage.context.configurations,
    },
    currency: venue.asset.currency,
    images: [],
    instances: 0,
    prices: gqlProductsToSpaceProducts(usage),
    amenities: usage.context ? usage.context.amenities : [],
    tags: usage.context ? gqlTagsToLocal(usage.context.tags) : [],
  }));
};

const gqlSpacesToLocal = (venue: GQLVenue): SpaceWithAmenities[] => {
  return venue.spaces.map(space => {
    const context = space.asset.usages.first().context;
    return ({
      id: space.asset.id,
      venueId: venue.asset.id,
      description: space.asset.description,
      name: space.asset.name,
      styles: [],
      category: gqlSpaceToSpaceCategory(space),
      kind: gqlSpaceToSpaceKind(space),
      capacity: {
        area: space.asset.area,
        configurations: context ? context.configurations : [],
      },
      currency: venue.asset.currency,
      images: gqlImagesToLocal(space.asset.images),
      instances: space.tableCount,
      prices: gqlProductsToSpaceProducts(space.asset.usages.first()),
      amenities: context ? context.amenities : [],
      tags: context ? gqlTagsToLocal(context.tags) : [],
    });
  }
  );
};

export default (venue: GQLVenue): ListingsV1VenueAndSpaces => {
  const usageSpacesWithAmenities = gqlVenueUsageToLocalSpaces(venue)
    .filter(rawVenueUsageSpace => requiresSpace(rawVenueUsageSpace));
  const spacesWithAmenities = gqlSpacesToLocal(venue).concat(usageSpacesWithAmenities);
  return {
    venue: {
      id: venue.asset.id,
      name: venue.asset.name,
      venueTypeId: venue.details.venueTypeId,
      website: venue.asset.context.website,
      description: venue.asset.description,
      currency: venue.asset.currency,
      openingHours: venue.asset.context.schedule.days,
      location: venue.asset.location,
      packages: gqlProductsToVenuePackages(venue.asset.usages),
      menus: venue.asset.context.menus,
      amenities: gqlAmenitiesToLocal(venue, spacesWithAmenities),
      images: gqlImagesToLocal(venue.asset.images),
    },
    spaces: spacesWithAmenities.map(({ amenities, ...space }) => space),
  };
};
