import { AddressInput } from './AddressInput';
import { LatLngInput } from './LatLngInput';
import { NearbyPlaceInput } from './NearbyPlaceInput';

export type LocationInput = {
  address: AddressInput;
  coords: LatLngInput;
  nearbyPlaces: NearbyPlaceInput[];
  specialInstructions: string;
};
