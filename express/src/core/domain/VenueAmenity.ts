import { Ref } from '@src/core';
import { AmenityMeta } from './AmenityMeta';
import { CurrencyAmount } from './CurrencyAmount';

export type VenueAmenity = {
  amenity: AmenityMeta;
  excludedSpaces: Ref[];
  isActive?: boolean;
  note?: string;
  price?: CurrencyAmount;
  // client-side onLoad
  restrictAvailability?: boolean;
};
