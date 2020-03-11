import { Int } from '@src/core';
import { MenuPriceOptionsInput } from './MenuPriceOptionsInput';

export type MenuItemInput = {
  description: string;
  orderIndex: Int;
  priceOptions: MenuPriceOptionsInput[];
};
