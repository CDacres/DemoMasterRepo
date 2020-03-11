import { TimeUnit } from './TimeUnit';
import { CatalogItem } from '@src/core';
import { PriceCoverage } from './PriceCoverage';
import { ProductPriceSchedule } from './ProductPriceSchedule';
import { dayIsOpen } from './Plan';
import { ProductPrice } from './ProductPrice';

export type PriceModel = TimeUnit | PriceCoverage | 'HALFDAY';

export const resolvePriceModel = ({ unit, coverage, schedule }: {
  coverage: PriceCoverage;
  schedule: ProductPriceSchedule;
  unit: TimeUnit;
}): PriceModel => {
  const hasAllOpenDaysWithTwoSpans = (schedule) => schedule.days.filter(dayIsOpen).all(x => x.spans.length === 2);
  switch (coverage) {
    case PriceCoverage.FLATRATE:
    case PriceCoverage.MINIMUMSPEND:
      return coverage;
    default:
      return hasAllOpenDaysWithTwoSpans(schedule) && unit === TimeUnit.SPAN ? 'HALFDAY' : unit;
  }
};

export const resolvePriceModelExperimental = ({ unit, coverage }: {
  coverage: PriceCoverage;
  schedule?: ProductPriceSchedule;
  unit: TimeUnit;
}): PriceModel => {
  switch (coverage) {
    case PriceCoverage.FLATRATE:
    case PriceCoverage.MINIMUMSPEND:
      return coverage;
    default:
      return unit === TimeUnit.SPAN ? 'HALFDAY' : unit;
  }
};

export type PriceModelMeta = {
  add: PriceModelAddMeta;
  allowPricingSchedule: boolean;
  // color?: string;
  // priceLabel?: string;
} & CatalogItem<PriceModel>;

export type PriceModelAddMeta = {
  label: string;
  priceDef: Partial<ProductPrice> & {
    model: PriceModel;
    unit: TimeUnit;
    coverage: PriceCoverage;
  };
  tip?: string;
};
