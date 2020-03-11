import { CarteGroupMeta } from '@src/core/domain';
import { Catalog } from '@src/core';

const _itemsSource: CarteGroupMeta[] = [
  {
    description: 'listing.carte_group_hot_drinks',
    id: '1',
    orderIndex: 1,
    placeholder: 'listing.hot_drink_placeholder',
    tip: 'listing.food_drink_tip',
  },
  {
    description: 'listing.carte_group_cold_drinks',
    id: '2',
    orderIndex: 2,
    placeholder: 'listing.cold_drink_placeholder',
  },
  {
    description: 'listing.carte_group_food',
    id: '3',
    orderIndex: 3,
    placeholder: 'listing.food_placeholder',
  },
];

export const carteGroupCatalog = new Catalog<CarteGroupMeta>().withItems(_itemsSource);
