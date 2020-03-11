import { Busy, CatalogItem, Ref } from '.';

type CatalogMap<T extends CatalogItem<Ref>> = Record<Ref, T>;

export class Catalog<T extends CatalogItem<Ref> = CatalogItem<Ref>> extends Busy {
  items: T[] = [];
  byId: CatalogMap<T> = {};

  withItems(items: T[]) {
    this.items = items;
    // toMap
    this.byId = items.reduce((m, i) => {
      m[i.id] = i;
      return m;
    }, {});
    return this;
  }
}
