import { MenuPriceOptionsInput } from './MenuPriceOptionsInput';
import { MenuGroupInput } from './MenuGroupInput';

export type MenuInput = {
  description: string;
  groups: MenuGroupInput[];
  priceOptions: MenuPriceOptionsInput[];
};
