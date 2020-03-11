import { Int } from '@src/core';
import { MenuItem } from './MenuItem';

export type MenuGroup = {
  description: string;
  items: MenuItem[];
  orderIndex: Int;
};
