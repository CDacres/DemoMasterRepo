import { WithOrderIndex } from '@src/core';

export type CarteItem = {
  // carteGroupId: ObjectKey;
  description?: string;
  // happyPrice?: number;
  // id: ObjectKey;
  // todo: not supported
  // also means included
  isFixed?: boolean;
  price?: number;
} & WithOrderIndex;
