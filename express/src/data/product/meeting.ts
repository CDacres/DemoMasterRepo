/* tslint:disable:max-line-length quotemark */
import { ConfigurationKind } from '@src/core/domain';

// TODO: replace with api data
export const adminInfo = {
  agree_to_list: true,
  website: 'www.website.com',
  first_name: 'Steve',
  last_name: 'Lastname',
  email: 'contact@email.com',
  phone: '+44 7432 609499',
  other_contact: [
    {
      email: 'support@mail.com',
      name: 'Support',
      phone: '+44 7432 609499',
    },
    {
      email: 'yasmin@mail.com',
      name: 'Yasmin Rowan',
      phone: '+44 20 7138 0956',
    },
  ],
};

export const amenities = [
  // {
  //   amenity_id: 15,
  //   image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/wireless-internet-4x.png',
  //   name: 'Wireless Internet Access',
  // },
  {
    amenity_id: 24,
    image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/flipchart-4x.png',
    name: 'Flipchart',
    price: 10,
  },
  // {
  //   amenity_id: 25,
  //   image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/penpaper-4x.png',
  //   name: 'Pen/Paper',
  // },
  // {
  //   amenity_id: 26,
  //   image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/tv-projector-4x.png',
  //   name: 'Projector/TV/Screen',
  // },
  // {
  //   amenity_id: 18,
  //   image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/video-conference-4x.png',
  //   name: 'Video Conference Phone',
  // },
  {
    amenity_id: 20,
    image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/conference-phone-4x.png',
    name: 'Conferencing Phone',
  },
  {
    amenity_id: 19,
    image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/whiteboard-4x.png',
    name: 'Whiteboards',
  },
  {
    amenity_id: -4,
    image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/technical-support-4x.png',
    name: 'On site technical support',
  },
];

export const assetTags = [
  {
    name: 'The Warehouse',
    tags: [
      {
        id: 1,
        name: 'meeting',
      },
      {
        id: 19,
        name: 'auditorium',
      },
      {
        id: 156,
        name: 'presentation',
      },
    ],
  },
];

export const capacityRange = {
  max_capacity: 40,
  min_capacity: 20,
};

export const configurations = [
  {
    config_id: 1,
    max_capacity: 20,
    name: ConfigurationKind.BOARDROOM,
  },
  {
    config_id: 2,
    max_capacity: 20,
    name: ConfigurationKind.CLASSROOM,
  },
  {
    config_id: 4,
    max_capacity: 40,
    name: ConfigurationKind.THEATRE,
  },
  {
    config_id: 7,
    max_capacity: 20,
    name: ConfigurationKind.U_SHAPED,
  },
  {
    config_id: 8,
    max_capacity: 30,
    name: ConfigurationKind.CABARET,
  },
];

export const exclusiveOffer = [
  // {
  //   available: [
  //     'tue',
  //     'thu',
  //     'fri',
  //     'sat',
  //     'sun',
  //   ],
  //   condition: {
  //     condition_key: 'room.min_hours',
  //     value: 3,
  //   },
  //   date_until: 'Today',
  //   type: 'room.happy_hours',
  // },
  // {
  //   available: [
  //     'tue',
  //     'wed',
  //     'thu',
  //     'sat',
  //   ],
  //   condition: {
  //     condition_key: 'room.min_hours',
  //     value: 3,
  //   },
  //   date_until: 'Today',
  //   type: 'room.happy_hours',
  // },
  // {
  //   available: [
  //     'tue',
  //     'wed',
  //     'fri',
  //     'sat',
  //   ],
  //   date_until: 'Today',
  //   type: 'common.daily',
  // },
  // {
  //   available: ['sat'],
  //   date_until: 'Today',
  //   type: 'common.daily',
  // },
  // {
  //   available: [
  //     'wed',
  //     'thu',
  //     'sat',
  //   ],
  //   date_until: 'Today',
  //   type: 'common.daily',
  // },
];

export const images = {
  main: 'https://abac7c57c1374ed95f4b-fc517bfeb78f64bd2cb175c56cdcead7.ssl.cf3.rackcdn.com//1041/870_450_4bf6b48cf8f5c464cc7bd4f23706df53.jpg',
  secondary: 'https://abac7c57c1374ed95f4b-fc517bfeb78f64bd2cb175c56cdcead7.ssl.cf3.rackcdn.com//1041/870_450_186e85c87867fffe314069c31a842a74.jpg',
  tertiary: 'http://b992d4a4cac5f65c79e0-fc517bfeb78f64bd2cb175c56cdcead7.r47.cf3.rackcdn.com/1041/870_450_e014164f61ba9e6b700d020c71ecb8b1.jpg',
};

export const info = {
  description: 'The Warehouse is an impressive space - airy and energising and ideal for focus groups, workshops, innovation sessions, events and seminars especially those for digital or creative industries. Featuring original wooden flooring and modular furniture the studio can be configured to meet a variety of needs, seating up to 30 people theatre style, 20 boardroom style or several smaller groups for intensive sessions. The Warehouse also features a fully equipped private kitchen, linked observation/breakout room and dry hire video editing suite.',
  owner_first_name: 'Kelly',
  owner_img_src: 'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png',
  owner_last_name: 'Morley',
  response_rate: '99',
  response_time: 'room.within_an_hour',
  venue_city: 'London',
  venue_name: 'Sutherland Labs',
  vertical_id: 1,
};

export const location = {
  around: [
    {
      distance: '2.5 km',
      name: 'Holborn station',
    },
    {
      distance: '0.7 km',
      name: 'Covent Garden station',
    },
    {
      distance: '1 km',
      name: 'Temple station',
    },
    {
      distance: '2 km',
      name: 'Charing Cross station',
    },
  ],
  lat: '51.5150404',
  lon: '-0.1242691',
  nearest: {
    name: 'Covent Garden station',
    distance: '0.7 km',
  },
};

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

export const name = 'The Warehouse';

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
    price: '£235 per hour',
    title: 'common.hourly',
  },
  {
    price: '£400 per hour',
    times: ['18:00 - 21:00'],
    title: 'common.hourly',
  },
  {
    price: '£900 per half day',
    title: 'common.half_day',
  },
  {
    offerText: 'Save 24% on the hourly price by selecting the daily price',
    price: '£1613 per day',
    title: 'common.daily',
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

export const siblings = [
  {
    category: 'meeting',
    currency: '£',
    image: 'https://abac7c57c1374ed95f4b-fc517bfeb78f64bd2cb175c56cdcead7.ssl.cf3.rackcdn.com//15988/870_450_4bba4a499c176686788a4b4b27f011ea.jpg',
    link: 'https://www.zipcube.com/uk/meeting-rooms/london/10165',
    maxCapacity: 'Up to 10 people',
    price: {
      hourly: 112,
      daily: 1075,
    },
    rating: 4.7,
    reviewsCount: 2,
    title: 'Second Floor Meeting Room',
    verticalId: 1,
  },
  {
    category: 'meeting',
    currency: '£',
    image: 'https://abac7c57c1374ed95f4b-fc517bfeb78f64bd2cb175c56cdcead7.ssl.cf3.rackcdn.com//1625/870_450_d908635695fc55238d4f452cbae8c354.jpg',
    link: 'https://www.zipcube.com/uk/meeting-rooms/london/1625',
    maxCapacity: 'Up to 30 people',
    price: {
      hourly: 235,
      daily: 1613,
    },
    rating: 4.7,
    reviewsCount: 2,
    title: 'The Loft',
    verticalId: 1,
  },
  {
    category: 'meeting',
    currency: '£',
    image: 'https://abac7c57c1374ed95f4b-fc517bfeb78f64bd2cb175c56cdcead7.ssl.cf3.rackcdn.com//32969/870_450_dce9295543b537ddef6c5098b1d15195.jpg',
    link: 'https://www.zipcube.com/uk/meeting-rooms/london/20602',
    maxCapacity: 'Up to 10 people',
    price: {
      hourly: 108,
      daily: 874,
    },
    rating: 4.7,
    reviewsCount: 2,
    title: 'The Lounge',
    verticalId: 1,
  },
  {
    category: 'meeting',
    currency: '£',
    image: 'https://abac7c57c1374ed95f4b-fc517bfeb78f64bd2cb175c56cdcead7.ssl.cf3.rackcdn.com//1046/870_450_dfb6c27b8f7133fe0390fc1dd4bc3cb2.jpg',
    link: 'https://www.zipcube.com/uk/meeting-rooms/london/1046',
    maxCapacity: 'Up to 10 people',
    price: {
      hourly: 108,
      daily: 806,
    },
    rating: 4.7,
    reviewsCount: 2,
    title: 'The Sweet Shop',
    verticalId: 1,
  },
  {
    category: 'meeting',
    currency: '£',
    image: 'https://abac7c57c1374ed95f4b-fc517bfeb78f64bd2cb175c56cdcead7.ssl.cf3.rackcdn.com//1045/870_450_09b3a7359041b78455f2bcf882c511c8.jpg',
    link: 'https://www.zipcube.com/uk/meeting-rooms/london/1045',
    maxCapacity: 'Up to 10 people',
    price: {
      hourly: 195,
      daily: 1478,
    },
    rating: 4.7,
    reviewsCount: 2,
    title: 'The Workshop',
    verticalId: 1,
  },
];
