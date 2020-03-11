import { Int } from '@src/core';
import { MenuPriceOptions } from './MenuPriceOptions';

export type MenuItem = {
  description: string;
  orderIndex: Int;
  priceOptions: MenuPriceOptions[];
};
