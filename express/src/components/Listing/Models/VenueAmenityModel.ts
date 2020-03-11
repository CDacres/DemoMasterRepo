/* tslint:disable:max-line-length */
import { action, computed, observable } from 'mobx';

// Core
import { Catalog, DependentModel, Ref } from '@src/core';
import { AmenityGroupMeta, AmenityMeta, AmenitySection, ListingsV1VenueAmenityEdgeInput, ProductCategoryMeta, VenueAmenity, ListingsV1Space } from '@src/core/domain';
import { amenityCatalog, amenityGroupCatalog, amenitySectionCatalog, productCategoryCatalog } from '@src/core/meta';

// Models
import { VenueModel } from '@src/components/Listing/Models';

class VenueAmenityModel extends DependentModel<VenueModel> {

  @observable venueAmenities: VenueAmenity[] = [];
  amenitySectionMeta: Catalog<AmenitySection> = amenitySectionCatalog;
  amenityGroupMeta: Catalog<AmenityGroupMeta> = amenityGroupCatalog;
  amenityMeta: Catalog<AmenityMeta> = amenityCatalog;
  categoryMeta: Catalog<ProductCategoryMeta> = productCategoryCatalog;

  @action load = async () => {
    const currency = this.currency;

    const amenities = this.parent.venue && this.parent.venue.amenities || [];
    this.venueAmenities = this.amenityMeta.items
      .pairLeft(amenities, x => x.id, x => x.amenityId)
      .map(({ left, right: r }) =>
        ({
          amenity: left,
          isActive: r && r.isActive || false,
          note: r && r.note || '',
          price: r && r.price || { currency, value: 0 },
          excludedSpaces: r && r.excludedSpaces || [],
        }))
      .map(a => ({ ...a, restrictAvailability: a.excludedSpaces.length > 0 }));
  }

  @action create = async () => {
    const currency = this.currency;
    this.venueAmenities = this.amenityMeta.items.map(x => ({
      amenity: x,
      isActive: false,
      note: '',
      price: { currency, value: 0 },
      restrictAvailability: false,
      excludedSpaces: [],
    }));
  }

  markSpacesDirty = () => {
    this.parent.setSpacesDirty();
  }

  asAmenityInputs = () => {
    const amenities: ListingsV1VenueAmenityEdgeInput[] = this.venueAmenities
      .filter(item => item.isActive)
      .map(({
        amenity, excludedSpaces,
        price: { currency, value },
        note, isActive, restrictAvailability,
      }) => ({
        note,
        isActive,
        excludedSpaces: restrictAvailability ? excludedSpaces : [],
        amenityId: amenity.id,
        price: (typeof value !== 'undefined' && value !== 0) ? { currency, value } : null,
      }));
    return amenities;
  }

  @computed get currency() {
    return this.parent.currency;
  }

  @computed get spaces() {
    const spaces: ListingsV1Space[] = [];
    const availableCategories = this.parent.spaces.map(x => x.category).distinct();
    const spacesByCategory = this.parent.spaces.clusterBy(x => x.category);
    this.categoryMeta.items.pair(availableCategories, x => x.id, x => x).map(x => x.left).map(category => ({
      spaces: spacesByCategory[category.id] || [],
    })).forEach(category => {
      category.spaces.forEach(space => {
        spaces.push(space);
      });
    });
    return spaces;
  }

  @computed get amenityGroups() {
    const inUseCategories = this.spaces.map(x => x.category).distinct();
    const amenityGroupMap = this.amenityGroupMeta.byId;

    const byGroup = this.venueAmenities
      .map(x => ({ amenity: x.amenity, link: x }))
      .clusterBy(x => x.amenity.amenityGroupId);

    return this.amenityMeta.items
      .filter(a =>
        !a.inProductCategories || inUseCategories.any(c => a.inProductCategories.contains(c)))
      .map(x => x.amenityGroupId)
      .distinct()
      .map(x => ({
        amenityGroup: amenityGroupMap[x],
        items: byGroup[x] || [],
      })).map(({ amenityGroup, items }) => ({
        amenityGroup,
        items,
        summary: items.filter(x => x.link.isActive),
        maxReached: amenityGroup.enabledMaxCount > 0 ? items.filter(x => x.link.isActive).length >= amenityGroup.enabledMaxCount : false,
      }));
  }

  @action toggleAmenityRestriction = (entry: VenueAmenity) => {
    entry.restrictAvailability = !entry.restrictAvailability;
  }

  @action linkVenueAmenity = (amenity: VenueAmenity, spaceId: Ref, available: boolean) => {
    this.markSpacesDirty();
    if (available) {
      if (!amenity.excludedSpaces.contains(spaceId)) {
        amenity.excludedSpaces.remove(spaceId);
      }
    } else {
      amenity.excludedSpaces.push(spaceId);
    }
  }

  @action toggleVenueAmenity = (amenityId: Ref, enabled: boolean) => {
    if (enabled) {
      this.addVenueAmenity(amenityId);
    } else {
      this.removeVenueAmenity(amenityId);
    }
  }

  @action addVenueAmenity = (amenityId: Ref) => {
    let venueAmenity = this.findVenueAmenity(amenityId);
    if (venueAmenity) {
      venueAmenity.isActive = true;
    } else {
      venueAmenity = {
        amenity: this.amenityMeta.byId[amenityId],
        excludedSpaces: [],
        price: { currency: this.currency, value: 0 },
        isActive: true,
      };
      this.venueAmenities.push(venueAmenity);
    }
  }

  findVenueAmenity = (amenityId: Ref) => this.venueAmenities.find(x => x.amenity.id === amenityId);

  @action removeVenueAmenity = (amenityId: Ref) => {
    const venueAmenity = this.findVenueAmenity(amenityId);
    if (venueAmenity) {
      venueAmenity.isActive = false;
    }
  }
}

export default VenueAmenityModel;
