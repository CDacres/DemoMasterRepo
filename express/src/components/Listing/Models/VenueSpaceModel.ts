/* tslint:disable:max-line-length */
import { action, computed, observable, toJS } from 'mobx';

// Core
import { Catalog, DependentModel, Errors, ModelMode, Ref, uid, validate, Validator } from '@src/core';
import { ListingsV1Space, ListingsV1Venue, PriceCoverage, Product, ProductCategory, ProductCategoryMeta, SpaceGroup, TimeUnit, VenuePackage } from '@src/core/domain';
import { productCategoryCatalog } from '@src/core/meta';

// Models
import { SpaceModel, VenueModel } from '@src/components/Listing/Models';

class VenueSpaceModel extends DependentModel<VenueModel> {

  @computed get currency() {
    return this.parent.currency;
  }

  @observable spaceModel: SpaceModel = null;

  @observable spaces: ListingsV1Space[] = [];
  @observable venue: ListingsV1Venue = null;
  @observable packages: VenuePackage[] = [];
  @observable groups: SpaceGroup[] = [];

  @observable venueSpaceErrors: Array<{ result: string }> = [];

  categoryMeta: Catalog<ProductCategoryMeta> = productCategoryCatalog;

  @observable packageCurrent: VenuePackage;
  @observable packageDeletionConfirm: VenuePackage;

  @observable packageMode?: ModelMode = null;

  constructor(parent: VenueModel) {
    super(parent);
    this.venue = this.parent.venue;
  }

  @action addSpace = async () => {
    const addSpaceModel = new SpaceModel('new', this);
    await addSpaceModel.setup();
    this.spaceModel = addSpaceModel;
  }

  @action editSpace = async (spaceId: Ref) => {
    const editSpaceModel = new SpaceModel(spaceId, this);
    await editSpaceModel.setup();
    this.spaceModel = editSpaceModel;
  }

  @action closeSpace = () => {
    this.spaceModel = null;
  }

  validateVenueSpaces = () => {
    const errors = [];
    if (this.parent.spaces.length === 0) {
      errors.push({ result: 'validation.required' });
    }
    this.venueSpaceErrors = errors;
  }

  @action packageCreate = (category: ProductCategory) => {
    const pkg: VenuePackage = {
      id: uid(),
      category,
      currency: this.currency,
      description: '',
      name: '',
      delegatePrice: 0,
      includes: [],
    };
    this.packageCurrent = pkg;
    this.packageMode = 'CREATE';
  }

  @action packageEdit = (entry: VenuePackage) => {
    this.packageCurrent = this.cloneRx(entry);
    this.packageMode = 'UPDATE';
  }

  @action packageDelete = (entry: VenuePackage) => {
    this.packageDeletionConfirm = entry;
  }

  @action packageDeletionConfirmCancel = () => {
    this.packageDeletionConfirm = null;
  }

  @action packageDeletionConfirmSubmit = () => {
    if (this.packageDeletionConfirm !== null) {
      const grp = this.groups.first(x => x.productCategory.id === this.packageDeletionConfirm.category);
      const local = this.packages.find(x => x.id === this.packageDeletionConfirm.id);
      if (local) {
        this.packages.remove(local);
        if (grp) {
          const gl = grp.packages.first(x => x.id === this.packageDeletionConfirm.id);
          if (gl) {
            grp.packages.remove(this.packageDeletionConfirm);
          }
        }
      } else if (grp) {
        grp.packages.remove(this.packageDeletionConfirm);
      }
      this.packageDeletionConfirm = null;
    }
  }

  @action packageCancel = () => {
    this.packageCurrent = null;
    this.packageMode = null;
  }

  @action packageSubmit = () => {
    const changes = toJS(this.packageCurrent);

    const grp = this.groups.first(x => x.productCategory.id === changes.category);

    const local = this.packages.find(x => x.id === changes.id);
    if (local) {
      this.applyChanges(local, changes);
      if (grp) {
        const gl = grp.packages.first(x => x.id === changes.id);
        if (gl) {
          this.applyChanges(gl, changes);
        }
      }
    } else if (grp) {
      grp.packages.push(changes);
      this.packages.push(changes);
    }
    this.packageCurrent = null;
    this.packageMode = null;
  }

  validatePackage = (entry: VenuePackage): Errors<VenuePackage> => {
    return validate(entry, packageValidator);
  }

  @action create = async () => {
    this.spaces = this.parent.spaces;
    this.venue = this.parent.venue;
  }

  @action load = async () => {
    this.spaces = this.parent.spaces;
    this.venue = this.parent.venue;
    const packages = this.parent.venue && this.parent.venue.packages || [];
    this.packages = packages.filter(x => !!x.parameters).map(({ id, description, name, category, includes, parameters }) =>
    ({
      id,
      description,
      name,
      category: category ? category : null,
      currency: this.currency,
      delegatePrice: parameters ? parameters.unitPrice.value : null,
      includes,
    }));
    const availableCategories = this.spaces.map(x => x.category).distinct();
    const spacesByCategory = this.spaces.orderBy(x => x.name).clusterBy(x => x.category);
    const packagesByCategory = this.packages.clusterBy(x => x.category);
    this.groups = this.categoryMeta.items.pair(availableCategories, x => x.id, x => x).map(x => x.left).map(category => ({
      productCategory: category,
      spaces: spacesByCategory[category.id] || [],
      packages: packagesByCategory[category.id] || [],
    }));
  }

  asPackageInput = () => {
    const packages: Product[] = this.packages.map(i => ({
      id: i.id,
      description: i.description,
      name: i.name,
      includes: i.includes.map(({ description }, ix) =>
        ({ description, orderIndex: ix + 1 })),
      category: i.category,
      parameters: {
        unit: TimeUnit.DAY,
        unitPrice: { currency: i.currency, value: i.delegatePrice },
        coverage: PriceCoverage.ALLIN,
      },
    }));
    return packages;
  }
}

const validatePriceAmount = (value: number) => {
  if (!value) {
    return ['validation.required'];
  } else if (value <= 0) {
    return ['validation.price_invalid'];
  }
  return null;
};

const packageValidator: Validator<VenuePackage> = {
  name: (i) => !i.name ? ['validation.required'] : null,
  delegatePrice: (i) => validatePriceAmount(i.delegatePrice),
};

export default VenueSpaceModel;
