import { CatalogItem, Ref } from '@src/core';

export type VenueType = CatalogItem<Ref> & {
  description: string;
  id: Ref;
};
