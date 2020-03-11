// TODO: hardcoded lang (status names)
export const bookingFilters = {
  user: {
    state: [
      [
        {
          id: 'current',
          label: 'Current (100)',
          name: 'current',
        },
        {
          id: 'upcoming',
          label: 'Upcoming (23)',
          name: 'upcoming',
        },
      ],
      [
        {
          id: 'previous',
          label: 'Previous (44)',
          name: 'previous',
        },
      ],
    ],
    status: [
      [
        {
          id: 'pending',
          label: 'Pending (33)',
          name: 'pending',
        },
        {
          id: 'accepted',
          label: 'Accepted (23)',
          name: 'accepted',
        },
        {
          id: 'declined',
          label: 'Declined (66)',
          name: 'declined',
        },
      ],
      [
        {
          id: 'cancelled',
          label: 'Cancelled (44)',
          name: 'cancelled',
        },
        {
          id: 'waiting_for_review',
          label: 'Waiting for review (123)',
          name: 'waiting_for_review',
        },
      ],
    ],
  },
  venue: {
    payout: [
      [
        {
          id: 'payout_pending',
          label: 'Pending (22)',
          name: 'payout_pending',
        },
      ],
      [
        {
          id: 'settled',
          label: 'Settled (1)',
          name: 'payout_settled',
        },
      ],
    ],
    state: [
      [
        {
          id: 'current',
          label: 'Current (100)',
          name: 'current',
        },
        {
          id: 'upcoming',
          label: 'Upcoming (23)',
          name: 'upcoming',
        },
      ],
      [
        {
          id: 'previous',
          label: 'Previous (44)',
          name: 'previous',
        },
      ],
    ],
    status: [
      [
        {
          id: 'pending',
          label: 'Pending (33)',
          name: 'pending',
        },
        {
          id: 'accepted',
          label: 'Accepted (23)',
          name: 'accepted',
        },
        {
          id: 'declined',
          label: 'Declined (66)',
          name: 'declined',
        },
      ],
      [
        {
          id: 'cancelled',
          label: 'Cancelled (44)',
          name: 'cancelled',
        },
        {
          id: 'waiting_for_review',
          label: 'Waiting for review (123)',
          name: 'waiting_for_review',
        },
      ],
    ],
  },
};

export const teamFilters = {
  role: [
    [
      {
        id: 'company_admin',
        label: 'dashboard.company_admin',
        name: 'company_admin',
      },
    ],
    [
      {
        id: 'venue_admin',
        label: 'dashboard.venue_admin',
        name: 'venue_admin',
      },
    ],
  ],
};
