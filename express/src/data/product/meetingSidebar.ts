// TODO: replace with api data
export const types = [
  {
    price: {
      amount: '£235',
    },
    title: 'Hourly',
    type: 'hour',
  },
  {
    price: {
      amount: '£900',
    },
    title: 'Half day',
    type: '1/2 day',
  },
  {
    price: {
      amount: '£2115',
      discounted: '£1613',
    },
    title: 'Daily',
    type: 'Daily',
  },
  {
    options: [
      'morning coffee',
      'sandwich lunch',
      'coffee break',
      'afternoon break',
      'meeting equipment',
    ],
    price: {
      amount: '£55 /pers.',
    },
    price_person: 55,
    subtitle: 'Morning coffee, sandwich lunch, coffee break, afternoon break, meeting equipment',
    title: 'Package: Meeting basic',
    type: 'DDR',
  },
  {
    options: [
      'morning breakfast',
      'lunch',
      'coffee break',
      'afternoon break',
      'cocktail closing',
      'meeting equipment',
    ],
    price: {
      amount: '£85 /pers.',
    },
    price_person: 85,
    subtitle: 'Morning breakfast, lunch, coffee break, afternoon break, cocktail closing, meeting equipment',
    title: 'Package: Meeting premium',
    type: 'DDR',
  },
];
