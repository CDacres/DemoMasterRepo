/* tslint:disable:max-line-length */
import { action, observable, reaction } from 'mobx';

// Core
import { Area, AreaUnit, Catalog, DependentModel, Errors, validate, Validator } from '@src/core';
import { AssetCapacity, ConfigurationKind, ConfigurationKindMeta, SpaceConfiguration, SpaceKind } from '@src/core/domain';
import { configurationKindCatalog } from '@src/core/meta';

// Models
import { SpaceModel } from '@src/components/Listing/Models';

class SpaceCapacityModel extends DependentModel<SpaceModel> {
  @observable items: SpaceConfiguration[] = [];
  @observable visibleItems: SpaceConfiguration[] = [];

  @observable expanded: boolean = false;
  @observable hasMore: boolean = false;

  configurationKindMeta: Catalog<ConfigurationKindMeta> = configurationKindCatalog;

  @observable officeMaxPax?: number;
  @observable floorSize?: number;
  @observable floorSizeUnit?: AreaUnit;
  @observable configurations: SpaceConfiguration[] = [];

  @observable capacityErrors: Array<{ config: SpaceConfiguration; result: Errors<SpaceConfiguration> }> = null;
  @observable areaErrors: Errors<Area> = null;

  constructor(parent: SpaceModel) {
    super(parent);

    reaction(() => this.parent.kind, () => this.updateArrangement());
  }

  @action expand = () => {
    if (!this.hasMore) {
      return;
    }
    this.hasMore = false;
    this.visibleItems = this.items;
  }

  @action load = async () => {
    const capacity = this.parent.space.capacity;

    if (!!capacity) {
      this.floorSize = capacity.area && capacity.area.value || 0;
      this.floorSizeUnit = capacity.area && capacity.area.unit || AreaUnit.M2;
      const officeConfig = capacity.configurations.first(x => x.kind === ConfigurationKind.SEATED);
      this.officeMaxPax = officeConfig && officeConfig.maxPax || 1;
    } else {
      this.floorSize = 0;
      this.floorSizeUnit = AreaUnit.M2;
      this.officeMaxPax = 1;
    }

    this.configurations = this.configurationKindMeta.items.pairLeft((this.parent.space.capacity.configurations || []), x => x.id, x => x.kind).map(({ key, right }) =>
      ({ kind: key, isActive: !!right, maxPax: right && right.maxPax || 1 }));

    this.updateArrangement();
  }

  @action create = async () => {
    this.floorSize = 0;
    this.floorSizeUnit = AreaUnit.M2;
    this.officeMaxPax = 1;
    this.configurations = this.configurationKindMeta.items.map(({ id }) => ({ kind: id, isActive: false, maxPax: 1 }));
    this.updateArrangement();
  }

  asInput = () => {
    const capacity: AssetCapacity = {
      area: {
        value: this.floorSize,
        unit: this.floorSizeUnit,
      },
      configurations: this.items.filter(f => f.isActive).map(({ kind, maxPax }) => ({ kind, maxPax })),
    };
    if (this.parent.kind && this.parent.kind.id === SpaceKind.OFFICE_PRIVATE) {
      capacity.configurations.push({ kind: ConfigurationKind.SEATED, maxPax: this.officeMaxPax });
    }
    return capacity;
  }

  validateCapacity = () => {
    const errors = [];
    this.asInput().configurations.forEach(config => {
      const result = validate(config, configurationValidator);
      if (result !== null) {
        errors.push({
          config: config,
          result: result,
        });
      }
    });
    this.capacityErrors = errors;
  }

  validateArea = () => {
    if (this.parent.kind && this.parent.kind.id === SpaceKind.OFFICE_PRIVATE) {
      this.areaErrors = validate(this.asInput().area, areaValidator);
    }
  }

  @action
  private updateArrangement = () => {
    const kind = this.parent.kind;

    this.visibleItems = [];
    this.items = [];
    this.hasMore = false;
    this.expanded = false;

    if (!kind || !kind.arrangement || !kind.arrangement.configurationKinds) {
      return;
    }

    const { arrangement, arrangement: { showExpandAfter } } = kind;

    const items = arrangement.configurationKinds.pair(this.configurations, x => x, x => x.kind).map(i => i.right);

    this.visibleItems = items.count(x => x.isActive) > 0 ? (showExpandAfter > 0 ? items.filter(x => x.isActive).concat(items.filter(x => !x.isActive)).take(showExpandAfter) : items) : (showExpandAfter > 0 ? items.take(showExpandAfter) : items);

    this.hasMore = this.visibleItems.length < items.length;

    this.items = items;
  }
}

const validatePax = (value: number) => {
  if (value <= 0) {
    return ['validation.capacity_invalid'];
  }
  return null;
};

const validateSize = (value: number) => {
  if (value <= 0) {
    return ['validation.size_invalid'];
  }
  return null;
};

const configurationValidator: Validator<SpaceConfiguration> = {
  maxPax: (i) => validatePax(i.maxPax),
};

const areaValidator: Validator<Area> = {
  value: (i) => validateSize(i.value),
};

export default SpaceCapacityModel;
