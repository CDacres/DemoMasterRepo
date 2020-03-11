import { action, computed, observable, toJS } from 'mobx';

// Core
import { DependentModel, Errors, ModelMode, uid, validate, Validator } from '@src/core';
import { Menu, MenuInput, SetMenu, SetMenuSection } from '@src/core/domain';
import { setMenuSectionCatalog } from '@src/core/meta';

// Models
import { VenueModel } from '@src/components/Listing/Models';

class VenueSetMenuModel extends DependentModel<VenueModel> {

  @computed get currency() {
    return this.parent.currency;
  }

  @observable items: SetMenu[] = [];

  @observable menuCurrent: SetMenu;
  @observable menuDeletionConfirm: SetMenu;

  @observable menuMode?: ModelMode = null;

  constructor(parent: VenueModel) {
    super(parent);
  }

  @action menuCreate = () => {
    const menu: SetMenu = {
      id: uid(),
      description: '',
      groups: setMenuSectionCatalog.items.map(x => ({ section: x.id, items: [] })),
      price: 0,
    };
    this.menuCurrent = menu;
    this.menuMode = 'CREATE';
  }

  @action menuEdit = (entry: SetMenu) => {
    this.menuCurrent = this.cloneRx(entry);
    this.menuMode = 'UPDATE';
  }

  @action menuDelete = (entry: SetMenu) => {
    this.menuDeletionConfirm = entry;
  }

  @action menuDeletionConfirmCancel = () => {
    this.menuDeletionConfirm = null;
  }

  @action menuDeletionConfirmSubmit = () => {
    if (this.menuDeletionConfirm !== null) {
      const local = this.items.find(x => x.id === this.menuDeletionConfirm.id);
      if (local) {
        this.items.remove(local);
      }
      this.menuDeletionConfirm = null;
    }
  }

  @action menuCancel = () => {
    this.menuCurrent = null;
    this.menuMode = null;
  }

  @action menuSubmit = () => {
    const changes = toJS(this.menuCurrent);
    const local = this.items.find(x => x.id === changes.id);
    if (local) {
      this.applyChanges(local, changes);
    } else {
      this.items.push(changes);
    }
    this.menuCurrent = null;
    this.menuMode = null;
  }

  isSetMenu = (menu: Menu) => {
    return !!menu.priceOptions && menu.priceOptions.length === 1;
  }

  load = async () => {
    const menus = this.parent.venue && this.parent.venue.menus || [];

    const resolveSection = (description: string) => {
      switch (description) {
        case SetMenuSection.STARTER:
        case SetMenuSection.MAIN:
        case SetMenuSection.DESSERT:
          return description as SetMenuSection;
        default:
          return SetMenuSection.SIDE;
      }
    };

    this.items = menus.filter(this.isSetMenu).map(({ description, priceOptions, groups }) => ({
      id: uid(),
      description,
      price: priceOptions.first().price.value,
      groups: groups.map((g) => ({
        section: resolveSection(g.description),
        items: g.items.map(({ description: newDescription, orderIndex }) =>
          ({ description: newDescription, orderIndex })).orderBy(x => x.orderIndex),
      })).orderBy(x => setMenuSectionCatalog.byId[x.section].orderIndex),
    }));
  }

  asMenuInputs = () => {
    const menus: MenuInput[] = this.items.map((i) => ({
      description: i.description,
      priceOptions: [{
        kind: 'STD',
        description: 'STANDARD',
        price: { currency: this.currency, value: i.price },
      }],
      groups: i.groups.map((g, xi) => ({
        description: g.section,
        orderIndex: xi,
        items: g.items.map(({ description }, orderIndex) => ({
          description,
          orderIndex,
          priceOptions: [],
        })),
      })),
    }));
    return menus;
  }

  validateSetMenu = (menu: SetMenu): Errors<SetMenu> => {
    return validate(menu, setMenuValidator);
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

const setMenuValidator: Validator<SetMenu> = {
  description: (i) => !i.description ? ['validation.required'] : null,
  price: (i) => validatePriceAmount(i.price),
};

export default VenueSetMenuModel;
