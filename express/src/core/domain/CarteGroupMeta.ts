import { CatalogItem, WithOrderIndex } from '@src/core';

export type CarteGroupMeta = {
  placeholder: string;
  tip?: string;
} & CatalogItem<string> & WithOrderIndex;
