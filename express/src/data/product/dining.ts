/* tslint:disable:max-line-length */
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
  ],
};

export const amenities = [
  // {
  //   amenity_id: -16,
  //   image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/24h-4x.png',
  //   name: '24 hour access',
  // },
  // {
  //   amenity_id: 23,
  //   image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/accessibility-4x.png',
  //   name: 'Accessibility',
  // },
  // {
  //   amenity_id: -129,
  //   image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/air-conditioning-4x.png',
  //   name: 'Air conditioning',
  // },
  // {
  //   amenity_id: -32,
  //   image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/audio-recording-4x.png',
  //   name: 'Audio recording',
  // },
  // {
  //   amenity_id: -19,
  //   image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/bicycle-storage-4x.png',
  //   name: 'Bike storage',
  //   price: 15,
  // },
  // {
  //   amenity_id: -2,
  //   image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/breakout-space-4x.png',
  //   name: 'Breakout spaces (shared)',
  // },
  // {
  //   amenity_id: -20,
  //   image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/coffee-maker-4x.png',
  //   name: 'Cafe',
  //   price: 30,
  // },
  // {
  //   amenity_id: -21,
  //   image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/childrens-books-toys-4x.png',
  //   name: 'Childcare',
  // },
  // {
  //   amenity_id: -135,
  //   image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/cleaning-4x.png',
  //   name: 'Cleaning',
  // },
  // {
  //   amenity_id: -140,
  //   image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/cloakroom-4x.png',
  //   name: 'Cloakroom',
  // },
  // {
  //   amenity_id: 20,
  //   image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/conference-phone-4x.png',
  //   name: 'Conferencing Phone',
  // },
  // {
  //   amenity_id: -126,
  //   image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/confetti-4x.png',
  //   name: 'Confetti permitted',
  // },
  // {
  //   amenity_id: -116,
  //   image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/dance-floor-4x.png',
  //   name: 'Dance floor',
  // },
  // {
  //   amenity_id: -119,
  //   image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/dj-facilities-4x.png',
  //   name: 'DJ facilities',
  // },
  // {
  //   amenity_id: -117,
  //   image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/entertainment-licence-4x.png',
  //   name: 'Entertainment license',
  // },
  // {
  //   amenity_id: -141,
  //   image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/suitable-for-events-4x.png',
  //   name: 'Event Coordinator',
  // },
  // {
  //   amenity_id: -22,
  //   image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/suitable-for-events-4x.png',
  //   name: 'Event space on site',
  // },
  // {
  //   amenity_id: 24,
  //   image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/flipchart-4x.png',
  //   name: 'Flipchart',
  // },
  // {
  //   amenity_id: -24,
  //   image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/gym-4x.png',
  //   name: 'Gym',
  // },
  // {
  //   amenity_id: -127,
  //   image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/helipad-4x.png',
  //   name: 'Helipad',
  // },
  // {
  //   amenity_id: -139,
  //   image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/hostess-4x.png',
  //   name: 'Hostess',
  // },
  // {
  //   amenity_id: -34,
  //   image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/hot-tub-4x.png',
  //   name: 'Hot tub',
  // },
  // {
  //   amenity_id: -136,
  //   image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/kitchen-4x.png',
  //   name: 'Kitchen',
  // },
  // {
  //   amenity_id: -118,
  //   image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/live-music-4x.png',
  //   name: 'Live band facilities',
  // },
  // {
  //   amenity_id: -25,
  //   image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/locker-4x.png',
  //   name: 'Lockers',
  // },
  // {
  //   amenity_id: -9,
  //   image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/mailing-address-4x.png',
  //   name: 'Mailing address',
  // },
  // {
  //   amenity_id: -115,
  //   image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/marquee-4x.png',
  //   name: 'Marquee available',
  // },
  // {
  //   amenity_id: -122,
  //   image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/toastmaster-4x.png',
  //   name: 'Master of ceremonies / toastmaster',
  // },
  // {
  //   amenity_id: -11,
  //   image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/meeting-room-on-site-4x.png',
  //   name: 'Meeting rooms on site',
  // },
  // {
  //   amenity_id: -5,
  //   image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/mic-4x.png',
  //   name: 'Microphone',
  // },
  // {
  //   amenity_id: -4,
  //   image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/technical-support-4x.png',
  //   name: 'On site technical support',
  // },
  // {
  //   amenity_id: -120,
  //   image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/fireworks-permitted-4x.png',
  //   name: 'Outdoor fireworks permitted',
  // },
  // {
  //   amenity_id: -137,
  //   image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/garden-backyard-4x.png',
  //   name: 'Outside space',
  // },
  // {
  //   amenity_id: 22,
  //   image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/parking-4x.png',
  //   name: 'Parking',
  // },
  // {
  //   amenity_id: 25,
  //   image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/penpaper-4x.png',
  //   name: 'Pen/Paper',
  // },
  // {
  //   amenity_id: -26,
  //   image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/pets-allowed-4x.png',
  //   name: 'Pets allowed',
  // },
  // {
  //   amenity_id: -12,
  //   image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/phonebooth-4x.png',
  //   name: 'Phone booths',
  // },
  // {
  //   amenity_id: -33,
  //   image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/pool-4x.png',
  //   name: 'Pool',
  // },
  // {
  //   amenity_id: -13,
  //   image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/printer-4x.png',
  //   name: 'Printing',
  // },
  // {
  //   amenity_id: 26,
  //   image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/tv-projector-4x.png',
  //   name: 'Projector/TV/Screen',
  // },
  // {
  //   amenity_id: -7,
  //   image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/reception-4x.png',
  //   name: ConfigurationKind.RECEPTION,
  // },
  // {
  //   amenity_id: -15,
  //   image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/self-check-in-4x.png',
  //   name: 'Secure access',
  // },
  // {
  //   amenity_id: -142,
  //   image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/security-4x.png',
  //   name: 'Security staff',
  // },
  // {
  //   amenity_id: -27,
  //   image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/showers-4x.png',
  //   name: 'Showers',
  // },
  // {
  //   amenity_id: -138,
  //   image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/smoking-allowed-4x.png',
  //   name: 'Smoking area',
  // },
  // {
  //   amenity_id: -131,
  //   image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/speaker-4x.png',
  //   name: 'Speakers',
  // },
  // {
  //   amenity_id: -143,
  //   image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/ticketing-event-4x.png',
  //   name: 'Ticketing event possible',
  // },
  // {
  //   amenity_id: -14,
  //   image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/trading-address-4x.png',
  //   name: 'Trading address',
  // },
  // {
  //   amenity_id: 18,
  //   image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/video-conference-4x.png',
  //   name: 'Video Conference Phone',
  // },
  // {
  //   amenity_id: 19,
  //   image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/whiteboard-4x.png',
  //   name: 'Whiteboards',
  // },
  // {
  //   amenity_id: 15,
  //   image_url: 'https://65dd94d74e66e2a2a076-b0c2c220483ae2331d7eb36213a5b418.ssl.cf3.rackcdn.com/amenities/wireless-internet-4x.png',
  //   name: 'Wireless Internet Access',
  // },
];

export const assetTags = [];

export const capacityRange = {
  max_capacity: 350,
  min_capacity: 8,
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

export const images = { main: 'https://abac7c57c1374ed95f4b-fc517bfeb78f64bd2cb175c56cdcead7.ssl.cf3.rackcdn.com//214264/870_450_b1a3f8127cf4ab4af3784df27a9c6728.jpg' };

export const info = {
  description: 'Our Private Dining Room is the perfect intimate space for private dining, celebrations or receptions. Situated on the lower level, our Private Dining Room is situated within a railway arch and the room has a warm and spacious yet industrial feel to it. This room has glass doors so you can enjoy the ambiance of the rest of the venue in your own private setting. Our tables have been hand-made locally from reclaimed wood and they add a certain charm to the room. The room can be arranged to suit the requirements of your event.',
  owner_first_name: 'Steve',
  owner_last_name: 'Lastname',
  response_rate: '99',
  response_time: 'room.within_an_hour',
  venue_city: 'London',
  venue_name: 'Venue Name',
  vertical_id: 4,
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
    'https://static.wixstatic.com/media/5d2821_d390ae8a83794a73bd45742df6607de5~mv2.jpg',
    'https://static.wixstatic.com/media/5d2821_a21d63870bfe4a6c8d0d6b7f74fdcdba~mv2_d_2024_1346_s_2.jpg',
    'https://static.wixstatic.com/media/5d2821_e123807f9d454208a94d27320d191a5e~mv2.jpg',
    'https://static.wixstatic.com/media/c7df233358a648308e26fb135755ba01.jpg',
    'https://static.wixstatic.com/media/3e7b0c761bd247e9a84450934614f883.jpg',
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

export const name = 'Venue Name';

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
    title: 'Book a table',
  },
  {
    extras: {
      configurations: [
        {
          config_id: 3,
          max_capacity: 170,
          name: ConfigurationKind.BANQUET,
        },
        {
          config_id: 6,
          max_capacity: 350,
          name: ConfigurationKind.RECEPTION,
        },
      ],
      pictures: ['https://abac7c57c1374ed95f4b-fc517bfeb78f64bd2cb175c56cdcead7.ssl.cf3.rackcdn.com//214266/870_450_c35e3dddbcb2856752b2cfb13af50dd0.jpg'],
      description: 'Our lower floor features its own bar and is a bright spacious area to hold your event. After dark it becomes a great space for an exclusive party and is sure to wow your guests. Our private room is also located on this floor and can be used as a games room to suit the theme of your party. Perfect for parties and celebrations, receptions, corporate events, visual merchandising, photo shoots and filming.',
    },
    offerText: '30% off after dark raves',
    price: '£800 flat rate',
    title: 'Lower Floor',
  },
  {
    extras: {
      configurations: [
        {
          config_id: 3,
          max_capacity: 110,
          name: ConfigurationKind.BANQUET,
        },
        {
          config_id: 6,
          max_capacity: 200,
          name: ConfigurationKind.RECEPTION,
        },
      ],
      pictures: ['https://abac7c57c1374ed95f4b-fc517bfeb78f64bd2cb175c56cdcead7.ssl.cf3.rackcdn.com//214267/870_450_ced9a7e67d6e043609b1cdf9f788912d.jpg'],
      description: 'Our upper arch is a light airy space that benefits from natural daylight and features a giant billboard from one of our selected current artists. This semi-private space has a raised area at one end of the arch and our comfy curved pink booth adds a pop of colour to the original exposed brickwork and wooden floorboards. Perfects for birthday parties, engagement & anniversary celebrations, corporate events and drinks receptions. Seats approx. 30 and approx. 50 standing.',
    },
    price: '£3,000 min. spend',
    times: ['Mon - Thur 18:00 - 21:00'],
    title: 'Upper Arch',
  },
  {
    extras: {
      configurations: [
        {
          config_id: 3,
          max_capacity: 110,
          name: ConfigurationKind.BANQUET,
        },
        {
          config_id: 6,
          max_capacity: 200,
          name: ConfigurationKind.RECEPTION,
        },
      ],
      pictures: ['https://abac7c57c1374ed95f4b-fc517bfeb78f64bd2cb175c56cdcead7.ssl.cf3.rackcdn.com//214267/870_450_ced9a7e67d6e043609b1cdf9f788912d.jpg'],
      description: 'Our upper arch is a light airy space that benefits from natural daylight and features a giant billboard from one of our selected current artists. This semi-private space has a raised area at one end of the arch and our comfy curved pink booth adds a pop of colour to the original exposed brickwork and wooden floorboards. Perfects for birthday parties, engagement & anniversary celebrations, corporate events and drinks receptions. Seats approx. 30 and approx. 50 standing.',
    },
    price: '£5,000 min. spend',
    times: ['Fri - Sat 18:00 - 21:00'],
    title: 'Upper Arch',
  },
  {
    extras: {
      configurations: [
        {
          config_id: 6,
          max_capacity: 50,
          name: ConfigurationKind.RECEPTION,
        },
      ],
      pictures: ['https://abac7c57c1374ed95f4b-fc517bfeb78f64bd2cb175c56cdcead7.ssl.cf3.rackcdn.com//214268/870_450_f7ec2285618c589653bef398445ab095.jpg'],
      description: 'Exclusive venue hire is perfect for when you have a large event for up to 350 people over two floors. We are proud to have been voted the best All In One Venue in the London Bridge area in the Design My Night 2017/2018 Awards within six months of opening. It is a vibrant, spacious multi-functional venue featuring a bar on each floor, a restaurant and events space that is industrial in style with original exposed brickwork, a polished concrete floor, up-cycled furniture along with pops of colour throughout the venue and unapologetic artwork to get your guests talking. For smaller numbers various elements of your events can be held on either the upper floor or the lower floor. Seated over two floors approx. 170 people / Standing over two floors up to 350 people. Upper floor is wheelchair accessible and the lower floor is not.',
    },
    price: '£6,000 flat rate',
    title: 'Exclusive Venue Hire',
  },
  {
    extras: {
      listOptions: [
        'Room hire',
        'cake',
        'coffee break',
        'cocktail closing',
      ],
      optionTitle: 'My package contains',
    },
    price: '£50 per person',
    title: 'Birthday Package',
  },
  {
    extras: {
      listOptions: [
        'Room hire',
        'crackers',
        'mulled wine',
        'mince pies',
        'showing of Home Alone',
      ],
      optionTitle: 'My package contains',
    },
    offerText: 'Book by the end of May and get 20% off the bill',
    price: '£98 per person',
    title: 'Christmas Package',
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
  avg: 5,
  count: 1,
};

export const reviews = {
  per_page: 7,
  venue_reviews: [
    {
      created_at: '2019-02-05 08:01:46',
      id: 1,
      owner_first_name: 'Irina',
      owner_last_name: 'Lastname',
      ranking: 5,
      text: 'The venue offers a lovely cosy room on the ground floor. The setting is quirky and unusual. The service was super professional and efficient. All in all, we are super happy.',
    },
  ],
};
