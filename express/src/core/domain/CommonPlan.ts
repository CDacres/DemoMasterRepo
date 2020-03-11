import { CatalogItem, Ref } from '@src/core';
import { DailyHours } from './Plan';

export type CommonPlan = {
  description: string;
  id: string;
  openingHours: DailyHours[];
} & CatalogItem<Ref>;
