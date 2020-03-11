import { ProductCategoryMeta } from './ProductCategoryMeta';
import { VenuePackage } from './Package';
import { ListingsV1Space } from './ListingsV1Space';

export type SpaceGroup = {
  packages: VenuePackage[];
  productCategory: ProductCategoryMeta;
  spaces: ListingsV1Space[];
};
