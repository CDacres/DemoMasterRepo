import { DailyHours } from './Plan';
import { Period } from './Period';
import { Month } from '@src/core';

export type ProductPriceSchedule = {
  days: DailyHours[];
  months?: Month[];
  period?: Period;
  weeks?: number[];
};
