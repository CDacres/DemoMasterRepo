export type Asset = {
  id: number;
  name: string;
  description: string;
  location: Location;
  currency: Currency;
  context: ProductContext;
  area: Area;
  usages: Usage[];
  images: ImageEdge[];
  details: GroupDetails | VenueDetails | SpaceDetails | TableDetails;
}

type Location = {
  address: Address;
  coords: LatLng;
  nearbyPlaces: NearbyPlace[];
  specialInstructions: string;
};

type Address = {
  formattedAddress: string;
  streetNumber: string;
  street: string;
  country: string;
  countryCode: string;
  city: string;
  town: string;
  county: string;
  postcode: string;
  extra: string;
  placeId: string;
};

type LatLng = {
  lat: number;
  lng: number;
};

type NearbyPlace = {
  name: string;
  distance: Length;
  types: NearbyPlaceType[];
};

type Length = {
  value: number;
  unit: LengthUnit;
};

type ProductContext = {
  website: string;
  schedule: ProductPriceSchedule;
  configurations: AssetConfiguration[];
  amenities: AssetAmenityEdge[];
  tags: TagEdge[];
  menus: Menu[];
};

type ProductPriceSchedule = {
  days: DailyHours[];
  weeks: number[];
  months: Month[];
  period: Period;
};

type DailyHours = {
  day: Day;
  spans: DaySpan[];
};

type DaySpan = {
  start: number;
  end: number;
};

type Period = {
  start: DateTime;
  end: DateTime;
};

type DateTime = {
  date: string;
  time: number;
};

type AssetConfiguration = {
  kind: Configuration;
  maxPax: number;
};

type AssetAmenityEdge = {
  amenityId: Id;
  price: CurrencyAmount;
  note: string;
  suppressed: boolean;
  description: string;
};

type Id = {
  value: string;
};

type CurrencyAmount = {
  value: number;
  currency: Currency;
};

type TagEdge = {
  tagId: Id;
  suppressed: boolean;
};

type Menu = {
  description: string;
  groups: MenuGroup[];
  priceOptions: MenuPriceOption[];
};

type MenuGroup = {
  description: string;
  orderIndex: number;
  items: MenuItem[];
};

type MenuItem = {
  description: string;
  orderIndex: number;
  priceOptions: MenuPriceOption;
};

type MenuPriceOption = {
  kind: string;
  description: string;
  price: CurrencyAmount;
};

type Area = {
  value: number;
  unit: AreaUnit;
};

type Usage = {
  name: string;
  category: ProductCategory;
  description: string;
  context: ProductContext;
  products: Product[];
};

type Product = {
  id: Id;
  name: string;
  unitPrice: CurrencyAmount;
  context: ProductContext;
  unit: TimeUnit;
  coverage: PriceCoverage;
  description: string;
  includes: ProductItem[];
  parameters: ProductBookingParameters;
  perPerson: boolean;
  stock: number;
};

type ProductItem = {
  description: string;
  orderIndex: number;
}

type ProductBookingParameters = {
  constraints: BookingConstraints;
  depositAmount: CurrencyAmount;
  depositPercent: number;
}

type BookingConstraints = {
  guests: PeopleBookingConstraints;
  duration: TimeBookingConstraints;
  spend: SpendBookingConstraints;
}

type SpendBookingConstraints = {
  minSpendAmount: CurrencyAmount;
}

type TimeBookingConstraints = {
  minDuration: number;
  maxDuration: number;
}

type PeopleBookingConstraints = {
  minPax: number;
  maxPax: number;
}

type ImageEdge = {
  imageId: Id;
  orderIndex: number;
  description: string;
};

type VenueDetails = {
  venueTypeId: Id;
};

type SpaceDetails = {
  styles: AssetStyle[];
};

type GroupDetails = {};

type TableDetails = {};

enum Currency {
  NOCURRENCY = 0,
  GBP = 1,
  EUR = 2,
  USD = 3,
  AMD = 4,
  BZD = 5,
  CAD = 6,
  CHF = 7,
  CNY = 8,
  IDR = 9,
  ILS = 10,
  INR = 11,
  PKR = 12,
  PLN = 13,
  SEK = 14,
  ZAR = 15,
}

enum LengthUnit {
  NOLENGTHUNIT = 0,
  METER = 1,
  FEET = 2,
}

enum NearbyPlaceType {
  NONEARBYPLACETYPE = 0,
  TRAIN_STATION = 1,
  SUBWAY_STATION = 2,
}

enum Day {
  NODAY = 0,
  SUNDAY = 1,
  MONDAY = 2,
  TUESDAY = 3,
  WEDNESDAY = 4,
  THURSDAY = 5,
  FRIDAY = 6,
  SATURDAY = 7,
}

enum Month {
  NOMONTH = 0,
  JANUARY = 1,
  FEBRUARY = 2,
  MARCH = 3,
  APRIL = 4,
  MAY = 5,
  JUNE = 6,
  JULY = 7,
  AUGUST = 8,
  SEPTEMBER = 9,
  OCTOBER = 10,
  NOVEMBER = 11,
  DECEMBER = 12,
}

enum Configuration {
  NOCONFIGURATION = 0,
  SEATED = 1,
  RECEPTION = 2,
  BOARDROOM = 3,
  CLASSROOM = 4,
  BANQUET = 5,
  THEATRE = 6,
  U_SHAPED = 7,
  CABARET = 8,
}

enum AreaUnit {
  NOAREAUNIT = 0,
  M2 = 1,
  FT2 = 2,
}

enum ProductCategory {
  NOPRODUCTCATEGORY = 0,
  MEETING = 1,
  OFFICE = 2,
  PARTY = 3,
  WEDDING = 4,
  DINING = 5,
  HOTDESK = 6,
  DEDICATEDDESK = 7,
}

enum TimeUnit {
  NOTIMEUNIT = 0,
  PERIOD = 1,
  YEAR = 2,
  MONTH = 3,
  WEEK = 4,
  DAY = 5,
  SPAN = 6,
  TOSPANEND = 7,
  HOUR = 8,
}

enum PriceCoverage {
  NOPRICECOVERAGE = 0,
  ALLIN = 1,
  MINIMUMSPEND = 2,
  FLATRATE = 3,
}

enum AssetStyle {
  NOSTYLE = 0,
  QUIRKY = 1,
  AFFORDABLE = 2,
  CORPORATE = 3,
  LUXURY = 4,
}