export const params = () => ({
  allDay: false,
  amenities: [],
  configurations: [],
  cuisines: [],
  date: '',
  diningOptions: '',
  end: '',
  from: '',
  guests: '',
  lat: '',
  location: '',
  lon: '',
  officeTypes: [],
  page: 1,
  placeId: '',
  priceRange: [],
  start: '',
  tag: '',
  to: '',
  types: [],
});

export const tags = () => ({
  current: {},
  defaultTags: [
    {
      quickSlug: 'meeting-rooms',
    },
  ],
  tags: [],
});

export const url = () => ({
  isSearching: false,
  url: '',
});

export const verticals = () => ({
  defaults: {
    meeting: {
      mapIsVisible: true,
      title: 'common.meeting',
      tagId: 1,
    },
    office: {
      mapIsVisible: false,
      title: 'common.office',
      tagId: 2,
    },
    party: {
      mapIsVisible: false,
      title: 'common.party',
      tagId: 3,
    },
    dining: {
      mapIsVisible: true,
      title: 'common.dining',
      tagId: 4,
    },
    wedding: {
      mapIsVisible: false,
      title: 'common.wedding',
      tagId: 5,
    },
    art: {
      mapIsVisible: false,
      title: 'common.art',
      tagId: 6,
    },
    sport: {
      mapIsVisible: false,
      title: 'common.sport',
      tagId: 7,
    },
  },
  selected: {},
});
