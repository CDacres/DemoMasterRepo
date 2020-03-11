import { CatalogItem, Ref } from '@src/core';
import { AmenityGroup } from './AmenityGroup';

export type AmenitySection = {
  amenityGroupIds: AmenityGroup[];
  description: string;
  id: Ref;
} & CatalogItem<Ref>;
