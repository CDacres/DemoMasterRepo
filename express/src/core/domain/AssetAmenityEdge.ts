import { Amenity } from './Amenity';
import { CurrencyAmount } from './CurrencyAmount';

export type AssetAmenityEdge = {
  amenity: Amenity;
  isActive: boolean;
  note: string;
  price: CurrencyAmount;
};
