import { LengthInput } from './LengthInput';
import { NearbyPlaceType } from './NearbyPlaceType';

export type NearbyPlaceInput = {
  distance: LengthInput;
  name: string;
  types: NearbyPlaceType[];
};
