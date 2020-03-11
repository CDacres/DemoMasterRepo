import { CatalogItem, Ref } from '@src/core';
import { ProductCategory } from './ProductCategoryMeta';
import { AmenityGroup } from './AmenityGroup';

export type AmenityMeta = CatalogItem<Ref> & {
  // custom client meta
  // General group
  amenityGroupId?: AmenityGroup;
  // specifies the section (Amenities / Food&Drinks)
  amenitySectionId?: Ref;
  imageUrl?: string;
  // specifies the productCategories that can have it
  inProductCategories?: ProductCategory[];
  isCustomisable?: boolean;
  isPriceable?: boolean;
};
