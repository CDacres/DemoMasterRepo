/* tslint:disable:max-line-length quotemark */
import { ConfigurationKind } from '@src/core/domain';

export const amenities = [
  {
    amenity_id: 15,
    image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/wireless-internet-4x.png',
    name: 'Wireless Internet Access',
  },
  {
    amenity_id: 23,
    image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/accessibility-4x.png',
    name: 'Accessibility',
  },
  {
    amenity_id: 22,
    image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/parking-4x.png',
    name: 'Parking',
  },
  {
    amenity_id: -7,
    image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/reception-4x.png',
    name: 'Reception',
  },
  {
    amenity_id: 26,
    image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/tv-projector-4x.png',
    name: 'Projector/TV/Screen',
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
    amenity_id: -122,
    image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/toastmaster-4x.png',
    name: 'Master of ceremonies / toastmaster',
  },
  {
    amenity_id: -115,
    image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/marquee-4x.png',
    name: 'Marquee available',
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
    amenity_id: -120,
    image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/fireworks-permitted-4x.png',
    name: 'Outdoor fireworks permitted',
  },
  {
    amenity_id: -140,
    image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/cloakroom-4x.png',
    name: 'Cloakroom',
  },
  {
    amenity_id: -137,
    image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/garden-backyard-4x.png',
    name: 'Outside space',
  },
  {
    amenity_id: -126,
    image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/confetti-4x.png',
    name: 'Confetti permitted',
  },
  {
    amenity_id: -33,
    image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/pool-4x.png',
    name: 'Pool',
  },
  {
    amenity_id: -127,
    image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/helipad-4x.png',
    name: 'Helipad',
  },
];

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
  pictures: ['https://hitchedukir.hitched.co.uk/Temp/1000_1000_scaled_1855942_queens-hous-201602181140316263813518.jpg'],
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
          max_capacity: 30,
          name: ConfigurationKind.BOARDROOM,
        },
        {
          config_id: 2,
          max_capacity: 50,
          name: ConfigurationKind.CLASSROOM,
        },
        {
          config_id: 3,
          max_capacity: 120,
          name: ConfigurationKind.BANQUET,
        },
        {
          config_id: 4,
          max_capacity: 120,
          name: ConfigurationKind.THEATRE,
        },
        {
          config_id: 6,
          max_capacity: 120,
          name: ConfigurationKind.RECEPTION,
        },
        {
          config_id: 8,
          max_capacity: 60,
          name: ConfigurationKind.CABARET,
        },
      ],
      description: "The Great Hall of The Queen' House is a stunning space with a large vaulted ceiling and a 400 year old black and white marble floor. The space is perfect for larger lunches and presentations or panel discussions. With the abundance of green space there are also opportunities for outdoor drinks receptions and evening soirees following daytime hire.",
      pictures: [
        'https://abac7c57c1374ed95f4b-fc517bfeb78f64bd2cb175c56cdcead7.ssl.cf3.rackcdn.com//214373/870_450_e6ee3b9b71ddebf25856cc777d670a20.jpg',
        'https://abac7c57c1374ed95f4b-fc517bfeb78f64bd2cb175c56cdcead7.ssl.cf3.rackcdn.com//214373/870_450_c56c5af37ecb4e6c0e23ca6e21015305.jpg',
      ],
    },
    price: '£4,000 /day',
    title: 'Great Hall',
  },
  {
    extras: {
      configurations: [
        {
          config_id: 3,
          max_capacity: 580,
          name: ConfigurationKind.BANQUET,
        },
        {
          config_id: 4,
          max_capacity: 400,
          name: ConfigurationKind.THEATRE,
        },
        {
          config_id: 6,
          max_capacity: 1000,
          name: ConfigurationKind.RECEPTION,
        },
      ],
      description: 'Royal Museums Greenwich provides ample opportunities for all types of receptions and networking events. The largest of our venues is the National Maritime Museum, conveniently located near the ExCel centre and Canary Wharf. Guests can take a break from the hospitality and visit one of our many galleries such as: Nelson, Navy Nation, Jutland and Traders: The East India Company and Asia. If the weather is fine, guests can also make use of the stone colonnades and beautiful grounds.',
      pictures: [
        'https://abac7c57c1374ed95f4b-fc517bfeb78f64bd2cb175c56cdcead7.ssl.cf3.rackcdn.com//214379/870_450_2ae2985ba8c8e912b42e2f39d10b984c.jpg',
        'https://abac7c57c1374ed95f4b-fc517bfeb78f64bd2cb175c56cdcead7.ssl.cf3.rackcdn.com//214379/870_450_f86151910cb80f352a8b44d0d4f36a66.jpg',
        'https://abac7c57c1374ed95f4b-fc517bfeb78f64bd2cb175c56cdcead7.ssl.cf3.rackcdn.com//214379/870_450_f1769c556a0c9a1e07cb22b16af085e3.jpg',
      ],
    },
    price: '£14,000 /day',
    title: 'National Maritime Museum',
  },
  {
    extras: {
      configurations: [
        {
          config_id: 3,
          max_capacity: 60,
          name: ConfigurationKind.BANQUET,
        },
        {
          config_id: 6,
          max_capacity: 120,
          name: ConfigurationKind.RECEPTION,
        },
      ],
      description: 'From its hilltop setting in Greenwich Park, the Royal Observatory commands breath-taking views of Canary Wharf and the City of London. The House is the original Observatory building, designed by Sir Christopher Wren in 1675 to house the Astronomers Royal. At its heart is the magnificent Octagon Room, the reception room of the Astronomer Royals for hundreds of years. It is truly amazing to dine at the home of time. Events can be enhanced by private tours, telescope viewings as well as planetarium shows.',
      pictures: [
        'https://abac7c57c1374ed95f4b-fc517bfeb78f64bd2cb175c56cdcead7.ssl.cf3.rackcdn.com//214378/870_450_c341172036fac518064a72515b7ddd49.jpg',
        'https://abac7c57c1374ed95f4b-fc517bfeb78f64bd2cb175c56cdcead7.ssl.cf3.rackcdn.com//214378/870_450_e9eec8e68405689c96243af0a5f1e8d5.jpg',
        'https://abac7c57c1374ed95f4b-fc517bfeb78f64bd2cb175c56cdcead7.ssl.cf3.rackcdn.com//214378/870_450_607952cf2f6a985b7d230c61569305c0.jpg',
        'https://abac7c57c1374ed95f4b-fc517bfeb78f64bd2cb175c56cdcead7.ssl.cf3.rackcdn.com//214378/870_450_6eb202e3726c24aaf7e3c880df69b10d.jpg',
        'https://abac7c57c1374ed95f4b-fc517bfeb78f64bd2cb175c56cdcead7.ssl.cf3.rackcdn.com//214378/870_450_885af1af94c0b91d25bc3565b8028d30.jpg',
      ],
    },
    price: '£10,000 /day',
    title: 'Royal Observatory',
  },
  {
    extras: {
      configurations: [
        {
          config_id: 3,
          max_capacity: 270,
          name: ConfigurationKind.BANQUET,
        },
        {
          config_id: 4,
          max_capacity: 300,
          name: ConfigurationKind.THEATRE,
        },
        {
          config_id: 6,
          max_capacity: 450,
          name: ConfigurationKind.RECEPTION,
        },
      ],
      description: "Greenwich's Cutty Sark, the most famous of the Museum's collection is a unique historic setting for any event. Its history combined with the amazing feat of engineering to suspend its 3 metres above the floor provides guests with a very memorable event experience. As well as its dining space under the hull, why not hold your drinks reception on its upper decks under its towering masts whilst watching the sunset over Canary Wharf?",
      pictures: [
        'https://abac7c57c1374ed95f4b-fc517bfeb78f64bd2cb175c56cdcead7.ssl.cf3.rackcdn.com//214376/870_450_c456ac30382f2443018b6878bb46fe6a.jpg',
        'https://abac7c57c1374ed95f4b-fc517bfeb78f64bd2cb175c56cdcead7.ssl.cf3.rackcdn.com//214376/870_450_251893f11c58d432aa589a4d6121df94.jpg',
        'https://abac7c57c1374ed95f4b-fc517bfeb78f64bd2cb175c56cdcead7.ssl.cf3.rackcdn.com//214376/870_450_01ae80046057e9e59bf141e5c1e2322d.jpg',
        'https://abac7c57c1374ed95f4b-fc517bfeb78f64bd2cb175c56cdcead7.ssl.cf3.rackcdn.com//214376/870_450_1669618c33bd43a4f3e170ef35700eda.jpg',
      ],
    },
    price: '£12,000 /day',
    title: 'The Cutty Sark',
  },
  {
    extras: {
      listOptions: [
        'Room hire',
        'Cocktails',
        'Registrar',
        'Wedding Coordinator',
        'Sandwich lunch',
      ],
      optionTitle: 'My package contains',
    },
    price: '£95 per head',
    title: 'Wedding Package - Silver',
  },
  {
    extras: {
      listOptions: [
        'Room hire',
        'Accommodation',
        'Cocktails',
        'Registrar',
        'Wedding Coordinator',
        '3 course menu lunch',
      ],
      optionTitle: 'My package contains',
    },
    price: '£200 per head',
    title: 'Wedding Package - Diamond',
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
