import * as React from 'react';

// Components
import { Person } from '@src/components/concrete/Icons/svgs';

declare const window: {
  hubspot: any;
};

const initHSChat = () => {
  if (typeof window !== 'undefined') {
    window.hubspot.messages.EXPERIMENTAL_API.requestWidgetOpen();
  }
};

export const linkGroups = config => [
  {
    id: 1,
    title: { transKey: 'nav.venue' },
    links: [
      {
        id: 1,
        title: { transKey: 'nav.listings' },
        url: '/dashboard/listings',
        shown: true,
      },
      {
        id: 2,
        title: { transKey: 'nav.reviews' },
        url: '/dashboard/reviews',
        shown: true,
      },
      {
        id: 3,
        title: { transKey: 'nav.members' },
        url: '/dashboard/members',
        shown: true,
      },
      {
        id: 4,
        title: { transKey: 'nav.add_new_listing' },
        url: '/dashboard/listings',
        shown: true,
      },
    ],
  },
  {
    id: 2,
    title: { transKey: 'User Actions' },
    links: [
      {
        id: 1,
        title: { transKey: 'nav.dashboard' },
        url: '/dashboard',
        shown: true,
      },
      {
        id: 2,
        icon: <Person />,
        title: { transKey: 'nav.account_settings' },
        url: '/dashboard/edit-profile',
        shown: true,
      },
      {
        id: 3,
        title: { transKey: 'nav.reviews' },
        url: '/dashboard/reviews',
        // shown: !user.isVenueOwner, TODO: fix this
        shown: false,
      },
      {
        id: 4,
        title: { transKey: 'common.logout' },
        url: '/users/logout',
        shown: true,
      },
    ],
  },
  {
    id: 3,
    title: { transKey: 'common.help' },
    links: [
      {
        id: 1,
        title: { transKey: 'common.start_a_chat' },
        action: initHSChat,
        shown: true,
      },
      {
        id: 2,
        title: { transKey: 'common.faq' },
        url: '/faq',
        shown: true,
      },
      {
        id: 3,
        title: {
          transKey: 'common.phone_display',
          replacements: { phoneNumber: config.phone.phoneNumberDisplay },
          count: 1,
        },
        tel: config.phone.phoneNumber,
        shown: true,
      },
    ],
  },
  {
    id: 4,
    title: { transKey: 'Performance' },
    links: [
      {
        id: 1,
        title: { transKey: 'Performance' },
        url: '/administrator',
        shown: true,
      },
      {
        id: 2,
        title: { transKey: 'Finance' },
        url: '/administrator/payments/summary',
        shown: true,
      },
      {
        id: 3,
        title: { transKey: 'Performance (GS)' },
        url: '/administrator/google_studio/performance',
        shown: true,
      },
      {
        id: 4,
        title: { transKey: 'Reviews (GS)' },
        url: '/administrator/google_studio/reviews',
        shown: true,
      },
    ],
  },
  {
    id: 5,
    title: { transKey: 'Payments' },
    links: [
      {
        id: 1,
        title: { transKey: 'Payouts' },
        url: '/administrator/payouts',
        shown: true,
      },
      {
        id: 2,
        title: { transKey: 'Financial Entities' },
        url: '/administrator/financial_entities',
        shown: true,
      },
      {
        id: 3,
        title: { transKey: 'Unpaid invoices (GS)' },
        url: '/administrator/google_studio/invoices',
        shown: true,
      },
    ],
  },
  {
    id: 6,
    title: { transKey: 'Inventory' },
    links: [
      {
        id: 1,
        title: { transKey: 'Locations' },
        url: '/administrator/locations',
        shown: true,
      },
      // {
      //     id: 2,
      //     title: { transKey: 'Landing Pages' },
      //     url: '/administrator/landings',
      //     shown: true,
      // },
      {
        id: 3,
        title: { transKey: 'Venues' },
        url: '/administrator/members/venues',
        shown: true,
      },
      {
        id: 4,
        title: { transKey: 'Rooms' },
        url: '/administrator/rooms',
        shown: true,
      },
      {
        id: 5,
        title: { transKey: 'Venue Photos' },
        url: '/administrator/photos/venues',
        shown: true,
      },
      {
        id: 6,
        title: { transKey: 'Room Photos' },
        url: '/administrator/photos/rooms',
        shown: true,
      },
      {
        id: 7,
        title: { transKey: 'Venues (GS)' },
        url: '/administrator/google_studio/venues',
        shown: true,
      },
      {
        id: 8,
        title: { transKey: 'Rooms Tags (GS)' },
        url: '/administrator/google_studio/rooms',
        shown: true,
      },
      {
        id: 9,
        title: { transKey: 'Rooms Approval (GS)' },
        url: '/administrator/google_studio/rooms_approval',
        shown: true,
      },
      {
        id: 10,
        title: { transKey: 'Asset Photos (GS)' },
        url: '/administrator/google_studio/asset_photos',
        shown: true,
      },
      {
        id: 11,
        title: { transKey: 'Site Images (GS)' },
        url: '/administrator/google_studio/site_images',
        shown: true,
      },
      {
        id: 12,
        title: { transKey: 'Landing Pages (GS)' },
        url: '/administrator/google_studio/landing_pages',
        shown: true,
      },
      {
        id: 13,
        title: { transKey: 'Tags (GS)' },
        url: '/administrator/google_studio/tags',
        shown: true,
      },
    ],
  },
  {
    id: 7,
    title: { transKey: 'Helpers' },
    links: [
      {
        id: 1,
        title: { transKey: 'Import Calendar' },
        url: '/administrator/import_calendar',
        shown: true,
      },
      {
        id: 2,
        title: { transKey: 'Exceptions' },
        url: '/administrator/exceptions',
        shown: true,
      },
      {
        id: 3,
        title: { transKey: 'Heatmap' },
        url: '/administrator/heatmap',
        shown: true,
      },
      {
        id: 4,
        title: { transKey: 'Site Images' },
        url: '/admin/site-images',
        shown: true,
      },
    ],
  },
];
