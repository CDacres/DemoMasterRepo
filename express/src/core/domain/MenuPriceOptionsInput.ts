import { CurrencyAmountInput } from './CurrencyAmountInput';

export type MenuPriceOptionsInput = {
  description: string;
  kind: string;
  price?: CurrencyAmountInput;
};
