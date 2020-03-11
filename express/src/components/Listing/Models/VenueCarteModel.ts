/* tslint:disable:max-line-length */
import { action, computed, observable } from 'mobx';

// Core
import { Catalog, DependentModel, uid } from '@src/core';
import { CarteGroupMeta, CarteItem, CarteMenu, Menu, MenuInput, MenuItemInput, MenuPriceOptionsInput } from '@src/core/domain';
import { carteGroupCatalog } from '@src/core/meta';

// Models
import { VenueModel } from '@src/components/Listing/Models';

class VenueCarteModel extends DependentModel<VenueModel> {

  @observable carteItems: CarteItem[] = [];
  @observable menus: CarteMenu[] = [];

  carteGroupMeta: Catalog<CarteGroupMeta> = carteGroupCatalog;

  @observable menuErrors: Array<{ carteMenu: CarteMenu; item: CarteItem; result: string[] }> = null;

  isCarteMenu = (menu: Menu) => {
    return !menu.priceOptions || menu.priceOptions.length === 0;
  }

  @action create = async () => {
    const carteMenu = {
      id: uid(),
      description: '',
      priceOptions: [],
      groups: [{
        description: '',
        orderIndex: 0,
        items: [],
      }],
    };
    this.menus = this.fromMenu(carteMenu);
  }

  @action load = async () => {
    const menus = this.parent.venue && this.parent.venue.menus || [];
    const carteMenu: MenuInput = menus.first(this.isCarteMenu) || {
      description: '',
      priceOptions: [],
      groups: [],
    };
    this.menus = this.fromMenu(carteMenu);
  }

  @computed get currency() {
    return this.parent.currency;
  }

  fromMenu = (menu: MenuInput): CarteMenu[] => {
    const menus = this.carteGroupMeta.items.pairLeft(menu.groups,
      x => x.description,
      x => x.description
    ).map(({ left, right }): CarteMenu => ({
      carteGroup: left,
      items: (!!right && right.items || [])
        .map((ii: MenuItemInput): CarteItem => ({
          description: ii.description,
          orderIndex: ii.orderIndex,
          price: (typeof ii.priceOptions.first(x => x.kind === 'STD').price !== 'undefined' && ii.priceOptions.first(x => x.kind === 'STD').price !== null ? ii.priceOptions.first(x => x.kind === 'STD').price.value : 0) || 0,
          // happyPrice: (typeof ii.priceOptions.first(x => x.kind === 'HAPPY').price !== 'undefined' && ii.priceOptions.first(x => x.kind === 'HAPPY').price !== null ? ii.priceOptions.first(x => x.kind === 'HAPPY').price.value : 0) || 0,
        })),
    }));
    return menus;
  }

  asMenuInputs = () => {
    const currency = this.currency;
    const menu: MenuInput = {
      description: 'listing.food_and_drinks',
      priceOptions: [],
      groups: this.menus.map((g, k) => ({
        description: g.carteGroup.description,
        orderIndex: k,
        items: (g.items || []).map((gi) => ({
          description: gi.description,
          orderIndex: gi.orderIndex,
          priceOptions: [
            this.getStdPriceOption(gi.price, currency),
            // this.getHappyPriceOption(gi.happyPrice, currency),
          ],
        })),
      })),
    };
    return [menu];
  }

  getStdPriceOption = (price, currency) => {
    const option: MenuPriceOptionsInput = {
      kind: 'STD',
      description: 'STANDARD',
    };
    if (price !== 0) {
      option.price = {
        currency: currency,
        value: price,
      };
    }
    return option;
  }

  // getHappyPriceOption = (price, currency) => {
  //   const option: MenuPriceOptionsInput = {
  //     kind: 'HAPPY',
  //     description: 'HAPPY',
  //   };
  //   if (price !== 0) {
  //     option.price = {
  //       currency: currency,
  //       value: price,
  //     };
  //   }
  //   return option;
  // }

  validateMenus = () => {
    const errors = [];
    this.menus.forEach(menu => {
      menu.items.forEach(item => {
        if (item.price < 0) {
          errors.push({
            carteMenu: menu,
            item: item,
            result: ['validation.price_invalid'],
          });
        }
      });
    });
    this.menuErrors = errors;
  }

  @action addCarteItem = (group: CarteMenu, description: string) => {
    group.items.push({
      description,
      price: 0,
      // happyPrice: 0,
      orderIndex: group.items.length,
      // isFixed:
    });
  }

  @action removeCarteItem = (menu: CarteMenu, item: CarteItem) => {
    menu.items.remove(item);
  }
}

export default VenueCarteModel;
