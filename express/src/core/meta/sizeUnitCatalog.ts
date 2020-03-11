import { AreaUnit, Catalog, SizeUnitMeta } from '@src/core';

const _itemsSource: SizeUnitMeta[] = [
  {
    description: 'listing.ft2',
    id: AreaUnit.FT2,
  },
  {
    description: 'listing.m2',
    id: AreaUnit.M2,
  },
];

export const sizeUnitCatalog = new Catalog<SizeUnitMeta>().withItems(_itemsSource);
