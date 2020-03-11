import { Float, Int, Ref } from '@src/core';
import { CurrencyAmount, PriceCoverage, PriceModel, ProductPriceSchedule, TimeUnit } from '@src/core/domain';

// and easier object for the ui to present
// a flatter form of ProductBookingParameters with model:priceModel
export type ProductPrice = {
  coverage: PriceCoverage;
  depositAmount?: Float;
  depositPercent?: Float;
  id?: Ref;
  maxDuration?: Int;
  maxPax?: Int;
  minDuration?: Int;
  minPax?: Int;
  minSpendAmount?: Float;
  model: PriceModel;
  name?: string;
  schedule?: ProductPriceSchedule;
  unit: TimeUnit;
  unitPrice?: CurrencyAmount;
};
