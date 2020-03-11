import { BookingRestraints, CurrencyAmount, PriceCoverage, ProductPriceSchedule, TimeUnit } from '@src/core/domain';
import { Float } from '@src/core';

export type ProductBookingParameters = {
  constraints?: BookingRestraints;
  coverage: PriceCoverage;
  depositAmount?: CurrencyAmount;
  depositPercent?: Float;
  schedule?: ProductPriceSchedule;
  unit: TimeUnit;
  unitPrice?: CurrencyAmount;
};
