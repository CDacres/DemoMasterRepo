import { Term } from '@src/core/domain';
import { Catalog } from '@src/core';

const _itemsSource: Term[] = [
  {
    description: 'listing.one_month',
    id: 1,
    months: 1,
  },
  {
    description: 'listing.two_months',
    id: 2,
    months: 2,
  },
  {
    description: 'listing.three_months',
    id: 3,
    months: 3,
  },
  {
    description: 'listing.six_months',
    id: 4,
    months: 6,
  },
  {
    description: 'listing.nine_months',
    id: 5,
    months: 9,
  },
  {
    description: 'listing.twelve_months',
    id: 6,
    months: 12,
  },
  {
    description: 'listing.eighteen_months',
    id: 7,
    months: 18,
  },
  {
    description: 'listing.twenty_four_months',
    id: 8,
    months: 24,
  },
  {
    description: 'listing.thirty_six_months',
    id: 9,
    months: 36},
];

export const termCatalog = new Catalog<Term>().withItems(_itemsSource);
