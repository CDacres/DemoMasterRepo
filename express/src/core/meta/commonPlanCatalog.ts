import { CommonPlan } from '@src/core/domain';
import { Catalog, DayOfWeek } from '@src/core';

const _itemsSource: CommonPlan[] = [
  {
    description: 'listing.opening_hours_twenty_four_seven',
    id: '1',
    openingHours: [
      {
        day: DayOfWeek.MONDAY,
        spans: [
          {
            end: 1440,
            start: 0,
          },
        ],
      },
      {
        day: DayOfWeek.TUESDAY,
        spans: [
          {
            end: 1440,
            start: 0,
          },
        ],
      },
      {
        day: DayOfWeek.WEDNESDAY,
        spans: [
          {
            end: 1440,
            start: 0,
          },
        ],
      },
      {
        day: DayOfWeek.THURSDAY,
        spans: [
          {
            end: 1440,
            start: 0,
          },
        ],
      },
      {
        day: DayOfWeek.FRIDAY,
        spans: [
          {
            end: 1440,
            start: 0,
          },
        ],
      },
      {
        day: DayOfWeek.SATURDAY,
        spans: [
          {
            end: 1440,
            start: 0,
          },
        ],
      },
      {
        day: DayOfWeek.SUNDAY,
        spans: [
          {
            end: 1440,
            start: 0,
          },
        ],
      },
    ],
  },
  {
    description: 'listing.opening_hours_mon_fri_eight_six',
    id: '2',
    openingHours: [
      {
        day: DayOfWeek.MONDAY,
        spans: [
          {
            end: 1080,
            start: 480,
          },
        ],
      },
      {
        day: DayOfWeek.TUESDAY,
        spans: [
          {
            end: 1080,
            start: 480,
          },
        ],
      },
      {
        day: DayOfWeek.WEDNESDAY,
        spans: [
          {
            end: 1080,
            start: 480,
          },
        ],
      },
      {
        day: DayOfWeek.THURSDAY,
        spans: [
          {
            end: 1080,
            start: 480,
          },
        ],
      },
      {
        day: DayOfWeek.FRIDAY,
        spans: [
          {
            end: 1080,
            start: 480,
          },
        ],
      },
      {
        day: DayOfWeek.SATURDAY,
        spans: [],
      },
      {
        day: DayOfWeek.SUNDAY,
        spans: [],
      },
    ],
  },
  {
    description: 'listing.opening_hours_mon_fri_nine_five',
    id: '3',
    openingHours: [
      {
        day: DayOfWeek.MONDAY,
        spans: [
          {
            end: 1020,
            start: 540,
          },
        ],
      },
      {
        day: DayOfWeek.TUESDAY,
        spans: [
          {
            end: 1020,
            start: 540,
          },
        ],
      },
      {
        day: DayOfWeek.WEDNESDAY,
        spans: [
          {
            end: 1020,
            start: 540,
          },
        ],
      },
      {
        day: DayOfWeek.THURSDAY,
        spans: [
          {
            end: 1020,
            start: 540,
          },
        ],
      },
      {
        day: DayOfWeek.FRIDAY,
        spans: [
          {
            end: 1020,
            start: 540,
          },
        ],
      },
      {
        day: DayOfWeek.SATURDAY,
        spans: [],
      },
      {
        day: DayOfWeek.SUNDAY,
        spans: [],
      },
    ],
  },
  {
    description: 'listing.opening_hours_mon_sun_nine_six',
    id: '4',
    openingHours: [
      {
        day: DayOfWeek.MONDAY,
        spans: [
          {
            end: 1080,
            start: 540,
          },
        ],
      },
      {
        day: DayOfWeek.TUESDAY,
        spans: [
          {
            end: 1080,
            start: 540,
          },
        ],
      },
      {
        day: DayOfWeek.WEDNESDAY,
        spans: [
          {
            end: 1080,
            start: 540,
          },
        ],
      },
      {
        day: DayOfWeek.THURSDAY,
        spans: [
          {
            end: 1080,
            start: 540,
          },
        ],
      },
      {
        day: DayOfWeek.FRIDAY,
        spans: [
          {
            end: 1080,
            start: 540,
          },
        ],
      },
      {
        day: DayOfWeek.SATURDAY,
        spans: [
          {
            end: 1080,
            start: 540,
          },
        ],
      },
      {
        day: DayOfWeek.SUNDAY,
        spans: [
          {
            end: 1080,
            start: 540,
          },
        ],
      },
    ],
  },
  {
    description: 'common.custom',
    id: '5',
    openingHours: null,
  },
];

export const commonPlanCatalog = new Catalog<CommonPlan>().withItems(_itemsSource);
