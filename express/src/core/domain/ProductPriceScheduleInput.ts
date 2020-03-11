import { Month } from '@src/core';
import { DailyHours } from './Plan';
import { Period } from './Period';

export type ProductPriceScheduleInput = {
  days: DailyHours[];
  months?: Month[];
  period?: Period;
  weeks?: number[];
};
