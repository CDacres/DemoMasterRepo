import { Ref } from '@src/core';
import { MenuPriceOptions } from './MenuPriceOptions';
import { MenuGroup } from './MenuGroup';

export type Menu = {
  description: string;
  groups: MenuGroup[];
  id: Ref;
  priceOptions: MenuPriceOptions[];
};
