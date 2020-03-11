import { Catalog } from '@src/core';
import { SetMenuSection, SetMenuSectionMeta } from '@src/core/domain';

const _itemsSource: SetMenuSectionMeta[] = [
  {
    description: 'menu starter',
    id: SetMenuSection.STARTER,
    isHidden: false,
    orderIndex: 0,
    placeholder: 'listing.set_menu_starter_placeholder',
    title: 'listing.set_menu_starter_title',
  },
  {
    description: 'menu main',
    id: SetMenuSection.MAIN,
    isHidden: false,
    orderIndex: 1,
    placeholder: 'listing.set_menu_main_placeholder',
    title: 'listing.set_menu_main_title',
  },
  {
    description: 'menu dessert',
    id: SetMenuSection.DESSERT,
    isHidden: false,
    orderIndex: 2,
    placeholder: 'listing.set_menu_dessert_placeholder',
    title: 'listing.set_menu_dessert_title',
  },
  {
    description: 'default section',
    id: SetMenuSection.SIDE,
    isHidden: true,
    orderIndex: 3,
    placeholder: 'listing.set_menu_other_placeholder',
    title: 'listing.set_menu_other_title',
  },
];

export const setMenuSectionCatalog = new Catalog<SetMenuSectionMeta>().withItems(_itemsSource);
