import { CatalogItem } from '@src/core';
import { Float } from './Scalar';

export type UnitSystem = 'METRIC' | 'IMPERIAL';

export const toMile = (meters: number): number => (meters / 1609.344);
export const toKm = (meters: number): number => (meters / 1000);

// TODO: move to config
export const resolveUnitSystem = (domain: string): UnitSystem => {
  switch (domain) {
    case 'ie':
    case 'us':
    case 'uk':
      return 'IMPERIAL';
    default:
      return 'METRIC';
  }
};

export type Length = {
  unit: LengthUnit;
  value: number;
};

export type Area = {
  unit: AreaUnit;
  value: Float;
};

export enum AreaUnit {
  M2 = 'M2',
  FT2 = 'FT2',
}

export enum LengthUnit {
  METER = 'METER',
  FEET = 'FEET',
}

export type SizeUnitMeta = {
  description: string;
  id: AreaUnit;
} & CatalogItem<AreaUnit>;
