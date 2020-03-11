import { CatalogItem } from '@src/core';
import { PriceModel } from './PriceModel';

export type ProductCategoryMeta = CatalogItem<ProductCategory> & {
  allowPackages: boolean;
  description: string;
  // client only
  icon: 'Meeting' | 'Office' | 'Party' | 'Dining' | 'Wedding';
  id: ProductCategory;
  imageSubtitle: string;
  // standard price model --- they are always available
  standardModels: PriceModel[];
  subtitle: string;
  tip: string;
  // user definable price models
  userModels: PriceModel[];
};

export enum ProductCategory {
  MEETING = 'MEETING',
  OFFICE = 'OFFICE',
  PARTY = 'PARTY',
  DINING = 'DINING',
  WEDDING = 'WEDDING',
}
