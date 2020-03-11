import { AssetCapacity } from './AssetCapacity';
import { Menu } from './Menu';
import { DailyHours } from './Plan';
import { Alias } from './Alias';
import { AssetAmenityEdge } from './AssetAmenityEdge';
import { Product } from './Product';
import { AssetImageEdge } from './AssetImageEdge';
import { Location } from './Location';

// keep the layout and asset type together while we have the circular reference
export type Layout = {
  children: Asset[];
};

export type Asset = {
  aliases: Alias[];
  amenities: AssetAmenityEdge[];
  capacity?: AssetCapacity;
  currency: string;
  description: string;
  images: AssetImageEdge[];
  layouts?: Layout[];
  location: Location;
  menus: Menu[];
  name: string;
  openingHours: DailyHours[];
  products: Product[];
  website: string;
};
