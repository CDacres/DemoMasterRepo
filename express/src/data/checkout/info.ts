/* tslint:disable:no-console quotemark */
export const amenities = [
  {
    id: '1',
    name: 'Coffee',
    price: '£3.00',
  },
  {
    id: '2',
    name: 'Lunch',
    price: '£3.00',
  },
  {
    id: '3',
    name: 'Tea',
    price: '£4.00',
  },
];

export const cancellationItems = [
  {
    extraText: {
      text: '£115',
    },
    id: '1',
    subtext: 'Cancel within 48 hours of booking and get a full refund.',
    text: 'Flexible',
  },
  {
    extraText: {
      text: '£100',
    },
    id: '2',
    learnMoreAction: () => console.log('hello'),
    subtext: 'No cancellation or amendment possible.',
    text: 'Non-refundable',
  },
];

export const countries = [
  {
    text: 'Afghanistan',
    value: 'AF',
  },
  {
    text: 'Aland Island',
    value: 'AX',
  },
  {
    text: 'Albania',
    value: 'AL',
  },
];

export const dates = {
  from: {
    day: 22,
    month: 'October',
    monthShort: 'OCT',
    text: 'check in',
    time: '2PM',
  },
  title: '69 hour meeting in London',
  to: {
    day: 25,
    month: 'October',
    monthShort: 'OCT',
    text: 'check out',
    time: '11AM',
  },
};

export const info = {
  cancelDescription: 'Cancel before 1:00PM on 20 Aug and get 50% refund, minus the service fee.',
  cancelTitle: 'Cancellation policy',
  commentDescription: "Let the venue know a little about your booking and why you're coming.",
  commentPlaceholder: 'Hello,...',
  commentTitle: 'Add any comment to the venue',
  guestsTitle: 'Guests',
  legalText: 'I agree to the House Rules, Cancellation Policy, and the Guest Refund Policy. I also agree to pay the total amount shown, which includes Service Fees. Payment Terms between you and Zipcube.',
  mobilePrice: '£100',
  mobileText: 'per person',
  motivationDescription: 'It is usually booked',
  motivationText: 'This is the text.',
  ownerImgSrc: 'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png',
  summaryPeople: '2 guests',
  summaryPhone: '+44 7777 777 777',
  summaryWarning: 'Your booking request has been sent to Hoeger and Sons. A booking request is usually accepted within one hour by the venue. If not, our customer service team will offer you available alternative.',
  reviewToggleTitle: 'Do you require accommodation?',
};

export const layoutItems = [
  {
    id: '1',
    subtext: '10 guests',
    text: 'Classroom',
  },
  {
    id: '2',
    subtext: '20 guests',
    text: 'Classroom',
  },
  {
    id: '3',
    subtext: '12 guests',
    text: 'Boardroom',
  },
  {
    id: '4',
    subtext: '15 guests',
    text: 'U-shape',
  },
];

export const navItems = [
  {
    label: 'checkout.nav_review',
    page: 1,
  },
  {
    label: 'checkout.nav_addons',
    page: 2,
  },
  {
    label: 'checkout.nav_confirm',
    page: 3,
  },
  {
    label: 'checkout.nav_sent',
    page: 4,
  },
];

export const sidebarDetails = {
  cancellation: {
    flexible: {
      description: 'Cancel within 48 hours of booking to get full refund.',
      title: 'Flexible - free cancellation',
    },
    nonFlexible: {
      description: 'Click here to add flexible booking.',
      title: 'Non-refundable deal',
    },
  },
  dateTimes: [
    {
      endDateTime: {
        date: {
          desc: 'Checkout',
          text: '11 Sept 20019',
        },
      },
      startDateTime: {
        date: {
          desc: 'Check-in',
          text: '10 Sept 2019',
        },
      },
    },
    {
      endDateTime: {
        time: {
          desc: 'End',
          text: '13:00',
        },
      },
      startDateTime: {
        date: {
          desc: 'Check-in',
          text: '11 Sept 2019',
        },
        time: {
          desc: 'Start',
          text: '11:00',
        },
      },
    },
    {
      startDateTime: {
        date: {
          desc: 'Check-in',
          text: '10 Sept 2019',
        },
        time: {
          desc: 'Arrival',
          text: '18:00',
        },
      },
    },
  ],
  guests: 3,
  image: 'https://abac7c57c1374ed95f4b-fc517bfeb78f64bd2cb175c56cdcead7.ssl.cf3.rackcdn.com//1041/870_450_4bf6b48cf8f5c464cc7bd4f23706df53.jpg',
  prices: [
    {
      price: '£60.00',
      text: '£20 x 3 hours',
    },
    {
      price: '£15.00',
      text: '£5 x 3 coffees',
    },
    {
      price: '£1.00',
      text: '£1 x 1 projectors',
    },
    {
      price: '£136.00',
      text: 'Total (GBP)',
    },
    {
      price: '£99.99',
      text: 'Extra fee',
    },
    {
      price: '£29.99',
      text: 'Flexible booking',
    },
    {
      price: '£29.99',
      text: 'Add ons',
    },
    {
      price: '£60.00',
      text: '£20 x 3 days',
    },
    {
      price: '£29.99',
      text: 'Service fee',
    },
    {
      price: '£29.99',
      text: 'Venue base price',
    },
    {
      price: '£29.99',
      text: 'Commission',
    },
    {
      price: '£29.99',
      text: 'Payout',
    },
    {
      price: '£30.00',
      text: '£10 x 3 people',
    },
  ],
  rating: 3.5,
  reviewsCount: 10,
  subtitle: 'Berkeley Street, London W1J',
  title: 'Buckingham Suite',
};

export const steps = {
  addons: {
    buttonText: 'checkout.continue',
    mobileButtonText: 'checkout.continue',
    title: 'checkout.addons',
  },
  payment: {
    buttonText: 'checkout.confirm',
    title: 'checkout.confirm',
  },
  review: {
    buttonText: 'checkout.agree_continue',
    mobileButtonText: 'checkout.agree',
    title: 'checkout.review_rules',
  },
  summary: {
    buttonText: 'common.finish',
    title: 'checkout.request_sent',
  },
};
