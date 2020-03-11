import { Catalog, CatalogItem, WithOrderIndex } from '@src/core';

export enum DayOfWeek {
  'MONDAY' = 'MONDAY',
  'TUESDAY' = 'TUESDAY',
  'WEDNESDAY' = 'WEDNESDAY',
  'THURSDAY' = 'THURSDAY',
  'FRIDAY' = 'FRIDAY',
  'SATURDAY' = 'SATURDAY',
  'SUNDAY' = 'SUNDAY',
}

export type DayOfWeekItem = {
  ddd: string;
} & CatalogItem<DayOfWeek> & WithOrderIndex;

export const dayOfWeekCatalog = new Catalog<DayOfWeekItem>().withItems([
  {
    ddd: 'common.mon',
    description: 'common.monday',
    id: DayOfWeek.MONDAY,
    orderIndex: 0,
  },
  {
    ddd: 'common.tue',
    description: 'common.tuesday',
    id: DayOfWeek.TUESDAY,
    orderIndex: 1,
  },
  {
    ddd: 'common.wed',
    description: 'common.wednesday',
    id: DayOfWeek.WEDNESDAY,
    orderIndex: 2,
  },
  {
    ddd: 'common.thu',
    description: 'common.thursday',
    id: DayOfWeek.THURSDAY,
    orderIndex: 3,
  },
  {
    ddd: 'common.fri',
    description: 'common.friday',
    id: DayOfWeek.FRIDAY,
    orderIndex: 4,
  },
  {
    ddd: 'common.sat',
    description: 'common.saturday',
    id: DayOfWeek.SATURDAY,
    orderIndex: 5,
  },
  {
    ddd: 'common.sun',
    description: 'common.sunday',
    id: DayOfWeek.SUNDAY,
    orderIndex: 6,
  },
]);
