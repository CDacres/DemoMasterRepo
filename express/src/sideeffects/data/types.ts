/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum AreaUnit {
  FT2 = "FT2",
  M2 = "M2",
}

export enum AssetStyle {
  AFFORDABLE = "AFFORDABLE",
  CORPORATE = "CORPORATE",
  LUXURY = "LUXURY",
  QUIRKY = "QUIRKY",
}

export enum ConfigurationKind {
  BANQUET = "BANQUET",
  BOARDROOM = "BOARDROOM",
  CABARET = "CABARET",
  CLASSROOM = "CLASSROOM",
  RECEPTION = "RECEPTION",
  SEATED = "SEATED",
  THEATRE = "THEATRE",
  U_SHAPED = "U_SHAPED",
}

export enum Currency {
  AMD = "AMD",
  BZD = "BZD",
  CAD = "CAD",
  CHF = "CHF",
  CNY = "CNY",
  EUR = "EUR",
  GBP = "GBP",
  IDR = "IDR",
  ILS = "ILS",
  INR = "INR",
  PKR = "PKR",
  PLN = "PLN",
  SEK = "SEK",
  USD = "USD",
  ZAR = "ZAR",
}

export enum DayOfWeek {
  FRIDAY = "FRIDAY",
  MONDAY = "MONDAY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY",
  THURSDAY = "THURSDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
}

export enum ImageSize {
  BANNER = "BANNER",
  HUGE = "HUGE",
  LARGE = "LARGE",
  MEDIUM = "MEDIUM",
  SMALL = "SMALL",
}

export enum ImageType {
  ASSET = "ASSET",
  FOOD = "FOOD",
  SITE_IMAGES = "SITE_IMAGES",
}

export enum LengthUnit {
  FEET = "FEET",
  METER = "METER",
}

export enum Month {
  APRIL = "APRIL",
  AUGUST = "AUGUST",
  DECEMBER = "DECEMBER",
  FEBRUARY = "FEBRUARY",
  JANUARY = "JANUARY",
  JULY = "JULY",
  JUNE = "JUNE",
  MARCH = "MARCH",
  MAY = "MAY",
  NOVEMBER = "NOVEMBER",
  OCTOBER = "OCTOBER",
  SEPTEMBER = "SEPTEMBER",
}

export enum NearbyPlaceType {
  SUBWAY_STATION = "SUBWAY_STATION",
  TRAIN_STATION = "TRAIN_STATION",
}

export enum PriceCoverage {
  ALLIN = "ALLIN",
  FLATRATE = "FLATRATE",
  MINIMUMSPEND = "MINIMUMSPEND",
}

export enum ProblemType {
  AUTHENTICATION = "AUTHENTICATION",
  AUTHORIZATION = "AUTHORIZATION",
  VALIDATION = "VALIDATION",
}

export enum ProductCategory {
  DEDICATEDDESK = "DEDICATEDDESK",
  DINING = "DINING",
  HOTDESK = "HOTDESK",
  MEETING = "MEETING",
  OFFICE = "OFFICE",
  PARTY = "PARTY",
  WEDDING = "WEDDING",
}

export enum TimeUnit {
  DAY = "DAY",
  HOUR = "HOUR",
  MONTH = "MONTH",
  PERIOD = "PERIOD",
  SPAN = "SPAN",
  TOSPANEND = "TOSPANEND",
  WEEK = "WEEK",
  YEAR = "YEAR",
}

export interface AddressInput {
  formattedAddress?: string | null;
  streetNumber?: string | null;
  street?: string | null;
  countryCode?: string | null;
  city?: string | null;
  town?: string | null;
  county?: string | null;
  postcode?: string | null;
  placeId?: string | null;
  country?: string | null;
  extra?: string | null;
  autocomplete?: string | null;
}

export interface AreaInput {
  value: number;
  unit: AreaUnit;
}

export interface AssetAmenityEdgeInput {
  amenityId: Ref;
  price?: CurrencyAmountInput | null;
  note?: string | null;
  suppressed?: boolean | null;
}

export interface AssetConfigurationInput {
  kind: ConfigurationKind;
  maxPax: number;
}

export interface AssetImageEdgeInput {
  imageId: Ref;
  orderIndex: number;
  description?: string | null;
  imageType?: ImageType | null;
}

export interface BookingConstraintsInput {
  guests?: PeopleBookingConstraintsInput | null;
  duration?: TimeBookingConstraintsInput | null;
  spend?: SpendBookingConstraintsInput | null;
}

export interface CurrencyAmountInput {
  currency?: Currency | null;
  value: number;
}

export interface DailyHoursInput {
  day?: DayOfWeek | null;
  spans?: DaySpanInput[] | null;
}

/**
 * A span of time within a 24 hour day. Use it with care (by exceeding 1440) to span over into the following day.
 */
export interface DaySpanInput {
  start: number;
  end: number;
}

export interface ImageInput {
  id: Ref;
  type: ImageType;
  categories?: (ProductCategory | null)[] | null;
}

export interface LatLngInput {
  lat: number;
  lng: number;
}

export interface LengthInput {
  value: number;
  unit: LengthUnit;
}

export interface ListingsAssetInput {
  id: Ref;
  name?: string | null;
  description?: string | null;
  location?: LocationInput | null;
  currency?: Currency | null;
  context?: ProductContextInput | null;
  area?: AreaInput | null;
  usages?: UsageInput[] | null;
  images?: AssetImageEdgeInput[] | null;
}

export interface ListingsVenuesArgs {
  humanRef?: Ref | null;
}

export interface LocationInput {
  address?: AddressInput | null;
  coords?: LatLngInput | null;
  nearbyPlaces?: NearbyPlaceInput[] | null;
  specialInstructions?: string | null;
}

export interface MenuGroupInput {
  description?: string | null;
  orderIndex?: number | null;
  items?: MenuItemInput[] | null;
}

export interface MenuInput {
  description: string;
  priceOptions?: MenuPriceOptionsInput[] | null;
  groups?: MenuGroupInput[] | null;
}

export interface MenuItemInput {
  description: string;
  orderIndex?: number | null;
  priceOptions?: MenuPriceOptionsInput[] | null;
}

export interface MenuPriceOptionsInput {
  kind?: string | null;
  description?: string | null;
  price?: CurrencyAmountInput | null;
}

export interface NearbyPlaceInput {
  name: string;
  distance: LengthInput;
  types?: NearbyPlaceType[] | null;
}

export interface PeopleBookingConstraintsInput {
  minPax?: number | null;
  maxPax?: number | null;
}

export interface ProductBookingParametersInput {
  constraints?: BookingConstraintsInput | null;
  depositAmount?: CurrencyAmountInput | null;
  depositPercent?: number | null;
}

export interface ProductContextInput {
  website?: string | null;
  schedule?: ProductPriceScheduleInput | null;
  configurations?: AssetConfigurationInput[] | null;
  amenities?: AssetAmenityEdgeInput[] | null;
  tags?: TagEdgeInput[] | null;
  menus?: MenuInput[] | null;
}

export interface ProductInput {
  id: Ref;
  name?: string | null;
  unitPrice?: CurrencyAmountInput | null;
  perPerson: boolean;
  unit: TimeUnit;
  coverage: PriceCoverage;
  description?: string | null;
  includes?: ProductItemInput[] | null;
  parameters?: ProductBookingParametersInput | null;
  context?: ProductContextInput | null;
}

export interface ProductItemInput {
  description?: string | null;
  orderIndex?: number | null;
}

export interface ProductPriceScheduleInput {
  days?: DailyHoursInput[] | null;
  weeks?: number[] | null;
  months?: Month[] | null;
}

export interface SpaceDetailsInput {
  styles?: AssetStyle[] | null;
}

export interface SpaceInput {
  asset?: ListingsAssetInput | null;
  details?: SpaceDetailsInput | null;
  parentId: Ref;
  tableCount?: number | null;
}

export interface SpendBookingConstraintsInput {
  minSpendAmount?: CurrencyAmountInput | null;
}

export interface TagEdgeInput {
  tagId: Ref;
  suppressed?: boolean | null;
}

export interface TimeBookingConstraintsInput {
  minDuration?: number | null;
  maxDuration?: number | null;
}

export interface UploadImageInput {
  image: ImageInput;
  file: File;
}

export interface UsageInput {
  name?: string | null;
  category: ProductCategory;
  description?: string | null;
  context?: ProductContextInput | null;
  products?: ProductInput[] | null;
}

export interface VenueDetailsInput {
  venueTypeId?: Ref | null;
}

export interface VenueInput {
  asset?: ListingsAssetInput | null;
  details?: VenueDetailsInput | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
