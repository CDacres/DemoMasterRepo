/* tslint:disable:max-line-length */
import { action, computed, observable } from 'mobx';

// Core
import { Catalog, Currency, DependentModel, Errors, priceOrderNatural, uid, validate, Validator } from '@src/core';
import { BookingRestraintsInput, CurrencyAmountInput, DailyHours, dayEnsureSpans, dayEvenSpans, dayToggleOpen, PeopleBookingRestraintsInput, PriceCoverage, PriceModel, PriceModelMeta, Product, ProductCategory, ProductCategoryMeta, ProductPrice, resolvePriceModelExperimental, SpendBookingRestraintsInput, Term, TimeBookingRestraintsInput, validateHours } from '@src/core/domain';
import { dayOfWeekCatalog, productCategoryCatalog, priceModelCatalog, termCatalog } from '@src/core/meta';

// Models
import { SpaceModel } from '@src/components/Listing/Models';

class SpacePriceModel extends DependentModel<SpaceModel> {
  priceModelMeta: Catalog<PriceModelMeta> = priceModelCatalog;
  categoryMeta: Catalog<ProductCategoryMeta> = productCategoryCatalog;
  termMeta: Catalog<Term> = termCatalog;

  @observable showAvailablePrices: boolean = false;

  @observable priceDeletionConfirm: ProductPrice;
  @observable pricesByCategory: Record<ProductCategory, ProductPrice[]>;

  @observable priceErrors: Array<{ price: ProductPrice; result: Errors<ProductPrice> }> = null;
  @observable priceScheduleErrors: Array<{ day: DailyHours; span: number; result: string[] }> = null;

  @computed get currency() {
    return this.parent.currency;
  }

  @computed get category() {
    return this.parent.category;
  }

  @computed get allowedPriceModels() {
    const category = this.category;
    if (!category || !category.userModels || !category.standardModels) {
      return [];
    }
    return [
      ...category.standardModels,
      ...category.userModels,
    ].distinct()
      .map(x => this.priceModelMeta.byId[x]);
  }

  @computed get standardPriceModels() {
    const category = this.category;
    if (!category || !category.standardModels) {
      return [];
    }
    return category.standardModels.map(x => this.priceModelMeta.byId[x]);
  }

  @computed get userPriceModels() {
    const category = this.category;
    if (!category || !category.userModels || !category.standardModels) {
      return null;
    }
    return category.userModels.map(x => this.priceModelMeta.byId[x]);
  }

  @computed get enabledPrices() {
    return this.parent.kind.enablePrices;
  }

  @computed get canAddPrice() {
    return this.userPriceModels.any();
  }

  @computed get allowedPrices() {
    return this.pricesByCategory[this.category.id];
  }

  asBookingInputs = () => {
    const currency = this.currency;
    const inputs: Product[] = this.allowedPrices.filter(x => (typeof x.unitPrice.value !== 'undefined' && x.unitPrice.value !== 0) || (typeof x.minSpendAmount !== 'undefined' && typeof x.minSpendAmount !== 'undefined' && x.minSpendAmount !== 0)).map(({
      unitPrice, unit,
      coverage, schedule, minPax, maxPax, minDuration, maxDuration, minSpendAmount,
      depositAmount,
      depositPercent, id, name,
    }) => {
      const calculatedUnitPrice: CurrencyAmountInput = unitPrice.value ? { currency: unitPrice.currency, value: unitPrice.value } : null;
      const calculatedDepositAmount: CurrencyAmountInput = depositAmount ? { currency, value: depositAmount } : null;
      const calculatedConstraints: BookingRestraintsInput = this.calculateConstraints(minPax, maxPax, minDuration, maxDuration, currency, minSpendAmount);
      return {
        id: id ? id : uid(),
        name,
        category: this.category.id,
        parameters: {
          unitPrice: calculatedUnitPrice,
          schedule: schedule,
          unit,
          coverage,
          minPax,
          maxPax,
          minDuration,
          maxDuration,
          depositAmount: calculatedDepositAmount,
          depositPercent,
          minSpendAmount,
          constraints: calculatedConstraints,
        },
      };
    });
    return inputs;
  }

  calculateConstraints = (minPax: number, maxPax: number, minDuration: number, maxDuration: number, currency: Currency, minSpendAmount: number): BookingRestraintsInput => {
    const guests: PeopleBookingRestraintsInput = (minPax || maxPax) ? { minPax, maxPax } : null;
    const duration: TimeBookingRestraintsInput = (minDuration || maxDuration) ? { minDuration, maxDuration } : null;
    const spend: SpendBookingRestraintsInput = minSpendAmount ? { minSpendAmount: { currency, value: minSpendAmount } } : null;
    const constraints: BookingRestraintsInput = (!guests && !duration && !spend) ? null : {
      guests,
      duration,
      spend,
    };
    return constraints;
  }

  @action create = async () => {
    const prices = [];
    this.pricesByCategory = this.categoryMeta.items
      .reduce((c, category) => {
        c[category.id] = this.onlyAllowed(
          this.withStandard(prices, category.standardModels),
          [
            ...category.standardModels,
            ...category.userModels,
          ]);
        return c;
      }, {} as Record<ProductCategory, ProductPrice[]>);
  }

  onlyAllowed = (prices: ProductPrice[], allowedModels: PriceModel[]): ProductPrice[] => {
    return prices.filter(x => allowedModels.contains(x.model));
  }

  withStandard = (prices: ProductPrice[], standardModels: PriceModel[]): ProductPrice[] => {
    const result = [...prices];
    const currency = this.currency;

    for (const pm of standardModels) {
      const priceModel = this.priceModelMeta.byId[pm];
      let price = prices.first(x => x.model === pm);
      if (!price) {
        price = {
          unitPrice: { currency, value: 0 },
          ...priceModel.add.priceDef,
          name: `listing.${pm}_priceTitle`,
        };
        result.push(price);
      }
    }
    return result;
  }

  asProductPrice = (price: Product): ProductPrice => {
    const currency = this.currency;
    const parameters = price.parameters;
    const guests = parameters.constraints && parameters.constraints.guests || { minPax: 0, maxPax: 0 };
    const duration = parameters.constraints && parameters.constraints.duration || { minDuration: 0, maxDuration: 0 };
    const spend = parameters.constraints && parameters.constraints.spend || { minSpendAmount: { value: 0 } };
    const unitPrice = parameters.unitPrice || { currency, value: 0 };
    const modelName = resolvePriceModelExperimental(parameters);

    const result: ProductPrice = {
      model: modelName,
      unit: parameters.unit,
      unitPrice: unitPrice,
      coverage: parameters.coverage,

      schedule: parameters.schedule,

      minSpendAmount: spend.minSpendAmount.value,

      ...guests,
      ...duration,

      name: price.name,
      id: price.id,

      depositAmount: parameters.depositAmount && parameters.depositAmount.value || 0,
      depositPercent: parameters.depositPercent,
    };
    return result;
  }

  @action load = async () => {

    const prices = priceOrderNatural(this.parent.space.prices).map(this.asProductPrice);

    // fan out per category copies of prices
    this.pricesByCategory = this.categoryMeta.items
      .reduce((c, category) => {
        c[category.id] = this.onlyAllowed(
          this.withStandard(prices, category.standardModels),
          [
            ...category.standardModels,
            ...category.userModels,
          ]);
        return c;
      }, {} as Record<ProductCategory, ProductPrice[]>);
  }

  allowDelete = (price: ProductPrice) => {
    const category = this.category;
    if (!category) {
      return false;
    }
    if ((price.coverage !== PriceCoverage.MINIMUMSPEND && price.unitPrice !== null && (typeof price.unitPrice.value === 'undefined' || price.unitPrice.value === 0)) || (price.coverage === PriceCoverage.MINIMUMSPEND && (typeof price.minSpendAmount === 'undefined' || price.minSpendAmount === 0))) {
      return false;
    }
    const priceModel = price.model;
    if (!category.standardModels.contains(priceModel)) {
      return true;
    }
    const isFirstOfStandard = this.prices.first(x => x.model === priceModel) === price;
    return !isFirstOfStandard;
  }

  @computed get prices() {
    const category = this.category;
    if (!category) {
      return [];
    }
    return this.pricesByCategory[category.id];
  }

  @action priceAdd = (priceModel: PriceModelMeta) => {
    const currency = this.currency;
    this.prices.push({
      unitPrice: { currency, value: 0 },
      ...priceModel.add.priceDef,
      name: `listing.${priceModel.id}_priceTitle`,
    });
  }

  @action priceDelete = (price: ProductPrice) => {
    this.priceDeletionConfirm = price;
  }

  @action priceDeletionConfirmCancel = () => {
    this.priceDeletionConfirm = null;
  }

  @action priceDeletionConfirmSubmit = () => {
    if (this.priceDeletionConfirm !== null) {
      this.prices.remove(this.priceDeletionConfirm);
      this.priceDeletionConfirm = null;
    }
  }

  get defaultSchedule() {
    const openingHours = this.parent.venue.openingHours;
    const days: DailyHours[] = dayOfWeekCatalog.items.pairLeft(openingHours, x => x.id, x => x.day)
      .map(({ key, right }) => ({
        day: key,
        spans: right && right.spans && right.spans.map(({ start, end }) => ({ start, end })) || [],
      }));
    return { days };
  }

  @action priceScheduleToggle = (price: ProductPrice, bespoke: boolean) => {
    if (bespoke) {
      price.schedule = this.defaultSchedule;
    } else {
      price.schedule = null;
    }
  }

  validatePrices = () => {
    const priceErrors = [];
    let priceScheduleErrors = [];
    this.prices.forEach(price => {
      const result = validate(price, priceValidator);
      if (result !== null) {
        priceErrors.push({
          price: price,
          result: result,
        });
      }
      if (price.schedule) {
        priceScheduleErrors = validateHours(price.schedule.days);
      }
    });
    this.priceErrors = priceErrors;
    this.priceScheduleErrors = priceScheduleErrors;
  }

  @action dayEnsureSpans = (day: DailyHours, count: number) => dayEnsureSpans(day, count);
  @action dayEvenSpans = (day: DailyHours) => dayEvenSpans(day);
  @action dayToggleOpen = (day: DailyHours) => dayToggleOpen(day);
}

const validateDurations = (minDuration: number, maxDuration: number) => {
  if (minDuration && minDuration !== 0 && maxDuration && maxDuration !== 0 && minDuration > maxDuration) {
    return ['validation.monthly_terms_invalid'];
  }
  return null;
};

// const validateOpeningHours = (schedule: ProductPriceSchedule) => {
//   if (schedule) {
//     const result = validateHours(schedule.days);
//     if (result.length > 0) {
//       return result;
//     }
//     return null;
//   }
//   return null;
// };

const validatePrice = (price) => {
  if (price.coverage === PriceCoverage.MINIMUMSPEND) {
    return validatePriceAmount(price.minSpendAmount);
  }
  return validatePriceAmount(price.unitPrice.value);
};

const validatePriceAmount = (value: number) => {
  if (value < 0) {
    return ['validation.price_invalid'];
  }
  return null;
};

const priceValidator: Validator<ProductPrice> = {
  minDuration: (i) => validateDurations(i.minDuration, i.maxDuration),
  minSpendAmount: (i) => validatePrice(i),
  // schedule: (i) => validateOpeningHours(i.schedule),
  unitPrice: (i) => validatePrice(i),
};

export default SpacePriceModel;
