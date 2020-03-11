import { Ref } from '@src/core';
import { CurrencyAmountInput } from './CurrencyAmountInput';

export type ListingsV1VenueAmenityEdgeInput = {
  amenityId: Ref;
  excludedSpaces: Ref[];
  isActive: boolean;
  note: string;
  price: CurrencyAmountInput;
};
