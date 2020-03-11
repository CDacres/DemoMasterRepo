/* tslint:disable:max-line-length */
import { ProductCategory } from '../../../../../types';
import { Product, ProductBookingParameters, ProductCategory as InternalCategory } from '@src/core/domain';

import {
  fetchListingsData_listingsVenues_spaces_asset_usages as GQLSpaceUsage,
  fetchListingsData_listingsVenues_spaces_asset_usages_products as GQLSpaceProduct,
  fetchListingsData_listingsVenues_asset_usages_products as GQLVenueProduct,
  fetchListingsData_listingsVenues_asset_usages as GQLVenueUsage,
} from '../../types/fetchListingsData';

const gqlCategoryToInternal = (gqlCategory: ProductCategory): InternalCategory => {
  if (gqlCategory === ProductCategory.DEDICATEDDESK || gqlCategory === ProductCategory.HOTDESK) {
    return InternalCategory.OFFICE;
  } else {
    return InternalCategory[gqlCategory];
  }
};

export const gqlProductsToSpaceProducts = (gqlUsage: GQLSpaceUsage | GQLVenueUsage): Product[] => {
  return gqlUsage.products.filter(item => item.perPerson === false).map(gqlProductsToProducts(gqlUsage.category));
};

export const gqlProductsToVenuePackages = (gqlUsages: Array<GQLSpaceUsage | GQLVenueUsage>): Product[] => {
  return gqlUsages.flatMap(gqlUsage => {
    return gqlUsage.products.filter(item => item.perPerson === true).map(gqlProductsToProducts(gqlUsage.category));
  });
};

const gqlProductsToProducts = (gqlCategory: ProductCategory) => (product: GQLSpaceProduct | GQLVenueProduct): Product => {
  const parameters = product.parameters;
  const category = gqlCategoryToInternal(gqlCategory);
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    category,
    parameters: {
      unitPrice: product.unitPrice,
      unit: product.unit,
      coverage: product.coverage,
      schedule: product.context ? product.context.schedule : null,
      constraints: parameters ? parameters.constraints : null,
      depositAmount: parameters ? parameters.depositAmount : null,
      depositPercent: parameters ? parameters.depositPercent : null,
    } as ProductBookingParameters,
    includes: product.includes,
  };
};
