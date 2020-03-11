/* tslint:disable:max-line-length */
import { action, computed, observable } from 'mobx';

// Core
import { DependentModel, uid } from '@src/core';
import { AssetImageEdge, ListingsV1Space, VenueImageTypes } from '@src/core/domain';
import { spaceKindCatalog } from '@src/core/meta';

// Models
import { VenueModel } from '@src/components/Listing/Models';

// type VenueImageSection = {
//   productCategoryId: ProductCategory | null;
//   productCategory?: ProductCategoryMeta;
//   spaces: ListingsV1Space[];
//   items: AssetImageEdge[];
//   //  usually a clone of one of the items
//   currentClone?: AssetImageEdge;
//   currentOriginal?: AssetImageEdge;
// };

class VenueImageModel extends DependentModel<VenueModel> {

  @computed get venueImages() {
    return this.images.filter(x => x.image.type === VenueImageTypes.ASSET).orderBy(x => x.orderIndex);
  }

  @computed get foodImages() {
    return this.images.filter(x => x.image.type === VenueImageTypes.FOOD).orderBy(x => x.orderIndex);
  }

  @computed get venue() {
    return this.parent.venue;
  }

  @observable images: AssetImageEdge[] = [];
  @observable currentOriginal: AssetImageEdge = null;
  @observable currentEdit: AssetImageEdge = null;

  @observable venueImageErrors: Array<{ result: string }> = [];
  @observable spaceImageErrors: Array<{ id: string; name: string; result: string }> = [];

  @action load = async () => {
    const venueImages = this.venue && this.venue.images || [];
    this.images = venueImages.clone();
  }

  validateVenueImages = () => {
    const errors = [];
    if (this.venueImages.length === 0) {
      errors.push({ result: 'validation.required' });
    }
    this.venueImageErrors = errors;
  }

  validateSpaceImages = () => {
    const errors = [];
    this.parent.spaces.forEach(space => {
      if (spaceKindCatalog.byId[space.kind].enablePictures && space.images.length === 0) {
        errors.push({
          id: space.id,
          name: space.name,
          result: 'validation.required',
        });
      }
    });
    this.spaceImageErrors = errors;
  }

  // @action sectionItemMove = (section: VenueImageSection, from: number, to: number) => {
  //   section.items.move(from, to);
  //   section.items.forEach((i, k) => i.orderIndex = k);
  // }

  @action editCurrent = (image: AssetImageEdge) => {
    this.currentOriginal = image;
    this.currentEdit = this.cloneRx(image);
  }

  @action cancelCurrent = () => {
    this.currentEdit = null;
    this.currentOriginal = null;
  }

  @action submitCurrent = () => {
    this.currentEdit = null;
    this.currentOriginal = null;
  }

  fileRead = (file: File, callback: (file: File, dataUrl: string) => void) => async (e: any) => {
    if (!callback) {
      return;
    }
    const { target: { result } } = e;
    callback(file, result);
  }

  readFiles = (files: File[], callback: (file: File, dataUrl: string) => void) => {
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = this.fileRead(file, callback);
      reader.readAsDataURL(file);
    });
  }

  generateNewImage = (id: string, file: File, imageType: VenueImageTypes) => {
    return {
      id,
      file,
      type: imageType,
    };
  }

  showImage = (id: string, dataUrl: string, imageType: VenueImageTypes, orderIndex: number) => {
    return {
      orderIndex,
      image: {
        id,
        type: imageType,
        tags: [],
        urls: {
          largeUrl: dataUrl,
          originalUrl: dataUrl,
          thumbUrl: dataUrl,
        },
      },
    };
  }

  generateVenueImage = (file: File, dataUrl: string, imageType: VenueImageTypes, orderIndex: number) => {
    const id = uid();
    const img = this.showImage(id, dataUrl, imageType, orderIndex);
    this.images.push(img);
    this.parent.submitVenueImage(this.generateNewImage(id, file, imageType));
  }

  generateSpaceImage = (file: File, dataUrl: string, imageType: VenueImageTypes, orderIndex: number, space: ListingsV1Space) => {
    const id = uid();
    const img = this.showImage(id, dataUrl, imageType, orderIndex);
    space.images.push(img);
    this.parent.submitSpaceImage(this.generateNewImage(id, file, imageType), space);
  }

  @action addVenueImages(files: File[], imageType: VenueImageTypes) {
    this.readFiles(files, async (file, dataUrl) => {
      this.generateVenueImage(file, dataUrl, imageType, this.images.filter(x => x.image.type === imageType).length);
    });
  }

  @action addSpaceImages(space: ListingsV1Space, files: File[]) {
    this.readFiles(files, async (file, dataUrl) => {
      this.generateSpaceImage(file, dataUrl, VenueImageTypes.ASSET, space.images.length, space);
    });
  }

  @action changeVenueImageOrder = (images: AssetImageEdge[], oldIndex: number, newIndex: number) => {
    this.changeImageOrder(images, oldIndex, newIndex);
    this.parent.submitVenue();
  }

  @action changeSpaceImageOrder = (space: ListingsV1Space, oldIndex: number, newIndex: number) => {
    this.changeImageOrder(space.images, oldIndex, newIndex);
    this.parent.saveSpace(space);
  }

  changeImageOrder = (images: AssetImageEdge[], oldIndex: number, newIndex: number) => {
    const clone = images.clone().orderBy(x => x.orderIndex);
    clone.move(oldIndex, newIndex);
    clone.forEach((i, k) => this.applyChanges(i, { orderIndex: k }));
  }

  @action removeVenueImage = (images: AssetImageEdge[], target: AssetImageEdge) => {
    this.removeImage(images, target);
    this.images.remove(target);
    this.parent.submitVenue();
  }

  @action removeSpaceImage = (space: ListingsV1Space, target: AssetImageEdge) => {
    this.removeImage(space.images, target);
    this.parent.saveSpace(space);
  }

  removeImage = (images: AssetImageEdge[], target: AssetImageEdge) => {
    images.remove(target);
    images.orderBy(x => x.orderIndex).forEach((i, k) => this.applyChanges(i, { orderIndex: k }));
  }
}

export default VenueImageModel;
