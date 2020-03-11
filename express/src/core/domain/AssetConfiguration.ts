import { ConfigurationKind } from './ConfigurationKind';
import { Int } from '@src/core';

export type AssetConfiguration = {
  // client side only
  isActive?: boolean;
  kind: ConfigurationKind;
  maxPax: Int;
};
