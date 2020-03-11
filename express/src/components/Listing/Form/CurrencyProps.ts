// Core
import { currencyCatalog } from '@src/core/meta';
import { CurrencyAmount } from '@src/core/domain';

export type CurrencyProps = {
  currency: string;
};

export const currencySymbol = (currencyCode: string) => {
  const meta = currencyCatalog.byId[currencyCode];
  return meta && meta.symbol || currencyCode;
};

export const cash = ({ currency, value }: CurrencyAmount): string => `${currencySymbol(currency)}${value}`;
