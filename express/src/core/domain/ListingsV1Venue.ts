import { AssetImageEdge, DailyHours, ListingsV1Space, Location, MenuInput, Product } from '@src/core/domain';
import { Currency, Ref } from '@src/core';
import { ListingsV1VenueAmenityEdgeInput } from './ListingsV1VenueAmenityEdgeInput';

export type ListingsV1Venue = {
  amenities: ListingsV1VenueAmenityEdgeInput[];
  currency: Currency;
  description: string;
  id: Ref;
  images: AssetImageEdge[];
  location: Location;
  menus: MenuInput[];
  name: string;
  openingHours: DailyHours[];
  packages: Product[];
  venueTypeId: Ref;
  website: string;
};

export type ListingsV1VenueAndSpaces = {
  spaces: ListingsV1Space[];
  venue: ListingsV1Venue;
};
