export const financial = [
  {
    address: 'venues',
    id: 44442,
    name: 'name',
    vat: '123456789',
    venues: 10,
  },
  {
    address: 'venues2',
    id: 44443,
    name: 'name2',
    vat: '123456782',
    venues: 20,
  },
];

export const location = [
  {
    bounds_distance: '23',
    country: 'gb',
    human_desc: 'London',
    id: 44442,
    in_sitemap: true,
    lat: '51.5072996',
    locationcategorie_id: '2',
    long: '-0.1280232',
    parent_id: '1',
    url_desc: 'london',
    // following will be dynamically generated
    autocompleteLocation: 'London, United Kingdom',
    dining: '15/200',
    meeting: '100/200',
    office: '50/200',
    parent_desc: 'United Kingdom',
    party: '25/200',
    venues: 200,
    wedding: '10/200',
  },
  {
    bounds_distance: '10',
    country: 'de',
    human_desc: 'Berlin',
    id: 44443,
    in_sitemap: false,
    lat: '52.5213100',
    locationcategorie_id: '2',
    long: '13.4054600',
    parent_id: '6',
    url_desc: 'berlin',
    // following will be dynamically generated
    autocompleteLocation: 'Berlin, Deutschland',
    dining: '1/100',
    meeting: '36/100',
    office: '15/100',
    parent_desc: 'Deutschland',
    party: '25/100',
    venues: 100,
    wedding: '23/100',
  },
];

export const payout = [
  {
    check: 1,
    commission_percent: '10%',
    commission_amount: '£10.00',
    date: 'May 2019',
    financial_entity: 'The Warehouse',
    id: 44442,
    notes: 'Notes ...Notes ...Notes ...Notes ...Notes ...Notes ...Notes ...',
    payout: '£120.00',
    price: '£100.00',
    status: 'Pending',
    statusId: 1,
    to_pay: '£60.00',
    transaction: '£200.00',
    vat: '20%',
  },
  {
    check: 2,
    commission_percent: '10%',
    commission_amount: '£10.00',
    date: 'May 2019',
    financial_entity: 'The Warehouse',
    id: 44443,
    notes: 'Notes ...Notes ...Notes ...Notes ...Notes ...Notes ...Notes ...',
    payout: '£120.00',
    price: '£100.00',
    status: 'Pending',
    statusId: 1,
    to_pay: '£60.00',
    transaction: '£200.00',
    vat: '20%',
  },
  {
    check: 3,
    commission_percent: '10%',
    commission_amount: '£10.00',
    date: 'May 2019',
    financial_entity: 'The Warehouse',
    id: 44444,
    notes: 'Notes ...Notes ...Notes ...Notes ...Notes ...Notes ...Notes ...',
    payout: '£120.00',
    price: '£100.00',
    status: 'Paid',
    statusId: 2,
    to_pay: '£0.00',
    transaction: '£200.00',
    vat: '20%',
  },
];

export const space = [
  {
    approved: false,
    category: 'Party',
    city: 'London',
    country: 'UK',
    flexible: '20%',
    id: 44442,
    ranking: 9,
    service_fee: '20%',
    space: 'The Warehouse',
    status: 'Pending',
    venue_id: '1234',
    venue_name: 'Sutherland Labs',
    views: 8,
  },
  {
    approved: true,
    category: 'Meeting',
    city: 'London',
    country: 'UK',
    flexible: '',
    id: 44442,
    ranking: 5,
    service_fee: '10%',
    space: 'The Warehouse',
    status: 'Approved',
    venue_id: '1234',
    venue_name: 'Sutherland Labs',
    views: 10,
  },
];

export const user = [
  {
    bookings: 3,
    created: '9 Aug 2019',
    email: 'sarah.smith@gmail.com',
    id: 44442,
    last_activity_date: '9 Aug 2019',
    last_activity_time: '18:00',
    name: 'Sarah Smith',
    phone: '07777777777',
    type: 'Client',
  },
  {
    bookings: 0,
    created: '19 Aug 2019',
    email: 'bob.smith@gmail.com',
    id: 44443,
    last_activity_date: '19 Aug 2019',
    last_activity_time: '10:25',
    name: 'Bob Smith',
    phone: '07777777778',
    type: 'Venue',
  },
];

export const venue = [
  {
    agree: true,
    approved: false,
    assigned: '1',
    city: 'London',
    commission: '20%',
    contact: 'Sarah Smith',
    country: 'UK',
    created: '9 Aug 2019',
    email: 'sarah.smith@gmail.com',
    id: 44442,
    instant_book: true,
    last_modified: '9 Aug 2019',
    notes: 'Notes ...Notes ...Notes ...Notes ...Notes ...Notes ...Notes ...',
    phone: '+44 1756 708742',
    sponsored: true,
    status: 'Pending',
    venue_address: 'High Street 33, E1 4BB',
    venue_name: 'Sutherland Labs',
    website: 'www.example.com',
  },
  {
    agree: false,
    approved: true,
    assigned: '',
    city: 'London',
    commission: '20%',
    contact: 'Bob Smith',
    country: 'UK',
    created: '19 Aug 2019',
    email: 'bob.smith@gmail.com',
    id: 44443,
    instant_book: false,
    last_modified: '21 Aug 2019',
    notes: 'Notes ...Notes ...Notes ...Notes ...Notes ...Notes ...Notes ...',
    phone: '+44 1756 708742',
    sponsored: false,
    status: 'Approved',
    venue_address: 'High Street 33, E1 4BB',
    venue_name: 'Sutherland Labs',
    website: '',
  },
];
