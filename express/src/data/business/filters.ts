// TODO: hardcoded lang (status names)
export const bookingFilters = {
  booking: [
    [
      {
        id: 'upcoming_bookings',
        label: 'business.upcoming_bookings',
        name: 'upcoming_bookings',
      },
    ],
    [
      {
        id: 'past_bookings',
        label: 'business.past_bookings',
        name: 'past_bookings',
      },
    ],
  ],
  status: [
    [
      {
        id: 'pending',
        label: 'Pending (1)',
        name: 'pending',
      },
      {
        id: 'accepted',
        label: 'Accepted (3)',
        name: 'accepted',
      },
    ],
    [
      {
        id: 'cancelled',
        label: 'Cancelled (1)',
        name: 'cancelled',
      },
    ],
  ],
};

export const invoiceFilters = {
  status: [
    [
      {
        id: 'paid',
        label: 'Paid (4)',
        name: 'paid',
      },
      {
        id: 'payment_due',
        label: 'Payment due (3)',
        name: 'payment_due',
      },
    ],
    [
      {
        id: 'current',
        label: 'Current (1)',
        name: 'current',
      },
    ],
  ],
};

export const peopleFilters = {
  role: [
    [
      {
        id: 'admin',
        label: 'common.admin',
        name: 'admin',
      },
    ],
    [
      {
        id: 'team',
        label: 'business.team',
        name: 'team',
      },
    ],
  ],
};
