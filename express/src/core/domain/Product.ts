import { ProductCategory } from './ProductCategoryMeta';
import { ID } from '@src/core';
import { ProductBookingParameters } from './ProductBookingParameters';

export type Product = {
  category: ProductCategory;
  description?: string;
  id: ID;
  includes?: ProductItem[];
  name?: string;
  parameters?: ProductBookingParameters;
  perPerson?: boolean;
};

export type ProductItem = {
  description: string;
  orderIndex: number;
};
