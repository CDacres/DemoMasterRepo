/* tslint:disable:max-line-length */
import { action, computed, observable } from 'mobx';

// Core
import { Catalog, DependentModel, uid } from '@src/core';
import { AmenityGroup, AmenityGroupMeta, AmenityMeta, ProductCategory, VenueAmenity } from '@src/core/domain';
import { amenityCatalog, amenityGroupCatalog } from '@src/core/meta';

// Models
import { SpaceModel } from '@src/components/Listing/Models';

class SpaceCuisineModel extends DependentModel<SpaceModel> {

  amenityGroup: AmenityGroupMeta = amenityGroupCatalog.items.first(x => x.id === AmenityGroup.CUISINE);
  amenityMeta: Catalog<AmenityMeta> = amenityCatalog;

  @observable items: VenueAmenity[] = [];

  @computed get enabled() {
    return this.parent.firstSpace && this.parent.mode === 'CREATE' && !!this.parent.space && this.parent.space.category === ProductCategory.DINING;
  }

  @action create = async () => {
    this.items = this.amenityMeta.items
      .filter(x => x.amenityGroupId === AmenityGroup.CUISINE)
      .map(i => ({
        id: uid(),
        excludedSpaces: [],
        amenity: i,
        isActive: false,
      } as VenueAmenity));
  }

  @computed get enabledCount() {
    return this.items.count(i => i.isActive);
  }

  @computed get enabledMaxCount() {
    return this.amenityGroup.enabledMaxCount || 0;
  }

  @computed get enabledMaxReached() {
    return !!this.enabledMaxCount && this.enabledCount === this.enabledMaxCount;
  }

  @computed get currency() {
    return this.parent.currency;
  }

  asAmenityInputs = () => {
    return this.enabled
      ? this.items.map(({
        amenity: { id },
        isActive,
      }) => ({
        id: uid(),
        amenityId: id,
        excludedSpaces: [],
        isActive,
      })) : [];
  }
}

export default SpaceCuisineModel;
