import { Int } from '@src/core';
import { MenuItemInput } from './MenuItemInput';

export type MenuGroupInput = {
  description: string;
  items: MenuItemInput[];
  orderIndex: Int;
};
