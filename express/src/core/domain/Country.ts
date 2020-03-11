import { CatalogItem, Currency, Ref } from '@src/core';
// ISO 3166-1 alpha-2

export type Country = {
  currency: Currency;
  description: string;
  id: Ref;
  lang: string;
  native?: string;
} & CatalogItem<Ref>;
