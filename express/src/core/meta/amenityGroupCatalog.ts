import { AmenityGroup, AmenityGroupMeta } from '@src/core/domain';
import { Catalog } from '@src/core';

const _itemsSource: AmenityGroupMeta[] = [
  {
    description: 'listing.facilities_general',
    expanded: true,
    id: AmenityGroup.GENERAL,
    orderIndex: 0,
  },
  {
    description: 'listing.facilities_office',
    expanded: true,
    id: AmenityGroup.OFFICE_AMENITIES,
    orderIndex: 1,
  },
  {
    description: 'listing.facilities_equipment',
    expanded: true,
    id: AmenityGroup.EQUIPMENTS,
    orderIndex: 2,
  },
  {
    description: 'listing.facilities_venue_staff',
    expanded: true,
    id: AmenityGroup.VENUE_STAFF,
    orderIndex: 3,
  },
  {
    description: 'listing.facilities_other',
    expanded: true,
    id: AmenityGroup.OTHER,
    orderIndex: 4,
  },
  {
    description: 'listing.catering_licence',
    expanded: true,
    id: AmenityGroup.CATERING_LICENCE,
    orderIndex: 5,
  },
  {
    description: 'listing.cuisine',
    enabledMaxCount: 3,
    expanded: false,
    id: AmenityGroup.CUISINE,
    orderIndex: 6,
    subtitle: 'listing.amenity_cuisine_limit_up_to_3',
  },
  {
    description: 'listing.dietary',
    expanded: true,
    id: AmenityGroup.DIETARY,
    orderIndex: 7,
  },
  {
    description: 'listing.evening_entertainment',
    expanded: true,
    id: AmenityGroup.EVENING_ENTERTAINMENT,
    orderIndex: 8,
  },
];

export const amenityGroupCatalog = new Catalog<AmenityGroupMeta>().withItems(_itemsSource);
