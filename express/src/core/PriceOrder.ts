/* tslint:disable:max-line-length */
import { PriceCoverage, Product, TimeUnit } from '@src/core/domain';

export const priceOrder = (prices: Product[]) => {
  return prices.slice().sort((a, b) => {
    if (a.parameters.unit === TimeUnit.HOUR && (b.parameters.unit === TimeUnit.DAY || b.parameters.unit === TimeUnit.SPAN)) {
      return -2;
    } else if ((a.parameters.unit === TimeUnit.DAY && b.parameters.unit === TimeUnit.SPAN) || (a.parameters.coverage === PriceCoverage.MINIMUMSPEND && b.parameters.coverage === PriceCoverage.FLATRATE)) {
      return -1;
    } else if ((a.parameters.unit === TimeUnit.SPAN && b.parameters.unit === TimeUnit.DAY) || (a.parameters.coverage === PriceCoverage.FLATRATE && b.parameters.coverage === PriceCoverage.MINIMUMSPEND)) {
      return 1;
    } else if ((a.parameters.unit === TimeUnit.DAY || a.parameters.unit === TimeUnit.SPAN) && b.parameters.unit === TimeUnit.HOUR) {
      return 2;
    }
    return 0;
  });
};

export const priceOrderNatural = (prices: Product[]) => {
  return prices.slice().sort((a, b) => {
    if (a.parameters.unit === TimeUnit.HOUR && (b.parameters.unit === TimeUnit.DAY || b.parameters.unit === TimeUnit.SPAN)) {
      return -2;
    } else if ((a.parameters.unit === TimeUnit.SPAN && b.parameters.unit === TimeUnit.DAY) || (a.parameters.coverage === PriceCoverage.MINIMUMSPEND && b.parameters.coverage === PriceCoverage.FLATRATE)) {
      return -1;
    } else if ((a.parameters.unit === TimeUnit.DAY && b.parameters.unit === TimeUnit.SPAN) || (a.parameters.coverage === PriceCoverage.FLATRATE && b.parameters.coverage === PriceCoverage.MINIMUMSPEND)) {
      return 1;
    } else if ((a.parameters.unit === TimeUnit.DAY || a.parameters.unit === TimeUnit.SPAN) && b.parameters.unit === TimeUnit.HOUR) {
      return 2;
    }
    return 0;
  });
};
