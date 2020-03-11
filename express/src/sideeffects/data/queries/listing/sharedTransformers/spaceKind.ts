import { SpaceKind, ProductCategory as InternalCategory } from '@src/core/domain';
import { find } from 'lodash';
import { ProductCategory } from '../../../types';
import { AssetType } from './';

type KindTuple = {
  kind: SpaceKind;
  category: ProductCategory;
  assetType: AssetType;
  internalCategory: InternalCategory;
};

export const kindMap: KindTuple[] = [
  {
    kind: SpaceKind.MEETING,
    category: ProductCategory.MEETING,
    internalCategory: InternalCategory.MEETING,
    assetType: 'SPACE',
  },
  {
    kind: SpaceKind.OFFICE_DEDICATEDDESK,
    category: ProductCategory.DEDICATEDDESK,
    internalCategory: InternalCategory.OFFICE,
    assetType: 'SPACE',
  },
  {
    kind: SpaceKind.OFFICE_HOTDESK,
    category: ProductCategory.HOTDESK,
    internalCategory: InternalCategory.OFFICE,
    assetType: 'SPACE',
  },
  {
    kind: SpaceKind.OFFICE_DEDICATEDDESK,
    category: ProductCategory.DEDICATEDDESK,
    internalCategory: InternalCategory.OFFICE,
    assetType: 'TABLE',
  },
  {
    kind: SpaceKind.OFFICE_HOTDESK,
    category: ProductCategory.HOTDESK,
    internalCategory: InternalCategory.OFFICE,
    assetType: 'TABLE',
  },
  {
    kind: SpaceKind.OFFICE_PRIVATE,
    category: ProductCategory.OFFICE,
    internalCategory: InternalCategory.OFFICE,
    assetType: 'SPACE',
  },
  {
    kind: SpaceKind.PARTY_SPACE,
    category: ProductCategory.PARTY,
    internalCategory: InternalCategory.PARTY,
    assetType: 'SPACE',
  },
  {
    kind: SpaceKind.PARTY_TABLE,
    category: ProductCategory.PARTY,
    internalCategory: InternalCategory.PARTY,
    assetType: 'TABLE',
  },
  {
    kind: SpaceKind.PARTY_VENUE,
    category: ProductCategory.PARTY,
    internalCategory: InternalCategory.PARTY,
    assetType: 'VENUE',
  },
  {
    kind: SpaceKind.DINING_SPACE,
    category: ProductCategory.DINING,
    internalCategory: InternalCategory.DINING,
    assetType: 'SPACE',
  },
  {
    kind: SpaceKind.DINING_TABLE,
    category: ProductCategory.DINING,
    internalCategory: InternalCategory.DINING,
    assetType: 'TABLE',
  },
  {
    kind: SpaceKind.DINING_VENUE,
    category: ProductCategory.DINING,
    internalCategory: InternalCategory.DINING,
    assetType: 'VENUE',
  },
  {
    kind: SpaceKind.WEDDING_SPACE,
    category: ProductCategory.WEDDING,
    internalCategory: InternalCategory.WEDDING,
    assetType: 'SPACE',
  },
  {
    kind: SpaceKind.WEDDING_VENUE,
    category: ProductCategory.WEDDING,
    internalCategory: InternalCategory.WEDDING,
    assetType: 'VENUE',
  },
];

export const kindToGqlCategory = (kind: SpaceKind): ProductCategory => {
  return find(kindMap, { kind }).category;
};
