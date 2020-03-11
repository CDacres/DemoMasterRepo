/* tslint:disable:quotemark */
import { ConfigurationKind } from '@src/core/domain';

export const menu = {
  drinks: {
    menu: [
      {
        drinks: 'Tea / Coffee',
        happy_hour: null,
        price: 'Incl.',
      },
      {
        drinks: 'Évian Water',
        happy_hour: null,
        price: '£4',
      },
      {
        drinks: 'Coca Cola',
        happy_hour: '£6',
        price: '£8',
      },
      {
        drinks: 'Apple Juice',
        happy_hour: '£5',
        price: '£10',
      },
      {
        drinks: 'Lemongrass and hand picked elderflower',
        happy_hour: null,
        price: '£12',
      },
    ],
    notes: [
      {
        id: 1,
        trans_key: 'room.happy_hours_descr',
        value: {
          from: 19,
          to: 21,
        },
      },
    ],
  },
  meals: {
    menu: [
      {
        catering: 'Avocado Toast',
        happy_hour: null,
        price: '£15',
      },
      {
        catering: 'Sandwich Lunch',
        happy_hour: null,
        price: '£10',
      },
      {
        catering: 'Salad Bar',
        happy_hour: null,
        price: '£15',
      },
      {
        catering: 'Quinoa and Spinach',
        happy_hour: null,
        price: '£19',
      },
    ],
  },
};

export const opening = [
  {
    name: 'monday',
    working_hours: {
      from: '9:00',
      to: '18:00',
    },
  },
  {
    name: 'tuesday',
    working_hours: {
      from: '9:00',
      to: '18:00',
    },
  },
  {
    name: 'wednesday',
    working_hours: {
      from: '9:00',
      to: '18:00',
    },
  },
  {
    name: 'thursday',
    working_hours: {
      from: '9:00',
      to: '18:00',
    },
  },
  {
    name: 'friday',
    working_hours: {
      from: '9:00',
      to: '18:00',
    },
  },
  {
    name: 'saturday',
    working_hours: null,
  },
  {
    name: 'sunday',
    working_hours: null,
  },
];

export const pricePackages = [
  {
    extras: {
      configurations: [
        {
          config_id: 1,
          max_capacity: 20,
          name: ConfigurationKind.BOARDROOM,
        },
        {
          config_id: 2,
          max_capacity: 25,
          name: ConfigurationKind.CLASSROOM,
        },
        {
          config_id: 4,
          max_capacity: 25,
          name: ConfigurationKind.THEATRE,
        },
        {
          config_id: 7,
          max_capacity: 25,
          name: ConfigurationKind.U_SHAPED,
        },
        {
          config_id: 8,
          max_capacity: 25,
          name: ConfigurationKind.CABARET,
        },
      ],
      description: 'The Warehouse is an impressive space - airy and energising and ideal for focus groups, workshops, innovation sessions, events and seminars especially those for digital or creative industries. Featuring original wooden flooring and modular furniture the studio can be configured to meet a variety of needs, seating up to 30 people theatre style, 20 boardroom style or several smaller groups for intensive sessions. The Warehouse also features a fully equipped private kitchen, linked observation/breakout room and dry hire video editing suite.',
      pictures: ['https://locations-api-production.imgix.net/locations/image/28c573ae-154f-11e9-8da3-1202be33576a/webimage-7EEE5753-5407-49E3-9E9F5ED08016F40E.jpg'],
    },
    price: 'From £235 per hour',
    title: 'Warehouse',
  },
  {
    extras: {
      configurations: [
        {
          config_id: 1,
          max_capacity: 40,
          name: ConfigurationKind.BOARDROOM,
        },
        {
          config_id: 6,
          max_capacity: 50,
          name: ConfigurationKind.RECEPTION,
        },
      ],
      description: 'The Warehouse is an impressive space - airy and energising and ideal for focus groups, workshops, innovation sessions, events and seminars especially those for digital or creative industries. Featuring original wooden flooring and modular furniture the studio can be configured to meet a variety of needs, seating up to 30 people theatre style, 20 boardroom style or several smaller groups for intensive sessions. The Warehouse also features a fully equipped private kitchen, linked observation/breakout room and dry hire video editing suite.',
      pictures: ['https://locations-api-production.imgix.net/locations/image/28c573ae-154f-11e9-8da3-1202be33576a/webimage-7EEE5753-5407-49E3-9E9F5ED08016F40E.jpg'],
    },
    price: '£235 per hour',
    title: 'The Loft',
  },
  {
    extras: {
      configurations: [
        {
          config_id: 1,
          max_capacity: 40,
          name: ConfigurationKind.BOARDROOM,
        },
        {
          config_id: 6,
          max_capacity: 50,
          name: ConfigurationKind.RECEPTION,
        },
      ],
      description: 'The Warehouse is an impressive space - airy and energising and ideal for focus groups, workshops, innovation sessions, events and seminars especially those for digital or creative industries. Featuring original wooden flooring and modular furniture the studio can be configured to meet a variety of needs, seating up to 30 people theatre style, 20 boardroom style or several smaller groups for intensive sessions. The Warehouse also features a fully equipped private kitchen, linked observation/breakout room and dry hire video editing suite.',
      pictures: ['https://locations-api-production.imgix.net/locations/image/28c573ae-154f-11e9-8da3-1202be33576a/webimage-7EEE5753-5407-49E3-9E9F5ED08016F40E.jpg'],
    },
    price: '£108 per hour',
    title: 'The Lounge',
  },
  {
    extras: {
      listOptions: [
        'Room hire',
        'morning coffee',
        'sandwich lunch',
        'coffee break',
        'afternoon break',
        'meeting equipment',
      ],
      optionTitle: 'My package contains',
    },
    price: '£55 per person',
    title: 'Package: Meeting basic',
  },
  {
    extras: {
      listOptions: [
        'Room hire',
        'morning breakfast',
        'lunch',
        'coffee break',
        'afternoon break',
        'cocktail closing',
        'meeting equipment',
      ],
      optionTitle: 'My package contains',
    },
    price: '£85 per person',
    times: [
      'Mon - Fri 18:00 - 21:00',
      'Sat - Sun 14:00 - 15:30',
    ],
    title: 'Package: Meeting premium',
  },
];

export const prices = {
  currency: {
    code: 'GBP',
    currency_symbol_left: '£',
    currency_symbol_right: '',
  },
  daily_rate_formatted: 1613,
  hourly_rate_formatted: 235,
  monthly_rate_formatted: null,
  venue_daily_rate_formatted: 1440,
  venue_hourly_rate_formatted: 210,
  venue_monthly_rate_formatted: null,
};

export const rating = {
  avg: 4.7,
  count: 2,
};

export const reviews = {
  per_page: 7,
  venue_reviews: [
    {
      created_at: '2017-01-01 17:01:46',
      id: 1,
      owner_first_name: 'Kelly',
      owner_last_name: 'Morley',
      ranking: 4.4,
      reply: null,
      text: 'Everything was great, the team was extremely friendly and helpful. We will definitely be back :)',
    },
    {
      created_at: '2015-11-05 01:01:46',
      id: 2,
      owner_first_name: 'Michael',
      owner_last_name: 'Lastname',
      ranking: 5,
      reply: null,
      text: "Truly excellent - bright, spacious and all the kit there worked instantly (I'd factored in 10 minutes for faffing around connecting laptops to screens and instead we were up and running almost immediately).",
    },
  ],
};
