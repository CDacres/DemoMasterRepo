import { CatalogItem, WithOrderIndex } from '@src/core';

export enum AmenityGroup {
  'GENERAL' = 'GENERAL',
  'OFFICE_AMENITIES' = 'OFFICE_AMENITIES',
  'EQUIPMENTS' = 'EQUIPMENTS',
  'VENUE_STAFF' = 'VENUE_STAFF',
  'OTHER' = 'OTHER',
  'CATERING_LICENCE' = 'CATERING_LICENCE',
  'CUISINE' = 'CUISINE',
  'DIETARY' = 'DIETARY',
  'EVENING_ENTERTAINMENT' = 'EVENING_ENTERTAINMENT',
}

export type AmenityGroupMeta = CatalogItem<AmenityGroup> & WithOrderIndex & {
  // >0 - enforce max selected amenities within group
  // null|0 - unlimited
  enabledMaxCount?: number;
  expanded?: boolean;
  subtitle?: string;
};
