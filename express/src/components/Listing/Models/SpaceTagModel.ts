import { observable, computed, action } from 'mobx';

import { AssetTagEdge, ListingsV1Space, ProductCategory } from '@src/core/domain';
import { VenueModel } from '@src/components/Listing/Models';

export type ExtendedEdge = AssetTagEdge & { description: string };

class SpaceTagModel {
  parent: VenueModel = null;
  space: ListingsV1Space = null;
  @observable spaceTags: AssetTagEdge[] = [];

  constructor(parent: VenueModel, space: ListingsV1Space) {
    this.spaceTags = space.tags.map(live => ({ ...live }));
    this.parent = parent;
    this.space = space;
  }

  calculateAvailability = (tagId: Ref): boolean => {
    const spaceTag = this.spaceTags.find((edge) => edge.tagId === tagId);
    return spaceTag ? spaceTag.isActive : false;
  }

  @computed get items(): ExtendedEdge[] {
    return this.parent.fetchTagReference()
      .filter(i => i.productCategory === this.space.category)
      .sort((a, b) => { return b.orderIndex - a.orderIndex; })
      .map(i => ({
        tagId: i.tag.id,
        isActive: this.calculateAvailability(i.tag.id),
        description: i.tag.description,
      }));
  }

  @action markTagActivity = (tagId: Ref, isActive: boolean): void => {
    const spaceTag = this.spaceTags.find((edge) => edge.tagId === tagId);
    if (spaceTag) {
      spaceTag.isActive = isActive;
    } else {
      this.spaceTags.push({ tagId, isActive });
    }
  }

  get productCategory(): ProductCategory {
    return this.space.category;
  }

  edit = (): void => this.parent.editSpaceTags(this, this.space);

  asInput = (): AssetTagEdge[] => {
    return this.spaceTags.map(stage => ({ ...stage }));
  }
}

export default SpaceTagModel;
