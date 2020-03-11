/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ConfigurationKind, Currency, DayOfWeek } from "./../../../../types";

// ====================================================
// GraphQL fragment: contextFields
// ====================================================

export interface contextFields_configurations {
  __typename: "AssetConfiguration";
  kind: ConfigurationKind;
  maxPax: number;
}

export interface contextFields_amenities_amenity {
  __typename: "Amenity";
  id: Ref;
}

export interface contextFields_amenities_price {
  __typename: "CurrencyAmount";
  currency: Currency | null;
  value: number;
}

export interface contextFields_amenities {
  __typename: "AssetAmenityEdge";
  note: string | null;
  suppressed: boolean | null;
  amenity: contextFields_amenities_amenity;
  price: contextFields_amenities_price | null;
}

export interface contextFields_schedule_days_spans {
  __typename: "DaySpan";
  start: number;
  end: number;
}

export interface contextFields_schedule_days {
  __typename: "DailyHours";
  day: DayOfWeek | null;
  spans: contextFields_schedule_days_spans[] | null;
}

export interface contextFields_schedule {
  __typename: "ProductPriceSchedule";
  days: contextFields_schedule_days[] | null;
}

export interface contextFields_tags_tag {
  __typename: "Tag";
  id: Ref;
}

export interface contextFields_tags {
  __typename: "TagEdge";
  tag: contextFields_tags_tag | null;
  suppressed: boolean | null;
}

export interface contextFields_menus_priceOptions_price {
  __typename: "CurrencyAmount";
  currency: Currency | null;
  value: number;
}

export interface contextFields_menus_priceOptions {
  __typename: "MenuPriceOptions";
  kind: string | null;
  description: string | null;
  price: contextFields_menus_priceOptions_price | null;
}

export interface contextFields_menus_groups_items_priceOptions_price {
  __typename: "CurrencyAmount";
  currency: Currency | null;
  value: number;
}

export interface contextFields_menus_groups_items_priceOptions {
  __typename: "MenuPriceOptions";
  kind: string | null;
  description: string | null;
  price: contextFields_menus_groups_items_priceOptions_price | null;
}

export interface contextFields_menus_groups_items {
  __typename: "MenuItem";
  description: string;
  orderIndex: number | null;
  priceOptions: contextFields_menus_groups_items_priceOptions[] | null;
}

export interface contextFields_menus_groups {
  __typename: "MenuGroup";
  description: string | null;
  orderIndex: number | null;
  items: contextFields_menus_groups_items[] | null;
}

export interface contextFields_menus {
  __typename: "Menu";
  description: string;
  priceOptions: contextFields_menus_priceOptions[] | null;
  groups: contextFields_menus_groups[] | null;
}

export interface contextFields {
  __typename: "ProductContext";
  website: string | null;
  configurations: contextFields_configurations[] | null;
  amenities: contextFields_amenities[] | null;
  schedule: contextFields_schedule | null;
  tags: contextFields_tags[] | null;
  menus: contextFields_menus[] | null;
}
