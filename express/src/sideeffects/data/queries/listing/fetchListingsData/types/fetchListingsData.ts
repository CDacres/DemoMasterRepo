/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ListingsVenuesArgs, Currency, ConfigurationKind, DayOfWeek, NearbyPlaceType, LengthUnit, ImageType, ImageSize, ProductCategory, TimeUnit, PriceCoverage, AreaUnit, AssetStyle } from "./../../../../types";

// ====================================================
// GraphQL query operation: fetchListingsData
// ====================================================

export interface fetchListingsData_listingsVenues_asset_context_configurations {
  __typename: "AssetConfiguration";
  kind: ConfigurationKind;
  maxPax: number;
}

export interface fetchListingsData_listingsVenues_asset_context_amenities_amenity {
  __typename: "Amenity";
  id: Ref;
}

export interface fetchListingsData_listingsVenues_asset_context_amenities_price {
  __typename: "CurrencyAmount";
  currency: Currency | null;
  value: number;
}

export interface fetchListingsData_listingsVenues_asset_context_amenities {
  __typename: "AssetAmenityEdge";
  note: string | null;
  suppressed: boolean | null;
  amenity: fetchListingsData_listingsVenues_asset_context_amenities_amenity;
  price: fetchListingsData_listingsVenues_asset_context_amenities_price | null;
}

export interface fetchListingsData_listingsVenues_asset_context_schedule_days_spans {
  __typename: "DaySpan";
  start: number;
  end: number;
}

export interface fetchListingsData_listingsVenues_asset_context_schedule_days {
  __typename: "DailyHours";
  day: DayOfWeek | null;
  spans: fetchListingsData_listingsVenues_asset_context_schedule_days_spans[] | null;
}

export interface fetchListingsData_listingsVenues_asset_context_schedule {
  __typename: "ProductPriceSchedule";
  days: fetchListingsData_listingsVenues_asset_context_schedule_days[] | null;
}

export interface fetchListingsData_listingsVenues_asset_context_tags_tag {
  __typename: "Tag";
  id: Ref;
}

export interface fetchListingsData_listingsVenues_asset_context_tags {
  __typename: "TagEdge";
  tag: fetchListingsData_listingsVenues_asset_context_tags_tag | null;
  suppressed: boolean | null;
}

export interface fetchListingsData_listingsVenues_asset_context_menus_priceOptions_price {
  __typename: "CurrencyAmount";
  currency: Currency | null;
  value: number;
}

export interface fetchListingsData_listingsVenues_asset_context_menus_priceOptions {
  __typename: "MenuPriceOptions";
  kind: string | null;
  description: string | null;
  price: fetchListingsData_listingsVenues_asset_context_menus_priceOptions_price | null;
}

export interface fetchListingsData_listingsVenues_asset_context_menus_groups_items_priceOptions_price {
  __typename: "CurrencyAmount";
  currency: Currency | null;
  value: number;
}

export interface fetchListingsData_listingsVenues_asset_context_menus_groups_items_priceOptions {
  __typename: "MenuPriceOptions";
  kind: string | null;
  description: string | null;
  price: fetchListingsData_listingsVenues_asset_context_menus_groups_items_priceOptions_price | null;
}

export interface fetchListingsData_listingsVenues_asset_context_menus_groups_items {
  __typename: "MenuItem";
  description: string;
  orderIndex: number | null;
  priceOptions: fetchListingsData_listingsVenues_asset_context_menus_groups_items_priceOptions[] | null;
}

export interface fetchListingsData_listingsVenues_asset_context_menus_groups {
  __typename: "MenuGroup";
  description: string | null;
  orderIndex: number | null;
  items: fetchListingsData_listingsVenues_asset_context_menus_groups_items[] | null;
}

export interface fetchListingsData_listingsVenues_asset_context_menus {
  __typename: "Menu";
  description: string;
  priceOptions: fetchListingsData_listingsVenues_asset_context_menus_priceOptions[] | null;
  groups: fetchListingsData_listingsVenues_asset_context_menus_groups[] | null;
}

export interface fetchListingsData_listingsVenues_asset_context {
  __typename: "ProductContext";
  website: string | null;
  configurations: fetchListingsData_listingsVenues_asset_context_configurations[] | null;
  amenities: fetchListingsData_listingsVenues_asset_context_amenities[] | null;
  schedule: fetchListingsData_listingsVenues_asset_context_schedule | null;
  tags: fetchListingsData_listingsVenues_asset_context_tags[] | null;
  menus: fetchListingsData_listingsVenues_asset_context_menus[] | null;
}

export interface fetchListingsData_listingsVenues_asset_location_address {
  __typename: "Address";
  formattedAddress: string | null;
  streetNumber: string | null;
  street: string | null;
  extra: string | null;
  city: string | null;
  county: string | null;
  country: string | null;
  countryCode: string | null;
  postcode: string | null;
  town: string | null;
  autocomplete: string | null;
}

export interface fetchListingsData_listingsVenues_asset_location_coords {
  __typename: "LatLng";
  lat: number;
  lng: number;
}

export interface fetchListingsData_listingsVenues_asset_location_nearbyPlaces_distance {
  __typename: "Length";
  value: number;
  unit: LengthUnit;
}

export interface fetchListingsData_listingsVenues_asset_location_nearbyPlaces {
  __typename: "NearbyPlace";
  name: string;
  types: NearbyPlaceType[] | null;
  distance: fetchListingsData_listingsVenues_asset_location_nearbyPlaces_distance;
}

export interface fetchListingsData_listingsVenues_asset_location {
  __typename: "Location";
  specialInstructions: string | null;
  address: fetchListingsData_listingsVenues_asset_location_address | null;
  coords: fetchListingsData_listingsVenues_asset_location_coords | null;
  nearbyPlaces: fetchListingsData_listingsVenues_asset_location_nearbyPlaces[] | null;
}

export interface fetchListingsData_listingsVenues_asset_images_image_tags {
  __typename: "Tag";
  id: Ref;
  description: string;
}

export interface fetchListingsData_listingsVenues_asset_images_image_imageUrls {
  __typename: "ImageUrl";
  url: string | null;
  imageSize: ImageSize | null;
}

export interface fetchListingsData_listingsVenues_asset_images_image {
  __typename: "Image";
  id: Ref;
  type: ImageType | null;
  tags: (fetchListingsData_listingsVenues_asset_images_image_tags | null)[] | null;
  imageUrls: (fetchListingsData_listingsVenues_asset_images_image_imageUrls | null)[] | null;
  downloadLink: string | null;
}

export interface fetchListingsData_listingsVenues_asset_images {
  __typename: "AssetImageEdge";
  description: string | null;
  orderIndex: number | null;
  image: fetchListingsData_listingsVenues_asset_images_image | null;
}

export interface fetchListingsData_listingsVenues_asset_usages_context_configurations {
  __typename: "AssetConfiguration";
  kind: ConfigurationKind;
  maxPax: number;
}

export interface fetchListingsData_listingsVenues_asset_usages_context_amenities_amenity {
  __typename: "Amenity";
  id: Ref;
}

export interface fetchListingsData_listingsVenues_asset_usages_context_amenities_price {
  __typename: "CurrencyAmount";
  currency: Currency | null;
  value: number;
}

export interface fetchListingsData_listingsVenues_asset_usages_context_amenities {
  __typename: "AssetAmenityEdge";
  note: string | null;
  suppressed: boolean | null;
  amenity: fetchListingsData_listingsVenues_asset_usages_context_amenities_amenity;
  price: fetchListingsData_listingsVenues_asset_usages_context_amenities_price | null;
}

export interface fetchListingsData_listingsVenues_asset_usages_context_schedule_days_spans {
  __typename: "DaySpan";
  start: number;
  end: number;
}

export interface fetchListingsData_listingsVenues_asset_usages_context_schedule_days {
  __typename: "DailyHours";
  day: DayOfWeek | null;
  spans: fetchListingsData_listingsVenues_asset_usages_context_schedule_days_spans[] | null;
}

export interface fetchListingsData_listingsVenues_asset_usages_context_schedule {
  __typename: "ProductPriceSchedule";
  days: fetchListingsData_listingsVenues_asset_usages_context_schedule_days[] | null;
}

export interface fetchListingsData_listingsVenues_asset_usages_context_tags_tag {
  __typename: "Tag";
  id: Ref;
}

export interface fetchListingsData_listingsVenues_asset_usages_context_tags {
  __typename: "TagEdge";
  tag: fetchListingsData_listingsVenues_asset_usages_context_tags_tag | null;
  suppressed: boolean | null;
}

export interface fetchListingsData_listingsVenues_asset_usages_context_menus_priceOptions_price {
  __typename: "CurrencyAmount";
  currency: Currency | null;
  value: number;
}

export interface fetchListingsData_listingsVenues_asset_usages_context_menus_priceOptions {
  __typename: "MenuPriceOptions";
  kind: string | null;
  description: string | null;
  price: fetchListingsData_listingsVenues_asset_usages_context_menus_priceOptions_price | null;
}

export interface fetchListingsData_listingsVenues_asset_usages_context_menus_groups_items_priceOptions_price {
  __typename: "CurrencyAmount";
  currency: Currency | null;
  value: number;
}

export interface fetchListingsData_listingsVenues_asset_usages_context_menus_groups_items_priceOptions {
  __typename: "MenuPriceOptions";
  kind: string | null;
  description: string | null;
  price: fetchListingsData_listingsVenues_asset_usages_context_menus_groups_items_priceOptions_price | null;
}

export interface fetchListingsData_listingsVenues_asset_usages_context_menus_groups_items {
  __typename: "MenuItem";
  description: string;
  orderIndex: number | null;
  priceOptions: fetchListingsData_listingsVenues_asset_usages_context_menus_groups_items_priceOptions[] | null;
}

export interface fetchListingsData_listingsVenues_asset_usages_context_menus_groups {
  __typename: "MenuGroup";
  description: string | null;
  orderIndex: number | null;
  items: fetchListingsData_listingsVenues_asset_usages_context_menus_groups_items[] | null;
}

export interface fetchListingsData_listingsVenues_asset_usages_context_menus {
  __typename: "Menu";
  description: string;
  priceOptions: fetchListingsData_listingsVenues_asset_usages_context_menus_priceOptions[] | null;
  groups: fetchListingsData_listingsVenues_asset_usages_context_menus_groups[] | null;
}

export interface fetchListingsData_listingsVenues_asset_usages_context {
  __typename: "ProductContext";
  website: string | null;
  configurations: fetchListingsData_listingsVenues_asset_usages_context_configurations[] | null;
  amenities: fetchListingsData_listingsVenues_asset_usages_context_amenities[] | null;
  schedule: fetchListingsData_listingsVenues_asset_usages_context_schedule | null;
  tags: fetchListingsData_listingsVenues_asset_usages_context_tags[] | null;
  menus: fetchListingsData_listingsVenues_asset_usages_context_menus[] | null;
}

export interface fetchListingsData_listingsVenues_asset_usages_products_parameters_depositAmount {
  __typename: "CurrencyAmount";
  value: number;
  currency: Currency | null;
}

export interface fetchListingsData_listingsVenues_asset_usages_products_parameters_constraints_guests {
  __typename: "PeopleBookingConstraints";
  minPax: number | null;
  maxPax: number | null;
}

export interface fetchListingsData_listingsVenues_asset_usages_products_parameters_constraints_duration {
  __typename: "TimeBookingConstraints";
  minDuration: number | null;
  maxDuration: number | null;
}

export interface fetchListingsData_listingsVenues_asset_usages_products_parameters_constraints_spend_minSpendAmount {
  __typename: "CurrencyAmount";
  currency: Currency | null;
  value: number;
}

export interface fetchListingsData_listingsVenues_asset_usages_products_parameters_constraints_spend {
  __typename: "SpendBookingConstraints";
  minSpendAmount: fetchListingsData_listingsVenues_asset_usages_products_parameters_constraints_spend_minSpendAmount | null;
}

export interface fetchListingsData_listingsVenues_asset_usages_products_parameters_constraints {
  __typename: "BookingConstraints";
  guests: fetchListingsData_listingsVenues_asset_usages_products_parameters_constraints_guests | null;
  duration: fetchListingsData_listingsVenues_asset_usages_products_parameters_constraints_duration | null;
  spend: fetchListingsData_listingsVenues_asset_usages_products_parameters_constraints_spend | null;
}

export interface fetchListingsData_listingsVenues_asset_usages_products_parameters {
  __typename: "ProductBookingParameters";
  depositPercent: number | null;
  depositAmount: fetchListingsData_listingsVenues_asset_usages_products_parameters_depositAmount | null;
  constraints: fetchListingsData_listingsVenues_asset_usages_products_parameters_constraints | null;
}

export interface fetchListingsData_listingsVenues_asset_usages_products_unitPrice {
  __typename: "CurrencyAmount";
  value: number;
  currency: Currency | null;
}

export interface fetchListingsData_listingsVenues_asset_usages_products_context_configurations {
  __typename: "AssetConfiguration";
  kind: ConfigurationKind;
  maxPax: number;
}

export interface fetchListingsData_listingsVenues_asset_usages_products_context_amenities_amenity {
  __typename: "Amenity";
  id: Ref;
}

export interface fetchListingsData_listingsVenues_asset_usages_products_context_amenities_price {
  __typename: "CurrencyAmount";
  currency: Currency | null;
  value: number;
}

export interface fetchListingsData_listingsVenues_asset_usages_products_context_amenities {
  __typename: "AssetAmenityEdge";
  note: string | null;
  suppressed: boolean | null;
  amenity: fetchListingsData_listingsVenues_asset_usages_products_context_amenities_amenity;
  price: fetchListingsData_listingsVenues_asset_usages_products_context_amenities_price | null;
}

export interface fetchListingsData_listingsVenues_asset_usages_products_context_schedule_days_spans {
  __typename: "DaySpan";
  start: number;
  end: number;
}

export interface fetchListingsData_listingsVenues_asset_usages_products_context_schedule_days {
  __typename: "DailyHours";
  day: DayOfWeek | null;
  spans: fetchListingsData_listingsVenues_asset_usages_products_context_schedule_days_spans[] | null;
}

export interface fetchListingsData_listingsVenues_asset_usages_products_context_schedule {
  __typename: "ProductPriceSchedule";
  days: fetchListingsData_listingsVenues_asset_usages_products_context_schedule_days[] | null;
}

export interface fetchListingsData_listingsVenues_asset_usages_products_context_tags_tag {
  __typename: "Tag";
  id: Ref;
}

export interface fetchListingsData_listingsVenues_asset_usages_products_context_tags {
  __typename: "TagEdge";
  tag: fetchListingsData_listingsVenues_asset_usages_products_context_tags_tag | null;
  suppressed: boolean | null;
}

export interface fetchListingsData_listingsVenues_asset_usages_products_context_menus_priceOptions_price {
  __typename: "CurrencyAmount";
  currency: Currency | null;
  value: number;
}

export interface fetchListingsData_listingsVenues_asset_usages_products_context_menus_priceOptions {
  __typename: "MenuPriceOptions";
  kind: string | null;
  description: string | null;
  price: fetchListingsData_listingsVenues_asset_usages_products_context_menus_priceOptions_price | null;
}

export interface fetchListingsData_listingsVenues_asset_usages_products_context_menus_groups_items_priceOptions_price {
  __typename: "CurrencyAmount";
  currency: Currency | null;
  value: number;
}

export interface fetchListingsData_listingsVenues_asset_usages_products_context_menus_groups_items_priceOptions {
  __typename: "MenuPriceOptions";
  kind: string | null;
  description: string | null;
  price: fetchListingsData_listingsVenues_asset_usages_products_context_menus_groups_items_priceOptions_price | null;
}

export interface fetchListingsData_listingsVenues_asset_usages_products_context_menus_groups_items {
  __typename: "MenuItem";
  description: string;
  orderIndex: number | null;
  priceOptions: fetchListingsData_listingsVenues_asset_usages_products_context_menus_groups_items_priceOptions[] | null;
}

export interface fetchListingsData_listingsVenues_asset_usages_products_context_menus_groups {
  __typename: "MenuGroup";
  description: string | null;
  orderIndex: number | null;
  items: fetchListingsData_listingsVenues_asset_usages_products_context_menus_groups_items[] | null;
}

export interface fetchListingsData_listingsVenues_asset_usages_products_context_menus {
  __typename: "Menu";
  description: string;
  priceOptions: fetchListingsData_listingsVenues_asset_usages_products_context_menus_priceOptions[] | null;
  groups: fetchListingsData_listingsVenues_asset_usages_products_context_menus_groups[] | null;
}

export interface fetchListingsData_listingsVenues_asset_usages_products_context {
  __typename: "ProductContext";
  website: string | null;
  configurations: fetchListingsData_listingsVenues_asset_usages_products_context_configurations[] | null;
  amenities: fetchListingsData_listingsVenues_asset_usages_products_context_amenities[] | null;
  schedule: fetchListingsData_listingsVenues_asset_usages_products_context_schedule | null;
  tags: fetchListingsData_listingsVenues_asset_usages_products_context_tags[] | null;
  menus: fetchListingsData_listingsVenues_asset_usages_products_context_menus[] | null;
}

export interface fetchListingsData_listingsVenues_asset_usages_products_includes {
  __typename: "ProductItem";
  description: string | null;
  orderIndex: number | null;
}

export interface fetchListingsData_listingsVenues_asset_usages_products {
  __typename: "Product";
  id: Ref;
  description: string | null;
  name: string | null;
  unit: TimeUnit;
  coverage: PriceCoverage;
  perPerson: boolean;
  parameters: fetchListingsData_listingsVenues_asset_usages_products_parameters | null;
  unitPrice: fetchListingsData_listingsVenues_asset_usages_products_unitPrice | null;
  context: fetchListingsData_listingsVenues_asset_usages_products_context | null;
  includes: fetchListingsData_listingsVenues_asset_usages_products_includes[] | null;
}

export interface fetchListingsData_listingsVenues_asset_usages {
  __typename: "Usage";
  name: string | null;
  description: string | null;
  category: ProductCategory;
  context: fetchListingsData_listingsVenues_asset_usages_context | null;
  products: fetchListingsData_listingsVenues_asset_usages_products[] | null;
}

export interface fetchListingsData_listingsVenues_asset_area {
  __typename: "Area";
  value: number;
  unit: AreaUnit;
}

export interface fetchListingsData_listingsVenues_asset {
  __typename: "ListingsAsset";
  id: Ref;
  description: string | null;
  name: string;
  currency: Currency | null;
  context: fetchListingsData_listingsVenues_asset_context | null;
  location: fetchListingsData_listingsVenues_asset_location | null;
  images: fetchListingsData_listingsVenues_asset_images[] | null;
  usages: fetchListingsData_listingsVenues_asset_usages[] | null;
  area: fetchListingsData_listingsVenues_asset_area | null;
}

export interface fetchListingsData_listingsVenues_details {
  __typename: "VenueDetails";
  venueTypeId: Ref | null;
}

export interface fetchListingsData_listingsVenues_spaces_asset_context_configurations {
  __typename: "AssetConfiguration";
  kind: ConfigurationKind;
  maxPax: number;
}

export interface fetchListingsData_listingsVenues_spaces_asset_context_amenities_amenity {
  __typename: "Amenity";
  id: Ref;
}

export interface fetchListingsData_listingsVenues_spaces_asset_context_amenities_price {
  __typename: "CurrencyAmount";
  currency: Currency | null;
  value: number;
}

export interface fetchListingsData_listingsVenues_spaces_asset_context_amenities {
  __typename: "AssetAmenityEdge";
  note: string | null;
  suppressed: boolean | null;
  amenity: fetchListingsData_listingsVenues_spaces_asset_context_amenities_amenity;
  price: fetchListingsData_listingsVenues_spaces_asset_context_amenities_price | null;
}

export interface fetchListingsData_listingsVenues_spaces_asset_context_schedule_days_spans {
  __typename: "DaySpan";
  start: number;
  end: number;
}

export interface fetchListingsData_listingsVenues_spaces_asset_context_schedule_days {
  __typename: "DailyHours";
  day: DayOfWeek | null;
  spans: fetchListingsData_listingsVenues_spaces_asset_context_schedule_days_spans[] | null;
}

export interface fetchListingsData_listingsVenues_spaces_asset_context_schedule {
  __typename: "ProductPriceSchedule";
  days: fetchListingsData_listingsVenues_spaces_asset_context_schedule_days[] | null;
}

export interface fetchListingsData_listingsVenues_spaces_asset_context_tags_tag {
  __typename: "Tag";
  id: Ref;
}

export interface fetchListingsData_listingsVenues_spaces_asset_context_tags {
  __typename: "TagEdge";
  tag: fetchListingsData_listingsVenues_spaces_asset_context_tags_tag | null;
  suppressed: boolean | null;
}

export interface fetchListingsData_listingsVenues_spaces_asset_context_menus_priceOptions_price {
  __typename: "CurrencyAmount";
  currency: Currency | null;
  value: number;
}

export interface fetchListingsData_listingsVenues_spaces_asset_context_menus_priceOptions {
  __typename: "MenuPriceOptions";
  kind: string | null;
  description: string | null;
  price: fetchListingsData_listingsVenues_spaces_asset_context_menus_priceOptions_price | null;
}

export interface fetchListingsData_listingsVenues_spaces_asset_context_menus_groups_items_priceOptions_price {
  __typename: "CurrencyAmount";
  currency: Currency | null;
  value: number;
}

export interface fetchListingsData_listingsVenues_spaces_asset_context_menus_groups_items_priceOptions {
  __typename: "MenuPriceOptions";
  kind: string | null;
  description: string | null;
  price: fetchListingsData_listingsVenues_spaces_asset_context_menus_groups_items_priceOptions_price | null;
}

export interface fetchListingsData_listingsVenues_spaces_asset_context_menus_groups_items {
  __typename: "MenuItem";
  description: string;
  orderIndex: number | null;
  priceOptions: fetchListingsData_listingsVenues_spaces_asset_context_menus_groups_items_priceOptions[] | null;
}

export interface fetchListingsData_listingsVenues_spaces_asset_context_menus_groups {
  __typename: "MenuGroup";
  description: string | null;
  orderIndex: number | null;
  items: fetchListingsData_listingsVenues_spaces_asset_context_menus_groups_items[] | null;
}

export interface fetchListingsData_listingsVenues_spaces_asset_context_menus {
  __typename: "Menu";
  description: string;
  priceOptions: fetchListingsData_listingsVenues_spaces_asset_context_menus_priceOptions[] | null;
  groups: fetchListingsData_listingsVenues_spaces_asset_context_menus_groups[] | null;
}

export interface fetchListingsData_listingsVenues_spaces_asset_context {
  __typename: "ProductContext";
  website: string | null;
  configurations: fetchListingsData_listingsVenues_spaces_asset_context_configurations[] | null;
  amenities: fetchListingsData_listingsVenues_spaces_asset_context_amenities[] | null;
  schedule: fetchListingsData_listingsVenues_spaces_asset_context_schedule | null;
  tags: fetchListingsData_listingsVenues_spaces_asset_context_tags[] | null;
  menus: fetchListingsData_listingsVenues_spaces_asset_context_menus[] | null;
}

export interface fetchListingsData_listingsVenues_spaces_asset_location_address {
  __typename: "Address";
  formattedAddress: string | null;
  streetNumber: string | null;
  street: string | null;
  extra: string | null;
  city: string | null;
  county: string | null;
  country: string | null;
  countryCode: string | null;
  postcode: string | null;
  town: string | null;
  autocomplete: string | null;
}

export interface fetchListingsData_listingsVenues_spaces_asset_location_coords {
  __typename: "LatLng";
  lat: number;
  lng: number;
}

export interface fetchListingsData_listingsVenues_spaces_asset_location_nearbyPlaces_distance {
  __typename: "Length";
  value: number;
  unit: LengthUnit;
}

export interface fetchListingsData_listingsVenues_spaces_asset_location_nearbyPlaces {
  __typename: "NearbyPlace";
  name: string;
  types: NearbyPlaceType[] | null;
  distance: fetchListingsData_listingsVenues_spaces_asset_location_nearbyPlaces_distance;
}

export interface fetchListingsData_listingsVenues_spaces_asset_location {
  __typename: "Location";
  specialInstructions: string | null;
  address: fetchListingsData_listingsVenues_spaces_asset_location_address | null;
  coords: fetchListingsData_listingsVenues_spaces_asset_location_coords | null;
  nearbyPlaces: fetchListingsData_listingsVenues_spaces_asset_location_nearbyPlaces[] | null;
}

export interface fetchListingsData_listingsVenues_spaces_asset_images_image_tags {
  __typename: "Tag";
  id: Ref;
  description: string;
}

export interface fetchListingsData_listingsVenues_spaces_asset_images_image_imageUrls {
  __typename: "ImageUrl";
  url: string | null;
  imageSize: ImageSize | null;
}

export interface fetchListingsData_listingsVenues_spaces_asset_images_image {
  __typename: "Image";
  id: Ref;
  type: ImageType | null;
  tags: (fetchListingsData_listingsVenues_spaces_asset_images_image_tags | null)[] | null;
  imageUrls: (fetchListingsData_listingsVenues_spaces_asset_images_image_imageUrls | null)[] | null;
  downloadLink: string | null;
}

export interface fetchListingsData_listingsVenues_spaces_asset_images {
  __typename: "AssetImageEdge";
  description: string | null;
  orderIndex: number | null;
  image: fetchListingsData_listingsVenues_spaces_asset_images_image | null;
}

export interface fetchListingsData_listingsVenues_spaces_asset_usages_context_configurations {
  __typename: "AssetConfiguration";
  kind: ConfigurationKind;
  maxPax: number;
}

export interface fetchListingsData_listingsVenues_spaces_asset_usages_context_amenities_amenity {
  __typename: "Amenity";
  id: Ref;
}

export interface fetchListingsData_listingsVenues_spaces_asset_usages_context_amenities_price {
  __typename: "CurrencyAmount";
  currency: Currency | null;
  value: number;
}

export interface fetchListingsData_listingsVenues_spaces_asset_usages_context_amenities {
  __typename: "AssetAmenityEdge";
  note: string | null;
  suppressed: boolean | null;
  amenity: fetchListingsData_listingsVenues_spaces_asset_usages_context_amenities_amenity;
  price: fetchListingsData_listingsVenues_spaces_asset_usages_context_amenities_price | null;
}

export interface fetchListingsData_listingsVenues_spaces_asset_usages_context_schedule_days_spans {
  __typename: "DaySpan";
  start: number;
  end: number;
}

export interface fetchListingsData_listingsVenues_spaces_asset_usages_context_schedule_days {
  __typename: "DailyHours";
  day: DayOfWeek | null;
  spans: fetchListingsData_listingsVenues_spaces_asset_usages_context_schedule_days_spans[] | null;
}

export interface fetchListingsData_listingsVenues_spaces_asset_usages_context_schedule {
  __typename: "ProductPriceSchedule";
  days: fetchListingsData_listingsVenues_spaces_asset_usages_context_schedule_days[] | null;
}

export interface fetchListingsData_listingsVenues_spaces_asset_usages_context_tags_tag {
  __typename: "Tag";
  id: Ref;
}

export interface fetchListingsData_listingsVenues_spaces_asset_usages_context_tags {
  __typename: "TagEdge";
  tag: fetchListingsData_listingsVenues_spaces_asset_usages_context_tags_tag | null;
  suppressed: boolean | null;
}

export interface fetchListingsData_listingsVenues_spaces_asset_usages_context_menus_priceOptions_price {
  __typename: "CurrencyAmount";
  currency: Currency | null;
  value: number;
}

export interface fetchListingsData_listingsVenues_spaces_asset_usages_context_menus_priceOptions {
  __typename: "MenuPriceOptions";
  kind: string | null;
  description: string | null;
  price: fetchListingsData_listingsVenues_spaces_asset_usages_context_menus_priceOptions_price | null;
}

export interface fetchListingsData_listingsVenues_spaces_asset_usages_context_menus_groups_items_priceOptions_price {
  __typename: "CurrencyAmount";
  currency: Currency | null;
  value: number;
}

export interface fetchListingsData_listingsVenues_spaces_asset_usages_context_menus_groups_items_priceOptions {
  __typename: "MenuPriceOptions";
  kind: string | null;
  description: string | null;
  price: fetchListingsData_listingsVenues_spaces_asset_usages_context_menus_groups_items_priceOptions_price | null;
}

export interface fetchListingsData_listingsVenues_spaces_asset_usages_context_menus_groups_items {
  __typename: "MenuItem";
  description: string;
  orderIndex: number | null;
  priceOptions: fetchListingsData_listingsVenues_spaces_asset_usages_context_menus_groups_items_priceOptions[] | null;
}

export interface fetchListingsData_listingsVenues_spaces_asset_usages_context_menus_groups {
  __typename: "MenuGroup";
  description: string | null;
  orderIndex: number | null;
  items: fetchListingsData_listingsVenues_spaces_asset_usages_context_menus_groups_items[] | null;
}

export interface fetchListingsData_listingsVenues_spaces_asset_usages_context_menus {
  __typename: "Menu";
  description: string;
  priceOptions: fetchListingsData_listingsVenues_spaces_asset_usages_context_menus_priceOptions[] | null;
  groups: fetchListingsData_listingsVenues_spaces_asset_usages_context_menus_groups[] | null;
}

export interface fetchListingsData_listingsVenues_spaces_asset_usages_context {
  __typename: "ProductContext";
  website: string | null;
  configurations: fetchListingsData_listingsVenues_spaces_asset_usages_context_configurations[] | null;
  amenities: fetchListingsData_listingsVenues_spaces_asset_usages_context_amenities[] | null;
  schedule: fetchListingsData_listingsVenues_spaces_asset_usages_context_schedule | null;
  tags: fetchListingsData_listingsVenues_spaces_asset_usages_context_tags[] | null;
  menus: fetchListingsData_listingsVenues_spaces_asset_usages_context_menus[] | null;
}

export interface fetchListingsData_listingsVenues_spaces_asset_usages_products_parameters_depositAmount {
  __typename: "CurrencyAmount";
  value: number;
  currency: Currency | null;
}

export interface fetchListingsData_listingsVenues_spaces_asset_usages_products_parameters_constraints_guests {
  __typename: "PeopleBookingConstraints";
  minPax: number | null;
  maxPax: number | null;
}

export interface fetchListingsData_listingsVenues_spaces_asset_usages_products_parameters_constraints_duration {
  __typename: "TimeBookingConstraints";
  minDuration: number | null;
  maxDuration: number | null;
}

export interface fetchListingsData_listingsVenues_spaces_asset_usages_products_parameters_constraints_spend_minSpendAmount {
  __typename: "CurrencyAmount";
  currency: Currency | null;
  value: number;
}

export interface fetchListingsData_listingsVenues_spaces_asset_usages_products_parameters_constraints_spend {
  __typename: "SpendBookingConstraints";
  minSpendAmount: fetchListingsData_listingsVenues_spaces_asset_usages_products_parameters_constraints_spend_minSpendAmount | null;
}

export interface fetchListingsData_listingsVenues_spaces_asset_usages_products_parameters_constraints {
  __typename: "BookingConstraints";
  guests: fetchListingsData_listingsVenues_spaces_asset_usages_products_parameters_constraints_guests | null;
  duration: fetchListingsData_listingsVenues_spaces_asset_usages_products_parameters_constraints_duration | null;
  spend: fetchListingsData_listingsVenues_spaces_asset_usages_products_parameters_constraints_spend | null;
}

export interface fetchListingsData_listingsVenues_spaces_asset_usages_products_parameters {
  __typename: "ProductBookingParameters";
  depositPercent: number | null;
  depositAmount: fetchListingsData_listingsVenues_spaces_asset_usages_products_parameters_depositAmount | null;
  constraints: fetchListingsData_listingsVenues_spaces_asset_usages_products_parameters_constraints | null;
}

export interface fetchListingsData_listingsVenues_spaces_asset_usages_products_unitPrice {
  __typename: "CurrencyAmount";
  value: number;
  currency: Currency | null;
}

export interface fetchListingsData_listingsVenues_spaces_asset_usages_products_context_configurations {
  __typename: "AssetConfiguration";
  kind: ConfigurationKind;
  maxPax: number;
}

export interface fetchListingsData_listingsVenues_spaces_asset_usages_products_context_amenities_amenity {
  __typename: "Amenity";
  id: Ref;
}

export interface fetchListingsData_listingsVenues_spaces_asset_usages_products_context_amenities_price {
  __typename: "CurrencyAmount";
  currency: Currency | null;
  value: number;
}

export interface fetchListingsData_listingsVenues_spaces_asset_usages_products_context_amenities {
  __typename: "AssetAmenityEdge";
  note: string | null;
  suppressed: boolean | null;
  amenity: fetchListingsData_listingsVenues_spaces_asset_usages_products_context_amenities_amenity;
  price: fetchListingsData_listingsVenues_spaces_asset_usages_products_context_amenities_price | null;
}

export interface fetchListingsData_listingsVenues_spaces_asset_usages_products_context_schedule_days_spans {
  __typename: "DaySpan";
  start: number;
  end: number;
}

export interface fetchListingsData_listingsVenues_spaces_asset_usages_products_context_schedule_days {
  __typename: "DailyHours";
  day: DayOfWeek | null;
  spans: fetchListingsData_listingsVenues_spaces_asset_usages_products_context_schedule_days_spans[] | null;
}

export interface fetchListingsData_listingsVenues_spaces_asset_usages_products_context_schedule {
  __typename: "ProductPriceSchedule";
  days: fetchListingsData_listingsVenues_spaces_asset_usages_products_context_schedule_days[] | null;
}

export interface fetchListingsData_listingsVenues_spaces_asset_usages_products_context_tags_tag {
  __typename: "Tag";
  id: Ref;
}

export interface fetchListingsData_listingsVenues_spaces_asset_usages_products_context_tags {
  __typename: "TagEdge";
  tag: fetchListingsData_listingsVenues_spaces_asset_usages_products_context_tags_tag | null;
  suppressed: boolean | null;
}

export interface fetchListingsData_listingsVenues_spaces_asset_usages_products_context_menus_priceOptions_price {
  __typename: "CurrencyAmount";
  currency: Currency | null;
  value: number;
}

export interface fetchListingsData_listingsVenues_spaces_asset_usages_products_context_menus_priceOptions {
  __typename: "MenuPriceOptions";
  kind: string | null;
  description: string | null;
  price: fetchListingsData_listingsVenues_spaces_asset_usages_products_context_menus_priceOptions_price | null;
}

export interface fetchListingsData_listingsVenues_spaces_asset_usages_products_context_menus_groups_items_priceOptions_price {
  __typename: "CurrencyAmount";
  currency: Currency | null;
  value: number;
}

export interface fetchListingsData_listingsVenues_spaces_asset_usages_products_context_menus_groups_items_priceOptions {
  __typename: "MenuPriceOptions";
  kind: string | null;
  description: string | null;
  price: fetchListingsData_listingsVenues_spaces_asset_usages_products_context_menus_groups_items_priceOptions_price | null;
}

export interface fetchListingsData_listingsVenues_spaces_asset_usages_products_context_menus_groups_items {
  __typename: "MenuItem";
  description: string;
  orderIndex: number | null;
  priceOptions: fetchListingsData_listingsVenues_spaces_asset_usages_products_context_menus_groups_items_priceOptions[] | null;
}

export interface fetchListingsData_listingsVenues_spaces_asset_usages_products_context_menus_groups {
  __typename: "MenuGroup";
  description: string | null;
  orderIndex: number | null;
  items: fetchListingsData_listingsVenues_spaces_asset_usages_products_context_menus_groups_items[] | null;
}

export interface fetchListingsData_listingsVenues_spaces_asset_usages_products_context_menus {
  __typename: "Menu";
  description: string;
  priceOptions: fetchListingsData_listingsVenues_spaces_asset_usages_products_context_menus_priceOptions[] | null;
  groups: fetchListingsData_listingsVenues_spaces_asset_usages_products_context_menus_groups[] | null;
}

export interface fetchListingsData_listingsVenues_spaces_asset_usages_products_context {
  __typename: "ProductContext";
  website: string | null;
  configurations: fetchListingsData_listingsVenues_spaces_asset_usages_products_context_configurations[] | null;
  amenities: fetchListingsData_listingsVenues_spaces_asset_usages_products_context_amenities[] | null;
  schedule: fetchListingsData_listingsVenues_spaces_asset_usages_products_context_schedule | null;
  tags: fetchListingsData_listingsVenues_spaces_asset_usages_products_context_tags[] | null;
  menus: fetchListingsData_listingsVenues_spaces_asset_usages_products_context_menus[] | null;
}

export interface fetchListingsData_listingsVenues_spaces_asset_usages_products_includes {
  __typename: "ProductItem";
  description: string | null;
  orderIndex: number | null;
}

export interface fetchListingsData_listingsVenues_spaces_asset_usages_products {
  __typename: "Product";
  id: Ref;
  description: string | null;
  name: string | null;
  unit: TimeUnit;
  coverage: PriceCoverage;
  perPerson: boolean;
  parameters: fetchListingsData_listingsVenues_spaces_asset_usages_products_parameters | null;
  unitPrice: fetchListingsData_listingsVenues_spaces_asset_usages_products_unitPrice | null;
  context: fetchListingsData_listingsVenues_spaces_asset_usages_products_context | null;
  includes: fetchListingsData_listingsVenues_spaces_asset_usages_products_includes[] | null;
}

export interface fetchListingsData_listingsVenues_spaces_asset_usages {
  __typename: "Usage";
  name: string | null;
  description: string | null;
  category: ProductCategory;
  context: fetchListingsData_listingsVenues_spaces_asset_usages_context | null;
  products: fetchListingsData_listingsVenues_spaces_asset_usages_products[] | null;
}

export interface fetchListingsData_listingsVenues_spaces_asset_area {
  __typename: "Area";
  value: number;
  unit: AreaUnit;
}

export interface fetchListingsData_listingsVenues_spaces_asset {
  __typename: "ListingsAsset";
  id: Ref;
  description: string | null;
  name: string;
  currency: Currency | null;
  context: fetchListingsData_listingsVenues_spaces_asset_context | null;
  location: fetchListingsData_listingsVenues_spaces_asset_location | null;
  images: fetchListingsData_listingsVenues_spaces_asset_images[] | null;
  usages: fetchListingsData_listingsVenues_spaces_asset_usages[] | null;
  area: fetchListingsData_listingsVenues_spaces_asset_area | null;
}

export interface fetchListingsData_listingsVenues_spaces_details {
  __typename: "SpaceDetails";
  styles: AssetStyle[] | null;
}

export interface fetchListingsData_listingsVenues_spaces {
  __typename: "ListingsSpace";
  tableCount: number | null;
  asset: fetchListingsData_listingsVenues_spaces_asset | null;
  details: fetchListingsData_listingsVenues_spaces_details | null;
}

export interface fetchListingsData_listingsVenues {
  __typename: "ListingsVenue";
  asset: fetchListingsData_listingsVenues_asset;
  details: fetchListingsData_listingsVenues_details;
  spaces: fetchListingsData_listingsVenues_spaces[];
}

export interface fetchListingsData {
  listingsVenues: (fetchListingsData_listingsVenues | null)[] | null;
}

export interface fetchListingsDataVariables {
  args: ListingsVenuesArgs;
}
