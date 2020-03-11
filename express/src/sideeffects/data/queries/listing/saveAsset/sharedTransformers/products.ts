import { Product } from '@src/core/domain';
import { ProductInput } from '../../../../types';
import { AssetType } from '../../sharedTransformers';

export const spaceProductsToGql = (spaceProducts: Product[], assetType: AssetType): ProductInput[] => {
  return spaceProducts.map(product => productToGqlProduct(product, assetType));
};

export const productToGqlProduct = (product: Product, assetType: AssetType): ProductInput => {
  return {
    id: product.id,
    name: product.name,
    unitPrice: product.parameters.unitPrice,
    perPerson: (assetType === 'VENUE' ? true : false),
    unit: product.parameters.unit,
    coverage: product.parameters.coverage,
    description: product.description,
    includes: product.includes,
    parameters: {
      constraints: product.parameters.constraints,
      depositAmount: product.parameters.depositAmount,
      depositPercent: product.parameters.depositPercent,
    },
    context: {
      schedule: product.parameters.schedule,
    },
  };
};
