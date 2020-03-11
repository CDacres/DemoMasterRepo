/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { Currency, ConfigurationKind, DayOfWeek, NearbyPlaceType, LengthUnit, ImageType, ImageSize, ProductCategory, TimeUnit, PriceCoverage, AreaUnit } from "./../../../../types";

// ====================================================
// GraphQL fragment: assetFields
// ====================================================

export interface assetFields_context_configurations {
  __typename: "AssetConfiguration";
  kind: ConfigurationKind;
  maxPax: number;
}

export interface assetFields_context_amenities_amenity {
  __typename: "Amenity";
  id: Ref;
}

export interface assetFields_context_amenities_price {
  __typename: "CurrencyAmount";
  currency: Currency | null;
  value: number;
}

export interface assetFields_context_amenities {
  __typename: "AssetAmenityEdge";
  note: string | null;
  suppressed: boolean | null;
  amenity: assetFields_context_amenities_amenity;
  price: assetFields_context_amenities_price | null;
}

export interface assetFields_context_schedule_days_spans {
  __typename: "DaySpan";
  start: number;
  end: number;
}

export interface assetFields_context_schedule_days {
  __typename: "DailyHours";
  day: DayOfWeek | null;
  spans: assetFields_context_schedule_days_spans[] | null;
}

export interface assetFields_context_schedule {
  __typename: "ProductPriceSchedule";
  days: assetFields_context_schedule_days[] | null;
}

export interface assetFields_context_tags_tag {
  __typename: "Tag";
  id: Ref;
}

export interface assetFields_context_tags {
  __typename: "TagEdge";
  tag: assetFields_context_tags_tag | null;
  suppressed: boolean | null;
}

export interface assetFields_context_menus_priceOptions_price {
  __typename: "CurrencyAmount";
  currency: Currency | null;
  value: number;
}

export interface assetFields_context_menus_priceOptions {
  __typename: "MenuPriceOptions";
  kind: string | null;
  description: string | null;
  price: assetFields_context_menus_priceOptions_price | null;
}

export interface assetFields_context_menus_groups_items_priceOptions_price {
  __typename: "CurrencyAmount";
  currency: Currency | null;
  value: number;
}

export interface assetFields_context_menus_groups_items_priceOptions {
  __typename: "MenuPriceOptions";
  kind: string | null;
  description: string | null;
  price: assetFields_context_menus_groups_items_priceOptions_price | null;
}

export interface assetFields_context_menus_groups_items {
  __typename: "MenuItem";
  description: string;
  orderIndex: number | null;
  priceOptions: assetFields_context_menus_groups_items_priceOptions[] | null;
}

export interface assetFields_context_menus_groups {
  __typename: "MenuGroup";
  description: string | null;
  orderIndex: number | null;
  items: assetFields_context_menus_groups_items[] | null;
}

export interface assetFields_context_menus {
  __typename: "Menu";
  description: string;
  priceOptions: assetFields_context_menus_priceOptions[] | null;
  groups: assetFields_context_menus_groups[] | null;
}

export interface assetFields_context {
  __typename: "ProductContext";
  website: string | null;
  configurations: assetFields_context_configurations[] | null;
  amenities: assetFields_context_amenities[] | null;
  schedule: assetFields_context_schedule | null;
  tags: assetFields_context_tags[] | null;
  menus: assetFields_context_menus[] | null;
}

export interface assetFields_location_address {
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

export interface assetFields_location_coords {
  __typename: "LatLng";
  lat: number;
  lng: number;
}

export interface assetFields_location_nearbyPlaces_distance {
  __typename: "Length";
  value: number;
  unit: LengthUnit;
}

export interface assetFields_location_nearbyPlaces {
  __typename: "NearbyPlace";
  name: string;
  types: NearbyPlaceType[] | null;
  distance: assetFields_location_nearbyPlaces_distance;
}

export interface assetFields_location {
  __typename: "Location";
  specialInstructions: string | null;
  address: assetFields_location_address | null;
  coords: assetFields_location_coords | null;
  nearbyPlaces: assetFields_location_nearbyPlaces[] | null;
}

export interface assetFields_images_image_tags {
  __typename: "Tag";
  id: Ref;
  description: string;
}

export interface assetFields_images_image_imageUrls {
  __typename: "ImageUrl";
  url: string | null;
  imageSize: ImageSize | null;
}

export interface assetFields_images_image {
  __typename: "Image";
  id: Ref;
  type: ImageType | null;
  tags: (assetFields_images_image_tags | null)[] | null;
  imageUrls: (assetFields_images_image_imageUrls | null)[] | null;
  downloadLink: string | null;
}

export interface assetFields_images {
  __typename: "AssetImageEdge";
  description: string | null;
  orderIndex: number | null;
  image: assetFields_images_image | null;
}

export interface assetFields_usages_context_configurations {
  __typename: "AssetConfiguration";
  kind: ConfigurationKind;
  maxPax: number;
}

export interface assetFields_usages_context_amenities_amenity {
  __typename: "Amenity";
  id: Ref;
}

export interface assetFields_usages_context_amenities_price {
  __typename: "CurrencyAmount";
  currency: Currency | null;
  value: number;
}

export interface assetFields_usages_context_amenities {
  __typename: "AssetAmenityEdge";
  note: string | null;
  suppressed: boolean | null;
  amenity: assetFields_usages_context_amenities_amenity;
  price: assetFields_usages_context_amenities_price | null;
}

export interface assetFields_usages_context_schedule_days_spans {
  __typename: "DaySpan";
  start: number;
  end: number;
}

export interface assetFields_usages_context_schedule_days {
  __typename: "DailyHours";
  day: DayOfWeek | null;
  spans: assetFields_usages_context_schedule_days_spans[] | null;
}

export interface assetFields_usages_context_schedule {
  __typename: "ProductPriceSchedule";
  days: assetFields_usages_context_schedule_days[] | null;
}

export interface assetFields_usages_context_tags_tag {
  __typename: "Tag";
  id: Ref;
}

export interface assetFields_usages_context_tags {
  __typename: "TagEdge";
  tag: assetFields_usages_context_tags_tag | null;
  suppressed: boolean | null;
}

export interface assetFields_usages_context_menus_priceOptions_price {
  __typename: "CurrencyAmount";
  currency: Currency | null;
  value: number;
}

export interface assetFields_usages_context_menus_priceOptions {
  __typename: "MenuPriceOptions";
  kind: string | null;
  description: string | null;
  price: assetFields_usages_context_menus_priceOptions_price | null;
}

export interface assetFields_usages_context_menus_groups_items_priceOptions_price {
  __typename: "CurrencyAmount";
  currency: Currency | null;
  value: number;
}

export interface assetFields_usages_context_menus_groups_items_priceOptions {
  __typename: "MenuPriceOptions";
  kind: string | null;
  description: string | null;
  price: assetFields_usages_context_menus_groups_items_priceOptions_price | null;
}

export interface assetFields_usages_context_menus_groups_items {
  __typename: "MenuItem";
  description: string;
  orderIndex: number | null;
  priceOptions: assetFields_usages_context_menus_groups_items_priceOptions[] | null;
}

export interface assetFields_usages_context_menus_groups {
  __typename: "MenuGroup";
  description: string | null;
  orderIndex: number | null;
  items: assetFields_usages_context_menus_groups_items[] | null;
}

export interface assetFields_usages_context_menus {
  __typename: "Menu";
  description: string;
  priceOptions: assetFields_usages_context_menus_priceOptions[] | null;
  groups: assetFields_usages_context_menus_groups[] | null;
}

export interface assetFields_usages_context {
  __typename: "ProductContext";
  website: string | null;
  configurations: assetFields_usages_context_configurations[] | null;
  amenities: assetFields_usages_context_amenities[] | null;
  schedule: assetFields_usages_context_schedule | null;
  tags: assetFields_usages_context_tags[] | null;
  menus: assetFields_usages_context_menus[] | null;
}

export interface assetFields_usages_products_parameters_depositAmount {
  __typename: "CurrencyAmount";
  value: number;
  currency: Currency | null;
}

export interface assetFields_usages_products_parameters_constraints_guests {
  __typename: "PeopleBookingConstraints";
  minPax: number | null;
  maxPax: number | null;
}

export interface assetFields_usages_products_parameters_constraints_duration {
  __typename: "TimeBookingConstraints";
  minDuration: number | null;
  maxDuration: number | null;
}

export interface assetFields_usages_products_parameters_constraints_spend_minSpendAmount {
  __typename: "CurrencyAmount";
  currency: Currency | null;
  value: number;
}

export interface assetFields_usages_products_parameters_constraints_spend {
  __typename: "SpendBookingConstraints";
  minSpendAmount: assetFields_usages_products_parameters_constraints_spend_minSpendAmount | null;
}

export interface assetFields_usages_products_parameters_constraints {
  __typename: "BookingConstraints";
  guests: assetFields_usages_products_parameters_constraints_guests | null;
  duration: assetFields_usages_products_parameters_constraints_duration | null;
  spend: assetFields_usages_products_parameters_constraints_spend | null;
}

export interface assetFields_usages_products_parameters {
  __typename: "ProductBookingParameters";
  depositPercent: number | null;
  depositAmount: assetFields_usages_products_parameters_depositAmount | null;
  constraints: assetFields_usages_products_parameters_constraints | null;
}

export interface assetFields_usages_products_unitPrice {
  __typename: "CurrencyAmount";
  value: number;
  currency: Currency | null;
}

export interface assetFields_usages_products_context_configurations {
  __typename: "AssetConfiguration";
  kind: ConfigurationKind;
  maxPax: number;
}

export interface assetFields_usages_products_context_amenities_amenity {
  __typename: "Amenity";
  id: Ref;
}

export interface assetFields_usages_products_context_amenities_price {
  __typename: "CurrencyAmount";
  currency: Currency | null;
  value: number;
}

export interface assetFields_usages_products_context_amenities {
  __typename: "AssetAmenityEdge";
  note: string | null;
  suppressed: boolean | null;
  amenity: assetFields_usages_products_context_amenities_amenity;
  price: assetFields_usages_products_context_amenities_price | null;
}

export interface assetFields_usages_products_context_schedule_days_spans {
  __typename: "DaySpan";
  start: number;
  end: number;
}

export interface assetFields_usages_products_context_schedule_days {
  __typename: "DailyHours";
  day: DayOfWeek | null;
  spans: assetFields_usages_products_context_schedule_days_spans[] | null;
}

export interface assetFields_usages_products_context_schedule {
  __typename: "ProductPriceSchedule";
  days: assetFields_usages_products_context_schedule_days[] | null;
}

export interface assetFields_usages_products_context_tags_tag {
  __typename: "Tag";
  id: Ref;
}

export interface assetFields_usages_products_context_tags {
  __typename: "TagEdge";
  tag: assetFields_usages_products_context_tags_tag | null;
  suppressed: boolean | null;
}

export interface assetFields_usages_products_context_menus_priceOptions_price {
  __typename: "CurrencyAmount";
  currency: Currency | null;
  value: number;
}

export interface assetFields_usages_products_context_menus_priceOptions {
  __typename: "MenuPriceOptions";
  kind: string | null;
  description: string | null;
  price: assetFields_usages_products_context_menus_priceOptions_price | null;
}

export interface assetFields_usages_products_context_menus_groups_items_priceOptions_price {
  __typename: "CurrencyAmount";
  currency: Currency | null;
  value: number;
}

export interface assetFields_usages_products_context_menus_groups_items_priceOptions {
  __typename: "MenuPriceOptions";
  kind: string | null;
  description: string | null;
  price: assetFields_usages_products_context_menus_groups_items_priceOptions_price | null;
}

export interface assetFields_usages_products_context_menus_groups_items {
  __typename: "MenuItem";
  description: string;
  orderIndex: number | null;
  priceOptions: assetFields_usages_products_context_menus_groups_items_priceOptions[] | null;
}

export interface assetFields_usages_products_context_menus_groups {
  __typename: "MenuGroup";
  description: string | null;
  orderIndex: number | null;
  items: assetFields_usages_products_context_menus_groups_items[] | null;
}

export interface assetFields_usages_products_context_menus {
  __typename: "Menu";
  description: string;
  priceOptions: assetFields_usages_products_context_menus_priceOptions[] | null;
  groups: assetFields_usages_products_context_menus_groups[] | null;
}

export interface assetFields_usages_products_context {
  __typename: "ProductContext";
  website: string | null;
  configurations: assetFields_usages_products_context_configurations[] | null;
  amenities: assetFields_usages_products_context_amenities[] | null;
  schedule: assetFields_usages_products_context_schedule | null;
  tags: assetFields_usages_products_context_tags[] | null;
  menus: assetFields_usages_products_context_menus[] | null;
}

export interface assetFields_usages_products_includes {
  __typename: "ProductItem";
  description: string | null;
  orderIndex: number | null;
}

export interface assetFields_usages_products {
  __typename: "Product";
  id: Ref;
  description: string | null;
  name: string | null;
  unit: TimeUnit;
  coverage: PriceCoverage;
  perPerson: boolean;
  parameters: assetFields_usages_products_parameters | null;
  unitPrice: assetFields_usages_products_unitPrice | null;
  context: assetFields_usages_products_context | null;
  includes: assetFields_usages_products_includes[] | null;
}

export interface assetFields_usages {
  __typename: "Usage";
  name: string | null;
  description: string | null;
  category: ProductCategory;
  context: assetFields_usages_context | null;
  products: assetFields_usages_products[] | null;
}

export interface assetFields_area {
  __typename: "Area";
  value: number;
  unit: AreaUnit;
}

export interface assetFields {
  __typename: "ListingsAsset";
  id: Ref;
  description: string | null;
  name: string;
  currency: Currency | null;
  context: assetFields_context | null;
  location: assetFields_location | null;
  images: assetFields_images[] | null;
  usages: assetFields_usages[] | null;
  area: assetFields_area | null;
}
