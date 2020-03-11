import { CatalogItem, Ref } from '@src/core';
import { SpaceKind } from './SpaceType';

export enum SpaceStyle {
  QUIRKY = 'QUIRKY',
  AFFORDABLE = 'AFFORDABLE',
  CORPORATE = 'CORPORATE',
  LUXURY = 'LUXURY',
}

export type StyleMeta = CatalogItem<SpaceStyle> & {
  description: string;
  id: Ref;
  spaceKind: SpaceKind;
};
