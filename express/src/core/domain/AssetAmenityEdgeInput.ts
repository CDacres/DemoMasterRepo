import { Ref } from '@src/core';
import { CurrencyAmountInput } from './CurrencyAmountInput';

export type AssetAmenityEdgeInput = {
  amenityId: Ref;
  assetId: Ref;
  isActive: boolean;
  note: string;
  price: CurrencyAmountInput;
};
