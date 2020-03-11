export const booking = [
  {
    date_from: '9 Aug 2019',
    date_to: '11 Aug 2019',
    employee: 'Sarah Smith',
    id: 44444,
    location: 'London',
    space: 'The Warehouse · Sutherland Labs',
    status: 'Pending',
    statusId: 1,
  },
  {
    date_from: '19 Aug 2019',
    date_to: '22 Aug 2019',
    employee: 'Bob Smith',
    id: 44445,
    location: 'London',
    space: 'The Warehouse · Sutherland Labs',
    status: 'Accepted',
    statusId: 3,
  },
  {
    date_from: '23 Aug 2019',
    date_to: '24 Aug 2019',
    employee: 'Alice Smith',
    id: 44446,
    location: 'London',
    space: 'The Warehouse · Sutherland Labs',
    status: 'Cancelled',
    statusId: 5,
  },
];

export const invoice = [
  {
    amount: '£120.00',
    date: 'May 2019',
    id: 44442,
    status: 'Current',
    statusId: 1,
  },
  {
    amount: '£156.00',
    date: 'June 2019',
    id: 44443,
    status: 'Payment due',
    statusId: 2,
  },
  {
    amount: '£391.00',
    date: 'April 2019',
    id: 44444,
    status: 'Paid',
    statusId: 3,
  },
];

export const people = {
  admin: [
    {
      email: 'sarah.smith@gmail.com',
      name: 'Sarah Smith',
    },
    {
      email: 'bob.smith@gmail.com',
      name: 'Bob Smith',
    },
  ],
  all: [
    {
      email: 'sarah.smith@gmail.com',
      name: 'Sarah Smith',
      role: 'Role',
    },
    {
      email: 'bob.smith@gmail.com',
      name: 'Bob Smith',
      role: 'Role...',
    },
    {
      email: 'alice.smith@gmail.com',
      name: 'Alice Smith',
      role: 'Role...',
    },
  ],
  team: [
    {
      email: 'alice.smith@gmail.com',
      name: 'Alice Smith',
    },
  ],
};

export const report = [
  {
    date_from: '9 Aug 2019',
    date_to: '11 Aug 2019',
    duration: '2 days',
    employee: 'Sarah Smith',
    id: 44442,
    location: 'London',
    payee: 'Central billing',
    people: 10,
    total: '£1000.00',
  },
  {
    date_from: '19 Aug 2019',
    date_to: '22 Aug 2019',
    duration: '3 days',
    employee: 'Bob Smith',
    id: 44443,
    location: 'Birmingham',
    payee: 'Expense',
    people: 7,
    total: '£3200.00',
  },
];
