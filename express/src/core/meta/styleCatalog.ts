import { SpaceKind, SpaceStyle, StyleMeta } from '@src/core/domain';
import { Catalog } from '@src/core';

const _itemsSource: StyleMeta[] = [
  {
    description: 'listing.space_attributes_quirky',
    id: SpaceStyle.QUIRKY,
    spaceKind: SpaceKind.MEETING,
  },
  {
    description: 'listing.space_attributes_luxury',
    id: SpaceStyle.LUXURY,
    spaceKind: SpaceKind.MEETING,
  },
  {
    description: 'listing.space_attributes_corporate',
    id: SpaceStyle.CORPORATE,
    spaceKind: SpaceKind.MEETING,
  },
  {
    description: 'listing.space_attributes_affordable',
    id: SpaceStyle.AFFORDABLE,
    spaceKind: SpaceKind.MEETING,
  },
];

export const styleCatalog = new Catalog<StyleMeta>().withItems(_itemsSource);
