import { ProductCategory } from './ProductCategoryMeta';

export type Tag = {
  id: Ref;
  description: string;
};

export type TagCatalogItem = {
  tag: Tag;
  orderIndex: number;
  productCategory: ProductCategory;
};
