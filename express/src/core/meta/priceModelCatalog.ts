import { Catalog } from '@src/core';
import { PriceCoverage, PriceModelMeta, TimeUnit } from '@src/core/domain';

const _itemsSource: PriceModelMeta[] = [
  {
    add: {
      label: 'listing.HOUR_priceTitle',
      priceDef: {
        coverage: PriceCoverage.ALLIN,
        model: TimeUnit.HOUR,
        unit: TimeUnit.HOUR,
      },
      tip: 'listing.hourly_tip',
    },
    allowPricingSchedule: true,
    description: 'Hour',
    id: TimeUnit.HOUR,
  },
  {
    add: {
      label: 'listing.HALFDAY_priceTitle',
      priceDef: {
        coverage: PriceCoverage.ALLIN,
        model: 'HALFDAY',
        unit: TimeUnit.SPAN,
      },
      tip: 'listing.half_day_tip',
    },
    allowPricingSchedule: false,
    description: 'Half day',
    id: 'HALFDAY',
  },
  {
    add: {
      label: 'listing.DAY_priceTitle',
      priceDef: {
        coverage: PriceCoverage.ALLIN,
        model: TimeUnit.DAY,
        unit: TimeUnit.DAY,
      },
      tip: 'listing.daily_tip',
    },
    allowPricingSchedule: true,
    description: 'Day',
    id: TimeUnit.DAY,
  },
  {
    add: {
      label: 'listing.MONTH_priceTitle',
      priceDef: {
        coverage: PriceCoverage.ALLIN,
        model: TimeUnit.MONTH,
        unit: TimeUnit.MONTH,
      },
      tip: 'listing.monthly_tip',
    },
    allowPricingSchedule: false,
    description: 'Month',
    id: TimeUnit.MONTH,
  },
  {
    add: {
      label: 'listing.YEAR_priceTitle',
      priceDef: {
        coverage: PriceCoverage.ALLIN,
        model: TimeUnit.YEAR,
        unit: TimeUnit.YEAR,
      },
      tip: 'listing.YEAR_priceTitle',
    },
    allowPricingSchedule: false,
    description: 'Year',
    id: TimeUnit.YEAR,
  },
  {
    add: {
      label: 'listing.MINIMUMSPEND_priceTitle',
      priceDef: {
        coverage: PriceCoverage.MINIMUMSPEND,
        model: PriceCoverage.MINIMUMSPEND,
        unit: TimeUnit.HOUR,
      },
    },
    allowPricingSchedule: true,
    description: 'Minimum',
    id: PriceCoverage.MINIMUMSPEND,
  },
  {
    add: {
      label: 'listing.FLATRATE_priceTitle',
      priceDef: {
        coverage: PriceCoverage.FLATRATE,
        model: PriceCoverage.FLATRATE,
        unit: TimeUnit.HOUR,
      },
    },
    allowPricingSchedule: true,
    description: 'Flat Rate',
    id: PriceCoverage.FLATRATE,
  },
];

export const priceModelCatalog = new Catalog<PriceModelMeta>().withItems(_itemsSource);
