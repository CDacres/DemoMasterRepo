import { Currency, Int, Ref } from '@src/core';
import { AssetCapacity } from './AssetCapacity';
import { AssetImageEdge } from './AssetImageEdge';
import { ProductCategory } from './ProductCategoryMeta';
import { SpaceKind } from './SpaceType';
// import { SpaceStyle } from './SpaceStyle';
import { Product } from './Product';

export type ListingsV1Space = {
  capacity: AssetCapacity;
  category?: ProductCategory;
  currency: Currency;
  description: string;
  id: Ref;
  images: AssetImageEdge[];
  instances: Int;
  kind?: SpaceKind;
  name: string;
  prices: Product[];
  // styles: SpaceStyle[];
  tags: AssetTagEdge[];
  venueId?: Ref;
};

export type AssetTagEdge = {
  tagId: Ref;
  isActive: boolean;
};
