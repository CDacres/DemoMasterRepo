export const map = () => ({
  bounds: {
    neLat: '',
    neLon: '',
    swLat: '',
    swLon: '',
  },
  boundsHaveChanged: false,
  isStable: true,
  isVisible: false,
  requiresRefit: false,
  shouldSearchOnMapMove: false,
});

export const placeholderResults = () => {
  const placeholders = [];
  for (let i = 0; i < 24; ++i) {
    placeholders.push({ id: i });
  }
  return placeholders;
};

export const results = () => ({
  currentPage: 1,
  data: placeholderResults(),
  from: null,
  isFetching: true,
  lastPage: null,
  nextPageUrl: '',
  path: '',
  perPage: null,
  prevPageUrl: null,
  to: null,
  total: null,
  searchObject: {
    currencySymbolLeft: '&pound;',
    location: '',
    lat: null,
    long: null,
    neLon: null,
    neLat: null,
    swLon: null,
    swLat: null,
    date: '',
    time: null,
    lang: 'en',
    requestedTagLabel: '',
    actualTagId: null,
    duration: null,
    guests: null,
    no_of_desks: null,
    minimumDuration: null,
    min_price: null,
    max_price: null,
    liveBookings: null,
    page: null,
    zoom: null,
    widgetToken: null,
    numRooms: null,
    suppressedFilters: false,
    geocoded: null,
    locality: '',
    political: '',
    postalTown: '',
    administrativeAreaLevel2: '',
    administrativeAreaLevel1: '',
    country: '',
    token: '',
    id: null,
  },
});
