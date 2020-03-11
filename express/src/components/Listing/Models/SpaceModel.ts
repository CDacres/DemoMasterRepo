/* tslint:disable:max-line-length */
import { action, computed, observable } from 'mobx';

// Core
import { AreaUnit, Catalog, DependentModel, EntryMode, Errors, Ref, uid, validate, Validator } from '@src/core';
import { ListingsV1Space, ListingsV1Venue, ProductCategory, ProductCategoryMeta, SpaceKind, SpaceKindMeta } from '@src/core/domain';
import { productCategoryCatalog, spaceKindCatalog } from '@src/core/meta';

// Models
import { SpaceCapacityModel, SpaceCuisineModel, SpacePriceModel, VenueSpaceModel } from '@src/components/Listing/Models';
// SpaceStyleModel

class SpaceModel extends DependentModel<VenueSpaceModel> {

  readonly firstSpace: boolean = false;
  readonly principalId?: Ref = null;
  readonly mode: EntryMode = 'CREATE';

  // only changed after load or on ctor
  @observable venueId?: Ref = null;

  @computed get currency() {
    return this.parent.currency;
  }

  @observable isTypeExpanded: boolean = false;

  @observable space: ListingsV1Space = null;
  @observable venue: ListingsV1Venue;
  @observable spaceErrors: Errors<ListingsV1Space> = null;
  @observable spacePriceError: string[] = [];
  @observable spaceCapacityError: string[] = [];

  productCategoryMeta: Catalog<ProductCategoryMeta> = productCategoryCatalog;
  spaceKindMeta: Catalog<SpaceKindMeta> = spaceKindCatalog;

  priceBloc: SpacePriceModel;
  cuisineBloc: SpaceCuisineModel;
  capacityBloc: SpaceCapacityModel;
  // styleBloc: SpaceStyleModel;

  constructor(principalId: Ref, parent: VenueSpaceModel) {

    super(parent);

    if (principalId === 'new') {
      this.mode = 'CREATE';
      this.principalId = uid();
    } else {
      this.mode = 'UPDATE';
      this.principalId = principalId;
    }

    this.firstSpace = !parent.spaces.any();

    this.children.push(this.priceBloc = new SpacePriceModel(this));
    // this.children.push(this.styleBloc = new SpaceStyleModel(this));
    this.children.push(this.cuisineBloc = new SpaceCuisineModel(this));
    this.children.push(this.capacityBloc = new SpaceCapacityModel(this));
  }

  @action setup = async () => {

    this.venue = this.parent.venue;

    this.venueId = this.venue.id;

    const mode = this.mode;
    await this.init();
    if (mode === 'UPDATE') {
      await this.load();
    } else {
      await this.create();
    }
  }

  @computed get title() {
    if (this.mode === 'CREATE') {
      return 'listing.add_a_space';
    } else {
      return 'listing.edit_your_space';
    }
  }

  @computed get category() {
    if (!this.space || !this.space.category) {
      return null;
    }
    return this.productCategoryMeta.byId[this.space.category];
  }

  @computed get kind() {
    if (!this.space || !this.space.kind) {
      return null;
    }
    return this.spaceKindMeta.byId[this.space.kind];
  }

  @computed get possibleSpaceTypes() {
    if (!this.space) {
      return [];
    }
    return this.spaceKindMeta.items.filter(x => x.category === this.space.category);
  }

  @computed get availableSpaceTypes() {
    if (!this.space) {
      return [];
    }
    return this.checkSiblingCount(this.space.category);
  }

  @action init = async () => {
    await this.dispatchInit();
  }

  @action load = async () => {
    this.isTypeExpanded = false;

    this.space = this.parent.spaces.first(space => space.id === this.principalId);

    await this.dispatchLoad();
  }

  @action create = async () => {
    this.isTypeExpanded = true;

    if (!this.venueId) {
      throw Error('Invalid venueId');
    }

    this.space = {
      id: uid(),
      venueId: this.venueId,
      name: '',
      description: '',

      // we want these props to be empty as we create a new space
      // no defaults
      category: null,
      kind: null,
      currency: this.currency,

      images: [],
      prices: [],
      // styles: [],
      capacity: {
        area: { unit: AreaUnit.M2, value: 0 },
        configurations: [],
      },
      instances: 0,
      tags: [],
    };

    await this.dispatchCreate();
  }

  checkSiblingCount = (category: ProductCategory) => {
    const siblingSpacesInCategory = this.parent.spaces.filter(s => s.category === category);
    if (siblingSpacesInCategory.length) {
      // this will only work if the max per venue is set to 1...
      const countTypeVenue = this.spaceKindMeta.items.filter(i => i.category === category && i.maxPerVenue === 1);
      if (countTypeVenue.length > 0) {
        const typeArr = [];
        countTypeVenue.forEach(type => {
          siblingSpacesInCategory.forEach(sibling => {
            if (type.id === sibling.kind) {
              typeArr.push(type.id);
            }
          });
        });
        this.spaceKindMeta.items.filter(x => x.category === category).forEach(item => {
          if (typeArr.includes(item.id)) {
            item.disabled = true;
          }
        });
      }
    }
    return this.spaceKindMeta.items.filter(x => x.category === category).sortBy(x => x.orderIndex || 0);
  }

  validateSpace = () => {
    let noPriceError = false;
    this.spacePriceError = [];
    let priceErrors = [];
    let priceScheduleErrors = [];
    let noCapacityError = false;
    this.spaceCapacityError = [];
    let capacityErrors = [];
    let areaErrors = null;
    this.spaceErrors = validate(this.space, spaceValidator);
    noPriceError = (this.kind && this.kind.priceRequired && this.priceBloc.asBookingInputs().length === 0);
    if (noPriceError) {
      this.spacePriceError = ['validation.missing_price'];
    } else {
      this.priceBloc.validatePrices();
      priceErrors = this.priceBloc.priceErrors;
      priceScheduleErrors = this.priceBloc.priceScheduleErrors;
    }
    noCapacityError = (this.kind && this.kind.arrangement && this.kind.arrangement.configurationKinds && this.capacityBloc.asInput().configurations.length === 0);
    if (noCapacityError) {
      this.spaceCapacityError = ['validation.missing_configuration'];
    } else {
      this.capacityBloc.validateCapacity();
      capacityErrors = this.capacityBloc.capacityErrors;
      this.capacityBloc.validateArea();
      areaErrors = this.capacityBloc.areaErrors;
    }
    return (this.spaceErrors === null && !noPriceError && priceErrors.length === 0 && priceScheduleErrors.length === 0 && !noCapacityError && capacityErrors.length === 0 && areaErrors === null);
  }

  @action submit = async () => {
    if (!this.validateSpace()) {
      return;
    }
    const prices = this.priceBloc.asBookingInputs();
    const capacity = this.capacityBloc.asInput();
    // const styles = this.styleBloc.asInput();

    const space: ListingsV1Space = {
      id: this.space.id,
      venueId: this.space.venueId,
      name: this.space.name,
      description: this.space.description,
      category: this.space.category,
      kind: this.space.kind,
      instances: this.space.instances,
      capacity,
      // styles,
      prices,
      currency: this.currency,
      images: this.space.images,
      tags: this.space.tags,
    };
    const amenities = this.cuisineBloc.enabled ? this.cuisineBloc.asAmenityInputs() : [];
    amenities.forEach(amenity => this.parent.parent.amenityBloc.toggleVenueAmenity(amenity.amenityId, amenity.isActive));
    await this.parent.parent.submitSpace(space);
    await this.parent.parent.submitVenue();
  }

  @action setProductCategory = (space: ListingsV1Space, category: ProductCategory) => {
    const kinds = this.checkSiblingCount(category);
    const changes: any = { category, kind: null };
    if (kinds.filter(x => !x.disabled).length === 1) {
      Object.assign(changes, { kind: kinds.filter(x => !x.disabled).first().id });
    }
    this.applyChanges(space, changes);
  }
}

const validateInstances = (space: ListingsV1Space) => {
  if (space.instances <= 0) {
    if (space.category === ProductCategory.OFFICE && (space.kind === SpaceKind.OFFICE_HOTDESK || space.kind === SpaceKind.OFFICE_DEDICATEDDESK)) {
      return ['validation.desk_stock_invalid'];
    } else if (space.kind === SpaceKind.PARTY_TABLE || space.kind === SpaceKind.DINING_TABLE) {
      return ['validation.capacity_invalid'];
    }
    return null;
  }
  return null;
};

const spaceValidator: Validator<ListingsV1Space> = {
  name: (i) => !i.name ? ['validation.required'] : null,
  description: (i) => !i.description ? ['validation.required'] : null,
  category: (i) => !i.category ? ['validation.required'] : null,
  kind: (i) => !i.kind ? ['validation.required'] : null,
  instances: (i) => validateInstances(i),
};

export default SpaceModel;
