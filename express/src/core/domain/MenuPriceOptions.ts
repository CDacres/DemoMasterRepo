import { CurrencyAmount } from './CurrencyAmount';

export type MenuPriceOptions = {
  description: string;
  kind: 'STD' | 'HAPPY' | string;
  price: CurrencyAmount;
};
