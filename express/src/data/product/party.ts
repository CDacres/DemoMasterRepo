/* tslint:disable:quotemark */
import { ConfigurationKind } from '@src/core/domain';

// TODO: replace with api data
export const adminInfo = {
  agree_to_list: true,
  website: 'www.website.com',
  first_name: 'Vernon',
  last_name: 'Lastname',
  email: 'contact@email.com',
  phone: '+44232546465',
  other_contact: [
    {
      email: 'support@mail.com',
      name: 'Support',
      phone: '+44232546465',
    },
    {
      email: 'contact@mail.com',
      name: 'Contact',
      phone: '+44232546465',
    },
  ],
};

export const amenities = [
  {
    amenity_id: 15,
    image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/wireless-internet-4x.png',
    name: 'Wireless Internet Access',
  },
  {
    amenity_id: -129,
    image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/air-conditioning-4x.png',
    name: 'Air conditioning',
  },
  {
    amenity_id: -138,
    image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/smoking-allowed-4x.png',
    name: 'Smoking area',
  },
  {
    amenity_id: -131,
    image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/speaker-4x.png',
    name: 'Speakers',
  },
  {
    amenity_id: -5,
    image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/mic-4x.png',
    name: 'Microphone',
  },
  {
    amenity_id: -4,
    image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/technical-support-4x.png',
    name: 'On site technical support',
  },
  {
    amenity_id: -139,
    image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/hostess-4x.png',
    name: 'Hostess',
  },
  {
    amenity_id: -141,
    image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/suitable-for-events-4x.png',
    name: 'Event Coordinator',
  },
  {
    amenity_id: -142,
    image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/security-4x.png',
    name: 'Security staff',
  },
  {
    amenity_id: -143,
    image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/ticketing-event-4x.png',
    name: 'Ticketing event possible',
  },
  {
    amenity_id: -116,
    image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/dance-floor-4x.png',
    name: 'Dance floor',
  },
  {
    amenity_id: -117,
    image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/entertainment-licence-4x.png',
    name: 'Entertainment license',
  },
  {
    amenity_id: -118,
    image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/live-music-4x.png',
    name: 'Live band facilities',
  },
  {
    amenity_id: -119,
    image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/dj-facilities-4x.png',
    name: 'DJ facilities',
  },
  {
    amenity_id: -140,
    image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/cloakroom-4x.png',
    name: 'Cloakroom',
  },
];

export const assetTags = [];

export const capacityRange = {
  max_capacity: 25,
  min_capacity: 14,
};

export const exclusiveOffer = [
  {
    available: [
      'tue',
      'thu',
      'fri',
      'sat',
      'sun',
    ],
    condition: {
      condition_key: 'room.min_hours',
      value: 3,
    },
    date_until: 'Today',
    type: 'room.happy_hours',
  },
  {
    available: [
      'tue',
      'wed',
      'thu',
      'sat',
    ],
    condition: {
      condition_key: 'room.min_hours',
      value: 3,
    },
    type: 'room.happy_hours',
  },
  {
    available: [
      'tue',
      'wed',
      'fri',
      'sat',
    ],
    type: 'common.daily',
  },
  {
    available: ['sat'],
    date_until: 'Today',
    type: 'common.daily',
  },
  {
    available: [
      'wed',
      'thu',
      'sat',
    ],
    date_until: 'Today',
    type: 'common.daily',
  },
];

export const images = {
  main: 'https://static.designmynight.com/uploads/2014/03/524492_10151469252969733_701697217_n-optimised.jpg',
  secondary: 'https://static.designmynight.com/uploads/2014/03/993953_10151679169399733_910513794_n-optimised.jpg',
  tertiary: 'https://static.designmynight.com/uploads/2019/01/MG_9530-optimised.jpg',
};

export const info = {
  description: "Trailer Happiness is an intimate lounge bar, den and kitchen on Portobello Road with the e-z-boy feel of a low rent, mid-60s California valley bachelor pad. Set in a basement on Portobello Road, this is one of the very fine cocktail bars in West London and certainly Notting Hill. The decor is quirky, off-beat and buzzes with young Londoner's looking to party and sample of the best cocktails around. It's a cosmopolitan kitsch Tiki Bar in London, something a little different and a fun night in London. Booking recommended. Ideal for all cocktail aficionados, their team of mixologists will amaze even the most die-hard of cocktail fans with their incredibly innovative mixes. Also hosting regular DJ nights, it's a really fun party place that you won't want to miss out from.",
  owner_first_name: 'Vernon',
  owner_last_name: 'Lastname',
  response_rate: '99',
  response_time: 'room.within_an_hour',
  venue_city: 'London',
  venue_name: 'Trailer Happiness',
  vertical_id: 3,
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
  lat: '51.5072996',
  lon: '-0.1280232',
  nearest: {
    name: 'Covent Garden station',
    distance: '0.7 km',
  },
};

export const menu = {
  drinks: {
    menu: [
      {
        drinks: 'Glass of wine',
        happy_hour: null,
        price: '£8',
      },
      {
        drinks: '1/2 Pint',
        happy_hour: null,
        price: '£4',
      },
      {
        drinks: 'Pint',
        happy_hour: '£6',
        price: '£8',
      },
      {
        drinks: 'Cocktail',
        happy_hour: '£5',
        price: '£10',
      },
      {
        drinks: 'Flagon',
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
        catering: 'Cicchetti / Tapas - from',
        happy_hour: null,
        price: '£13',
      },
      {
        catering: 'Little Burrata',
        happy_hour: null,
        price: '£10',
      },
      {
        catering: 'Large Burrata',
        happy_hour: null,
        price: '£15',
      },
      {
        catering: 'Board 2 pers.',
        happy_hour: null,
        price: '£19',
      },
      {
        catering: 'Board 4 pers.',
        happy_hour: null,
        price: '£13',
      },
    ],
    specials: [
      {
        id: '1',
        name: 'Boards and tapas',
        desc: 'Yes, order from Cicchetti, right in front of the Next.',
        available: true,
      },
      {
        id: '2',
        name: 'Dinner cocktails',
        desc: 'This establishment does not offer a cocktail reception',
        available: false,
      },
      {
        id: '3',
        name: 'Birthday cakes',
        desc: 'This establishment does not offer birthday cakes',
        available: false,
      },
      {
        id: '4',
        name: 'Sitting meal',
        desc: 'This establishment does not offer a sit-down meal',
        available: false,
      },
    ],
  },
  pictures: [
    'https://static.designmynight.com/uploads/2019/01/Trailer-Happiness-30-optimised.jpg',
    'https://static.designmynight.com/uploads/2019/01/Trailer-Happiness-63-optimised.jpg',
    'https://static.designmynight.com/uploads/2017/12/Trailer-Happiness-21-optimised.jpg',
  ],
  setMenu: [
    {
      menu: [
        'Beef Carpaccio with Zucchini, Shiitake Mushrooms, Wild Rocket, Roasted Tomatoes and Parmesan',
        'Fillet of Plaice pan fried, served with Roasted Potatoes, Zucchini, Cherry Tomatoes and Basil, Drizzled with Aged Balsamic',
        'Dark Chocolate Mousse served with Green Tea Ice Cream',
      ],
      title: 'Menu 1',
    },
    {
      menu: [
        'Butternut Squash, Honey and Ginger Soup, served with Focaccia Croutons',
        'Duck Breast served with Red Onion Mash, Roasted Fennel, French Beans and Honey and Thyme Sauce',
        'Ginger Creme Brûlée served with Orange Shortbread and Honey & Ginger Ice Cream',
      ],
      title: 'Menu 2',
    },
    {
      menu: [
        'Tiger Prawns, pan fried with Carrots, Zucchini, Fresh Ginger and Butter, served with Seaweed Salad',
        'Tagliatelle with French Beans, Roasted Tomatoes and Wild Rocket, served with Creamy Goats Cheese Sauce and Parmesan',
        'Lemon Cake served with Slow Cooked Rhubarb and Ginger Sauce',
      ],
      title: 'Menu 3',
    },
  ],
};

export const name = 'Trailer Happiness';

export const opening = [
  {
    name: 'monday',
    working_hours: {
      from: '17:00',
      to: '00:00',
    },
  },
  {
    name: 'tuesday',
    working_hours: {
      from: '17:00',
      to: '00:00',
    },
  },
  {
    name: 'wednesday',
    working_hours: {
      from: '17:00',
      to: '00:00',
    },
  },
  {
    name: 'thursday',
    working_hours: {
      from: '17:00',
      to: '00:00',
    },
  },
  {
    name: 'friday',
    working_hours: {
      from: '17:00',
      to: '01:00',
    },
  },
  {
    name: 'saturday',
    working_hours: {
      from: '17:00',
      to: '01:00',
    },
  },
  {
    name: 'sunday',
    working_hours: {
      from: '17:00',
      to: '00:00',
    },
  },
];

export const pricePackages = [
  {
    subtitle: 'Group size: 6 to 20 people',
    title: 'Book table',
  },
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
          config_id: 3,
          max_capacity: 20,
          name: ConfigurationKind.BANQUET,
        },
        {
          config_id: 4,
          max_capacity: 25,
          name: ConfigurationKind.THEATRE,
        },
        {
          config_id: 6,
          max_capacity: 25,
          name: ConfigurationKind.RECEPTION,
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
      description: "Trailer Happiness is an intimate lounge bar, den and kitchen on Portobello Road with the e-z-boy feel of a low rent, mid-60s California valley bachelor pad. Set in a basement on Portobello Road, this is one of the very fine cocktail bars in West London and certainly Notting Hill. The decor is quirky, off-beat and buzzes with young Londoner's looking to party and sample of the best cocktails around. It's a cosmopolitan kitsch Tiki Bar in London, something a little different and a fun night in London. Booking recommended. Ideal for all cocktail aficionados, their team of mixologists will amaze even the most die-hard of cocktail fans with their incredibly innovative mixes. Also hosting regular DJ nights, it's a really fun party place that you won't want to miss out from.",
      pictures: ['https://static.designmynight.com/uploads/2019/01/MG_9530-optimised.jpg'],
    },
    price: '£3,000 min. spend',
    times: [
      'Mon - Fri 18:00 - 21:00',
      'Sat - Sun 14:00 - 15:30',
    ],
    title: 'Private hire: The gallery',
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
      description: "Trailer Happiness is an intimate lounge bar, den and kitchen on Portobello Road with the e-z-boy feel of a low rent, mid-60s California valley bachelor pad. Set in a basement on Portobello Road, this is one of the very fine cocktail bars in West London and certainly Notting Hill. The decor is quirky, off-beat and buzzes with young Londoner's looking to party and sample of the best cocktails around. It's a cosmopolitan kitsch Tiki Bar in London, something a little different and a fun night in London. Booking recommended. Ideal for all cocktail aficionados, their team of mixologists will amaze even the most die-hard of cocktail fans with their incredibly innovative mixes. Also hosting regular DJ nights, it's a really fun party place that you won't want to miss out from.",
      pictures: ['https://static.designmynight.com/uploads/2014/03/993953_10151679169399733_910513794_n-optimised.jpg'],
    },
    price: '£8,900 per hire',
    title: 'Private hire: Churchill bar',
  },
  {
    extras: {
      configurations: [
        {
          config_id: 1,
          max_capacity: 50,
          name: ConfigurationKind.BOARDROOM,
        },
        {
          config_id: 6,
          max_capacity: 60,
          name: ConfigurationKind.RECEPTION,
        },
      ],
    },
    price: '£4,300 per hire',
    title: 'Patio grande',
  },
  {
    extras: {
      configurations: [
        {
          config_id: 1,
          max_capacity: 100,
          name: ConfigurationKind.BOARDROOM,
        },
        {
          config_id: 6,
          max_capacity: 120,
          name: ConfigurationKind.RECEPTION,
        },
      ],
    },
    price: '£3,0000 min. spend',
    title: 'Private hire entire venue',
  },
  {
    price: '£50 per person',
    title: 'After work',
  },
  {
    price: '£45 per person',
    title: 'Cocktail Masterclass',
  },
];

export const prices = {
  currency: {
    code: 'GBP',
    currency_symbol_left: '£',
    currency_symbol_right: '',
  },
  daily_rate_formatted: null,
  hourly_rate_formatted: null,
  monthly_rate_formatted: null,
  venue_daily_rate_formatted: null,
  venue_hourly_rate_formatted: null,
  venue_monthly_rate_formatted: null,
};

export const rating = {
  avg: 4.2,
  count: 3,
};

export const reviews = {
  per_page: 7,
  venue_reviews: [
    {
      created_at: '2014-03-05 08:01:46',
      id: 1,
      owner_first_name: 'Joanne',
      owner_last_name: 'Lastname',
      ranking: 4.8,
      reply: {
        created_at: '2015-01-05 17:01:46',
        creator_first_name: 'Michelle',
        creator_last_name: 'Lastname',
        text: 'We are happy you had a great experience.',
      },
      text: 'Staying in this property is a unique experience and Vanessa who met us on arrival was so incredibly helpful and welcoming. We really loved staying here and on the island. The property is in need of a little tlc in some places but overall these small things do not detract from be. Staying in this property is a unique experience and Vanessa who met us on arrival was so incredibly helpful and welcoming. We really loved staying here and on the island. The property is in need of a little tlc in some places but overall these small things do not detract from be. Staying in this property is a unique experience and Vanessa who met us on arrival was so incredibly helpful and welcoming. We really loved staying here and on the island. The property is in need of a little tlc in some places but overall these small things do not detract from be.',
    },
    {
      created_at: '2015-08-05 01:01:46',
      id: 2,
      owner_first_name: 'Joanne',
      owner_last_name: 'Lastname',
      ranking: 4.2,
      text: 'Staying in this property is a unique experience and Vanessa who met us on arrival was so incredibly helpful and welcoming. We really loved staying here and on the island. The property is in need of a little tlc in some places but overall these small things do not detract from be. Staying in this property is a unique experience and Vanessa who met us on arrival was so incredibly helpful and welcoming. We really loved staying here and on the island. The property is in need of a little tlc in some places but overall these small things do not detract from be. Staying in this property is a unique experience and Vanessa who met us on arrival was so incredibly helpful and welcoming. We really loved staying here and on the island. The property is in need of a little tlc in some places but overall these small things do not detract from be.',
    },
    {
      created_at: '2014-03-05 08:01:46',
      id: 3,
      owner_first_name: 'Joanne',
      owner_last_name: 'Lastname',
      ranking: 3.6,
      reply: {
        created_at: '2015-01-05 17:01:46',
        creator_first_name: 'Val',
        creator_last_name: 'Lastname',
        text: 'Staying in this property is a unique experience and Vanessa who met us on arrival was so incredibly helpful and welcoming. We really loved staying here and on the island. The property is in need of a little tlc in some places but overall these small things do not detract from be. Staying in this property is a unique experience and Vanessa who met us on arrival was so incredibly helpful and welcoming. We really loved staying here and on the island. The property is in need of a little tlc in some places but overall these small things do not detract from be. Staying in this property is a unique experience and Vanessa who met us on arrival was so incredibly helpful and welcoming. We really loved staying here and on the island. The property is in need of a little tlc in some places but overall these small things do not detract from be.',
      },
      text: 'Staying in this property is a unique experience and Vanessa who met us on arrival was so incredibly helpful and welcoming. We really loved staying here and on the island. The property is in need of a little tlc in some places but overall these small things do not detract from be. Staying in this property is a unique experience and Vanessa who met us on arrival was so incredibly helpful and welcoming. We really loved staying here and on the island. The property is in need of a little tlc in some places but overall these small things do not detract from be. Staying in this property is a unique experience and Vanessa who met us on arrival was so incredibly helpful and welcoming. We really loved staying here and on the island. The property is in need of a little tlc in some places but overall these small things do not detract from be.',
    },
  ],
};
