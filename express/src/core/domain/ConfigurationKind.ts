import { CatalogItem } from '@src/core';

export enum ConfigurationKind {
  'SEATED' = 'SEATED',
  'RECEPTION' = 'RECEPTION',
  'BOARDROOM' = 'BOARDROOM',
  'CLASSROOM' = 'CLASSROOM',
  'BANQUET' = 'BANQUET',
  'THEATRE' = 'THEATRE',
  'U_SHAPED' = 'U_SHAPED',
  'CABARET' = 'CABARET',
}

export type ConfigurationKindMeta = CatalogItem<ConfigurationKind> & {
  thumbUrl?: string;
};
