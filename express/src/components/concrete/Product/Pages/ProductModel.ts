/* tslint:disable:max-line-length */
import { observable } from 'mobx';

// Data
import { resolveOfficeAsset } from '@src/data/seed/resolveAsset';
import { images } from '@src/data/product/office';
import { reviews } from '@src/data/product/party';
import { adminInfo, assetTags } from '@src/data/product/meeting';

// Core
import { dayOfWeekCatalog, Model, resolveUnitSystem, timeString, UnitSystem } from '@src/core';
import { Asset, dayIsHalfday, Location, NearbyPlace, planString, PriceCoverage, ProductCategory, ProductCategoryMeta, Review, TimeUnit, VenueImageTypes, walkDistance } from '@src/core/domain';
import { currencyCatalog, productCategoryCatalog } from '@src/core/meta';

// Components
import { ProductImage, ProductPageMeta, productPageMeta } from '@src/components/concrete/Product/Pages/metadata';
import { RoomSummaryInfoProps } from '@src/components/concrete/Product/RoomSummaryInfo';
import { RoomLocationProps } from '@src/components/concrete/Product/RoomLocation';
import { RoomDetailsProps } from '@src/components/concrete/Product/RoomDetails';
import { RoomPriceAndPackagesProps } from '@src/components/concrete/Product/RoomPriceAndPackages';
import { cash } from '@src/components/Listing/Form';
import { RoomAdminCardProps } from '@src/components/concrete/Product/RoomAdminCard';
import { RoomAdminTagsProps } from '@src/components/concrete/Product/RoomAdminTags';
import { RoomAmenitiesProps } from '@src/components/concrete/Product/RoomAmenities';
import { RoomMenuProps } from '@src/components/concrete/Product/RoomMenu';

// Types
import { OpenHoursSchedule } from '@src/typings/types';

export default class ProductModel extends Model {

  page: ProductPageMeta = null;
  category: ProductCategory = null;
  categoryMeta: ProductCategoryMeta = null;
  principalId: string = null;

  domain: string = 'en';
  unitSystem: UnitSystem = 'METRIC';

  @observable summary: RoomSummaryInfoProps = null;
  @observable location: RoomLocationProps = null;
  @observable schedule: OpenHoursSchedule = null;
  @observable details: RoomDetailsProps = null;
  @observable options: RoomPriceAndPackagesProps = null;
  @observable adminCard: RoomAdminCardProps = null;
  @observable adminTag: RoomAdminTagsProps = null;
  @observable amenitySection: RoomAmenitiesProps = null;
  @observable menuSectionProps: RoomMenuProps = null;

  @observable images: ProductImage[] = [];

  @observable rating = {
    avg: 5,
    count: 8,
  };
  @observable reviews: Review[] = [];

  @observable asset: Asset = null;

  isAdmin: boolean = true;

  constructor(category: ProductCategory, principalId: string, opts: { domain: string }) {
    super();

    if (opts) {
      this.domain = opts.domain;
      this.unitSystem = resolveUnitSystem(opts.domain);
    }

    this.category = category;
    this.categoryMeta = productCategoryCatalog.byId[category];
    this.page = productPageMeta[category];

    this.principalId = principalId;
  }

  get showAdminInfoSection() {
    return this.isAdmin;
  }

  get showAdminTagSection() {
    return this.isAdmin;
  }

  load = async () => {
    const category = this.category;
    // const id = this.principalId;

    // const asset = await client.asset({ id, category });
    // const adminInfo = await client.assetAdminInfo({ id, category });
    // const assetTags = await client.assetTags({ id, category });

    this.asset = resolveOfficeAsset(1, ProductCategory.MEETING); // fake data

    this.summary = this.getSummaryProps();
    this.location = this.getLocationProps();
    this.schedule = this.getScheduleProps();
    this.details = this.getDetailsProps();
    this.options = this.getOptionsProps();
    this.adminCard = {
      adminInfo,
      info: asInfo(this.asset, category),
    };
    this.adminTag = {
      assetTags,
      verticalId: 1,
      search: null,
    };
    this.amenitySection = this.getAmenitySectionProps();
    this.menuSectionProps = this.getMenuSectionProps();

    this.images = [images];
    this.reviews = reviews.venue_reviews;

    await this.dispatchLoad();
  }

  setup = async () => {
    await this.load();
    return this;
  }

  get currencyLocale() {
    const code = this.asset.currency;
    return {
      code,
      currency_symbol_left: currencyCatalog.byId[code].symbol,
      currency_symbol_right: '',
    };
  }

  getMenuSectionProps = (): RoomMenuProps => {
    const asset = this.asset;
    return {
      currency: this.currencyLocale,
      menu: {
        pictures: asset.images.filter(x => x.image.type === VenueImageTypes.FOOD).orderBy(x => x.orderIndex).map(x => x.image.urls.thumbUrl),
        // carteMenu: asset.menus
        //   .filter(x => !x.priceOptions.any())
        //   .map(({ description, groups }) => ({
        //     menu: null
        //   })),
        setMenu: asset.menus.filter(x => x.priceOptions.any()).map(({ description, groups }) => ({
          title: description,
          menu: groups.orderBy(x => x.orderIndex).many(x => x.items.orderBy(y => y.orderIndex).map(i => i.description)),
        })),
      },
    };
  }

  getAmenitySectionProps = (): RoomAmenitiesProps => {
    const asset = this.asset;
    return {
      amenities: asset.amenities.map(({ amenity: { imageUrl, description, id }, price: { value } }) =>
        ({ amenity_id: id, image_url: imageUrl, name: description, price: value })),
      currency: {
        code: asset.currency,
        currency_symbol_left: currencyCatalog.byId[asset.currency].symbol,
        currency_symbol_right: '',
      },
    };
  }

  getSummaryProps = () => {
    const asset = this.asset;
    return {
      name: asset.name,
      priceRange: {
        currency: {
          code: asset.currency,
          currency_symbol_left: currencyCatalog.byId[asset.currency].symbol,
          currency_symbol_right: '',
        },
      },
      reviews: reviews.venue_reviews.length,
      title: this.categoryMeta.description,
      titleHref: '', // TODO: correct link
      capacity: asset.capacity.configurations.any() ? {
        min_capacity: asset.capacity.configurations.minBy(x => x.maxPax),
        max_capacity: asset.capacity.configurations.maxBy(x => x.maxPax),
      } : null,
      info: asInfo(asset, this.category),
      location: asRoomLocation(this.unitSystem)(asset.location),
    };
  }

  getLocationProps = (): RoomLocationProps => {
    return {
      location: asRoomLocation(this.unitSystem)(this.asset.location),
    };
  }

  getScheduleProps = (): OpenHoursSchedule => {
    const asset = this.asset;
    return {
      opening: dayOfWeekCatalog.items.pairLeft(asset.openingHours, x => x.id, x => x.day).map(({ key, right }) => ({
        name: key.toLowerCase(),
        working_hours: !!right && right.spans.any(x => x.start !== x.end)
          ? {
            from: timeString(right.spans.minBy(x => x.start)),
            to: timeString(right.spans.maxBy(x => x.end)),
          } : null,
      })),
    };
  }

  getDetailsProps = (): RoomDetailsProps => {
    const asset = this.asset;
    return {
      configurations: this.asset.capacity.configurations.map(({ maxPax, kind }) => ({
        config_id: 0,
        name: kind,
        max_capacity: maxPax,
      })),
      info: asInfo(asset, this.category),
    };
  }

  getHourlyProducts = () => {
    const venueSchedule = planString(this.asset.openingHours);
    const parameters = this.asset.products.filter(x => !x.perPerson && x.parameters.unit === TimeUnit.HOUR && x.parameters.coverage === PriceCoverage.ALLIN);
    return parameters.map(item => ({
      title: 'price_model.HOUR.priceTitle',
      price: `${currencyCatalog.byId[item.parameters.unitPrice.currency].symbol}${item.parameters.unitPrice.value} per hour`, // TODO: hardcoded text
      times: venueSchedule !== planString(item.parameters.schedule.days) ? [planString(item.parameters.schedule.days)] : null,
    }));
  }

  getHalfdayProducts = () => {
    const parameters = this.asset.products.filter(x => !x.perPerson && x.parameters.unit === TimeUnit.SPAN && x.parameters.coverage === PriceCoverage.ALLIN && x.parameters.schedule.days.all(dayIsHalfday));
    return parameters.map(item => ({
      title: 'price_model.HALFDAY.priceTitle',
      price: `${currencyCatalog.byId[item.parameters.unitPrice.currency].symbol}${item.parameters.unitPrice.value} per half day`, // TODO: hardcoded text
    }));
  }

  getDailyProducts = () => {
    const parameters = this.asset.products.filter(x => !x.perPerson && x.parameters.unit === TimeUnit.DAY && x.parameters.coverage === PriceCoverage.ALLIN);
    return parameters.map(item => ({
      title: 'price_model.DAY.priceTitle',
      price: `${currencyCatalog.byId[item.parameters.unitPrice.currency].symbol}${item.parameters.unitPrice.value} per day`, // TODO: hardcoded text
      offerText: '10% off',
    }));
  }

  getMonthlyOptions = () => {
    return [];
  }

  getFlatRateOptions = () => {
    return [];
  }

  getPackageOptions = () => {
    const parameters = this.asset.products.filter(x => !!x.perPerson).map(item => ({
      title: 'Package: ' + item.name,
      price: `${cash(item.parameters.unitPrice)} per person`, // TODO: hardcoded text
    }));
    return parameters;
  }

  getOptionsProps = (): RoomPriceAndPackagesProps => {
    return {
      title: this.page.options.title,
      options: [
        ...this.getHourlyProducts(),
        ...this.getHalfdayProducts(),
        ...this.getDailyProducts(),
        ...this.getMonthlyOptions(),
        ...this.getFlatRateOptions(),
        ...this.getPackageOptions(),
      ],
    };
  }
}

const asInfo = (asset: Asset, category: ProductCategory) => {
  const alias = asset.aliases.first(x => x.category === category) || { description: '', name: '' };
  return {
    owner_first_name: 'Preston', // TODO: hardcoded
    owner_last_name: 'Johns', // TODO: hardcoded
    owner_img_src: '', // TODO: hardcoded
    response_rate: '99',
    response_time: 'room.within_an_hour',
    description: alias.description,
    venue_city: asset.location.address.city,
    venue_name: alias.name,
    vertical_id: 1, // TODO: investigate the roomSummaryInfo component
  };
};

const asRoomLocation = (unitSystem: UnitSystem) => ({ nearbyPlaces, coords }: Location) => ({
  around: nearbyPlaces.orderBy(x => x.distance.value).map(asRoomLocationPlace(unitSystem)),
  lat: coords.lat.toFixed(4),
  lon: coords.lng.toFixed(4),
  nearest: nearbyPlaces.orderBy(x => x.distance.value).take(1).map(asRoomLocationPlace(unitSystem)).first(),
});

const asRoomLocationPlace = (unitSystem: UnitSystem) => ({ name, distance: { value, unit } }: NearbyPlace): { name: string; distance: string } => ({
  name,
  distance: walkDistance(unitSystem, unit === 'FEET' ? value * 0.3048 : value),
});
