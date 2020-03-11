import { GeoLocation } from '@src/core';
import { NearbyPlace } from './NearbyPlace';
import { Address } from './Address';

export type Location = {
  address: Address;
  coords: GeoLocation;
  nearbyPlaces?: NearbyPlace[];
  specialInstructions?: string;
};
