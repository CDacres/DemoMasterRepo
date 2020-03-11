import { NearbyPlaceType } from '@src/core/domain';
import { Length, toKm, toMile, UnitSystem } from '@src/core';

export type NearbyPlace = {
  distance: Length;
  name: string;
  types?: NearbyPlaceType[];
};

export const walkDistance = (system: UnitSystem, meters: number): string => {
  const walkDistanceString = (distance: number): string => {
    return distance < 0.1 ? '' : `${distance.toFixed(1)}`;
  };
  switch (system) {
    case 'IMPERIAL':
      return walkDistanceString(toMile(meters));
    case 'METRIC':
      return walkDistanceString(toKm(meters));
  }
};
