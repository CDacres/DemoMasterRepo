import { action, computed, observable } from 'mobx';

// Core
import { Catalog, DependentModel } from '@src/core';
import { SpaceStyle, StyleMeta } from '@src/core/domain';
import { styleCatalog } from '@src/core/meta';

// Models
import { SpaceModel } from '@src/components/Listing/Models';

class SpaceStyleModel extends DependentModel<SpaceModel> {

  @observable style: SpaceStyle = null;

  styleMeta: Catalog<StyleMeta> = styleCatalog;

  @computed get styleItemsSource() {
    const kind = this.parent.kind;
    if (!kind) {
      return [];
    }
    return this.styleMeta.items.filter(x => x.spaceKind === kind.id);
  }

  @computed get visible() {
    return this.styleItemsSource.any();
  }

  @action
  setStyle = (styleId: SpaceStyle) => {
    this.style = styleId;
  }

  @action load = async () => {
    // this.style = (this.parent.space.styles || []).first();
  }

  @action create = async () => {
    this.style = null;
  }

  asInput = () => {
    return !this.style ? [this.style] : [];
  }
}

export default SpaceStyleModel;
