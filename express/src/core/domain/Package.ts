import { Currency, Ref } from '@src/core';
import { ProductCategory } from './ProductCategoryMeta';

export type VenuePackage = {
  category: ProductCategory;
  currency: Currency;
  delegatePrice: number;
  description: string;
  id: Ref;
  includes: Array<{
    description: string;
    orderIndex: number;
  }>;
  name: string;
};
