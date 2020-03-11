import { CatalogItem, Int, Ref } from '@src/core';

export type SetMenu = {
  description?: string;
  groups: SetMenuGroup[];
  id: Ref;
  price?: number;
};

export type SetMenuGroup = {
  items: SetMenuItem[];
  section: SetMenuSection;
};

export type SetMenuItem = {
  description: string;
  orderIndex: Int;
};

export enum SetMenuSection {
  STARTER = 'STARTER',
  MAIN = 'MAIN',
  DESSERT = 'DESSERT',
  SIDE = 'SIDE',
}

export type SetMenuSectionMeta = {
  id: SetMenuSection;
  isHidden: boolean;
  orderIndex: Int;
  placeholder: string;
  title: string;
} & CatalogItem<SetMenuSection>;
