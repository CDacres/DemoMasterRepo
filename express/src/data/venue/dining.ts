import { ConfigurationKind } from '@src/core/domain';

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
      description: 'Exclusive venue hire is perfect for when you have a large event for up to 350 people over two floors. We are is proud to have been voted the best All In One Venue in the London Bridge area in the Design My Night 2017/2018 Awards within six months of opening. It is a vibrant, spacious multi-functional venue featuring a bar on each floor, a restaurant and events space that is industrial in style with original exposed brickwork, a polished concrete floor, up-cycled furniture along with pops of colour throughout the venue and unapologetic artwork to get your guests talking. For smaller numbers various elements of your events can be held on either the upper floor or the lower floor. Seated over two floors approx. 170 people / Standing over two floors up to 350 people. Upper floor is wheelchair accessible and the lower floor is not.',
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
