import { Duration } from '@src/core/domain';
import { Catalog } from '@src/core';

const _itemsSource: Duration[] = [
  {
    description: 'listing.thirty_mins',
    id: 1,
    minutes: 30,
  },
  {
    description: 'listing.one_hour',
    id: 2,
    minutes: 60,
  },
  {
    description: 'listing.one_half_hours',
    id: 3,
    minutes: 90,
  },
  {
    description: 'listing.two_hours',
    id: 4,
    minutes: 120,
  },
  {
    description: 'listing.two_half_hours',
    id: 5,
    minutes: 150,
  },
  {
    description: 'listing.three_hours',
    id: 6,
    minutes: 180,
  },
  {
    description: 'listing.three_half_hours',
    id: 7,
    minutes: 210,
  },
  {
    description: 'listing.four_hours',
    id: 8,
    minutes: 240,
  },
];

export const hourDurationCatalog = new Catalog<Duration>().withItems(_itemsSource);
