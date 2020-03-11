import { AmenityGroup, AmenitySection } from '@src/core/domain';
import { Catalog } from '@src/core';

const _itemsSource: AmenitySection[] = [
  {
    amenityGroupIds: [
      AmenityGroup.GENERAL,
      AmenityGroup.OFFICE_AMENITIES,
      AmenityGroup.EQUIPMENTS,
      AmenityGroup.VENUE_STAFF,
      AmenityGroup.OTHER,
      AmenityGroup.EVENING_ENTERTAINMENT,
    ],
    description: 'common.amenities',
    id: 1,
  },
  {
    amenityGroupIds: [
      AmenityGroup.CATERING_LICENCE,
      AmenityGroup.CUISINE,
      AmenityGroup.DIETARY,
    ],
    description: 'listing.food_and_drinks',
    id: 2,
  },
];

export const amenitySectionCatalog = new Catalog<AmenitySection>().withItems(_itemsSource);
