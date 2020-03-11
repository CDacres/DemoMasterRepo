import { CatalogItem } from '@src/core';
import { ProductCategory } from './ProductCategoryMeta';
import { ConfigurationKind } from './ConfigurationKind';

export type SpaceTypeArrangement = {
  // order included
  configurationKinds: ConfigurationKind[];
  // >0 - onEdit Show only [showExpandAfter] configurationTypes
  // null|0 - disabled
  showExpandAfter?: number;
};

export type SpaceTypeStock = {
  label: string;
  title: string;
  unit: string;
};

export type SpaceTypeSize = {
  area?: FieldArea;
  capacity?: FieldUnit;
  title: string;
};

export type FieldArea = {
  label: string;
} & MetaField;

export type FieldUnit = {
  label: string;
  unit: string;
} & MetaField;

interface MetaField {
  label: string;
}

export type SpaceKindMeta = CatalogItem<any> & {
  arrangement?: SpaceTypeArrangement;
  assetType: string;
  category: ProductCategory;
  description: string;
  disabled: boolean;
  enablePictures: boolean;
  enablePrices: boolean;
  icon?: 'Meeting' | 'Table' | 'Venue' | 'Party' | 'Dining' | 'Wedding';
  iconUrl?: string;
  id: SpaceKind;
  maxPerVenue?: number;
  orderIndex?: number;
  priceRequired: boolean;
  size?: SpaceTypeSize;
  stock?: SpaceTypeStock;
};

export enum SpaceKind {
  'MEETING' = 'MEETING',
  'OFFICE_HOTDESK' = 'OFFICE_HOTDESK',
  'OFFICE_DEDICATEDDESK' = 'OFFICE_DEDICATEDDESK',
  'OFFICE_PRIVATE' = 'OFFICE_PRIVATE',
  'PARTY_TABLE' = 'PARTY_TABLE',
  'PARTY_SPACE' = 'PARTY_SPACE',
  'PARTY_VENUE' = 'PARTY_VENUE',
  'DINING_TABLE' = 'DINING_TABLE',
  'DINING_SPACE' = 'DINING_SPACE',
  'DINING_VENUE' = 'DINING_VENUE',
  'WEDDING_SPACE' = 'WEDDING_SPACE',
  'WEDDING_VENUE' = 'WEDDING_VENUE',
}
