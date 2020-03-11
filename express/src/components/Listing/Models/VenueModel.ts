/* tslint:disable:max-line-length no-console */
import { action, computed, observable } from 'mobx';
import isURL from 'validator/lib/isURL';

// Core
import { Catalog, Currency, DayOfWeek, Errors, Model, Ref, uid, validate, Validator } from '@src/core';
import { ListingsV1Space, ListingsV1Venue, ListingsV1VenueAndSpaces, MenuInput, NewFile, VenueType, TagCatalogItem } from '@src/core/domain';
import { spaceKindCatalog, venueTypeCatalog } from '@src/core/meta';

// Models
import { SpaceTagModel, VenueAmenityModel, VenueCarteModel, VenueImageModel, VenueLocationModel, VenuePlanModel, VenueSetMenuModel, VenueSpaceModel } from '@src/components/Listing/Models';

export interface SideEffectsInterface {
  fetchListingsData: (arg: Ref) => Promise<ListingsV1VenueAndSpaces[]>;
  fetchTagReference: () => Promise<TagCatalogItem[]>;
  uploadImage: (newFile: NewFile) => Promise<boolean>;
  saveSpace: (entireVenue: ListingsV1VenueAndSpaces, spaceId: Ref) => Promise<boolean>;
  saveVenue: (entireVenue: ListingsV1VenueAndSpaces) => Promise<boolean>;
  scrollPage: () => Promise<boolean>;
  finish: () => Promise<boolean>;
}

class VenueModel extends Model {

  @computed get canProceed() {
    return this.currentStep <= this.lastStep;
  }

  @computed get canBack() {
    return this.currentStep > 0;
  }

  @computed get currency(): Currency {
    return this.venue && this.venue.currency;
  }

  @observable ready: boolean = false;

  repo: SideEffectsInterface;
  principalId?: Ref;

  lastStep = 3;
  stepError = [];
  @observable currentStep: number = 0;
  @observable amenityTab: number = 0;

  @observable showScheduleConflict: boolean = false;
  @observable showSpaceTags: boolean = false;
  @observable currentSpaceForTags: ListingsV1Space = null;
  @observable tagModel: SpaceTagModel = null;

  @observable venue: ListingsV1Venue = null;
  @observable venueErrors: Errors<ListingsV1Venue> = null;

  @observable spaces: ListingsV1Space[] = [];
  @observable tags: TagCatalogItem[] = [];

  venueTypeMeta: Catalog<VenueType> = venueTypeCatalog;

  locationBloc: VenueLocationModel = null;
  planBloc: VenuePlanModel = null;
  spaceBloc: VenueSpaceModel = null;
  imageBloc: VenueImageModel = null;
  amenityBloc: VenueAmenityModel = null;
  carteBloc: VenueCarteModel = null;
  setMenuBloc: VenueSetMenuModel = null;
  spacesAreDirty: boolean = false;

  @observable websiteError: string[] = [];

  isNew: boolean = false;

  constructor(repo: SideEffectsInterface) {
    super();
    this.repo = repo;
    this.children.push(this.locationBloc = new VenueLocationModel(this));
    this.children.push(this.planBloc = new VenuePlanModel(this));
    this.children.push(this.spaceBloc = new VenueSpaceModel(this));
    this.children.push(this.imageBloc = new VenueImageModel(this));
    this.children.push(this.amenityBloc = new VenueAmenityModel(this));
    this.children.push(this.carteBloc = new VenueCarteModel(this));
    this.children.push(this.setMenuBloc = new VenueSetMenuModel(this));
  }

  setup = async (humanRef: Ref): Promise<VenueModel> => {

    let initialData: ListingsV1VenueAndSpaces | null = null;

    if (humanRef !== 'new' && humanRef !== null) {
      const result = await this.repo.fetchListingsData(humanRef);
      if (result.length > 1) {
        console.log(`Loading failed with message: "${result.length} results for humanRef ${humanRef}"`); // TODO: error handling
      } else if (result.length === 1) {
        initialData = result[0];
      }
    }

    let hydrate = () => null;

    if (initialData) {
      hydrate = this.loaderFactory(initialData);
    } else {
      this.isNew = true;
      this.principalId = uid();
      hydrate = this.create;
    }

    await this.dispatchInit().then(hydrate);

    if (!this.isNew) {
      if (!this.validateBasicStep()) {
        this.stepError.push(0);
      }
      if (!this.validateSpaceStep()) {
        this.stepError.push(1);
      }
      if (!this.validateImageStep()) {
        this.stepError.push(2);
      }
      if (!this.validateAmenityStep()) {
        this.stepError.push(3);
      }
    }

    this.repo.fetchTagReference().then(result => this.tags = result);

    this.ready = true;
    return this;
  }

  fetchTagReference = (): TagCatalogItem[] => {
    return this.tags;
  }

  loaderFactory = (data: ListingsV1VenueAndSpaces) => {
    this.venue = data.venue;
    this.spaces = data.spaces;
    return this.load;
  }

  removeStepError = (index: number) => {
    const errorKey = this.stepError.indexOf(index);
    if (errorKey !== -1) {
      this.stepError.splice(errorKey, 1);
    }
  }

  validateVenue = () => {
    const validBasicStep = this.validateBasicStep();
    if (validBasicStep) {
      this.removeStepError(0);
    }
    const validSpaceStep = this.validateSpaceStep();
    if (validSpaceStep) {
      this.removeStepError(1);
    }
    const validImageStep = this.validateImageStep();
    if (validImageStep) {
      this.removeStepError(2);
    }
    const validAmenityStep = this.validateAmenityStep();
    if (validAmenityStep) {
      this.removeStepError(3);
    }
    if (this.currentStep === 1) {
      return (validBasicStep && validSpaceStep && validAmenityStep);
    }
    return (validBasicStep && validAmenityStep);
  }

  validateBasicStep = () => {
    this.venueErrors = validate(this.venue, venueValidator);
    this.locationBloc.validateAddress();
    this.planBloc.validateOpeningHours();
    return (this.venueErrors === null && this.locationBloc.addressErrors === null && this.planBloc.openingHoursErrors.length === 0);
  }

  validateSpaceStep = () => {
    this.spaceBloc.validateVenueSpaces();
    return (this.spaceBloc.venueSpaceErrors.length === 0);
  }

  validateImageStep = () => {
    this.imageBloc.validateVenueImages();
    this.imageBloc.validateSpaceImages();
    return (this.imageBloc.venueImageErrors.length === 0 && this.imageBloc.spaceImageErrors.length === 0);
  }

  validateAmenityStep = () => {
    this.carteBloc.validateMenus();
    return (this.carteBloc.menuErrors.length === 0);
  }

  setSpacesDirty = () => {
    this.spacesAreDirty = true;
  }

  setSpacesClean = () => {
    this.spacesAreDirty = false;
  }

  @action proceed = async () => {
    if (this.currentStep === this.lastStep) {
      this.amenityTab = 1;
    } else if (this.currentStep < this.lastStep) {
      this.amenityTab = 0;
      this.currentStep++;
    }
  }

  @action back = async () => {
    if (this.currentStep === this.lastStep && this.amenityTab === 1) {
      this.amenityTab = 0;
    } else if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  @action saveVenue = async (proceed: boolean) => {
    if (!this.validateVenue()) {
      return;
    }
    const success = await this.submitVenue();
    if (success) {
      if (this.isNew) {
        this.isNew = false;
      }
      if (proceed) {
        if (this.currentStep === this.lastStep && this.amenityTab === 1) {
          await this.repo.finish();
        } else {
          await this.repo.scrollPage();
        }
        this.proceed();
      }
    }
  }

  @action editSpaceTags = (model: SpaceTagModel, space: ListingsV1Space) => {
    this.tagModel = model;
    this.showSpaceTags = true;
    this.currentSpaceForTags = space;
  }

  @action closeSpaceTagDialog = () => {
    this.currentSpaceForTags = null;
    this.tagModel = null;
    this.showSpaceTags = false;
  }

  @action submitSpaceTags = async () => {
    if (this.currentSpaceForTags !== null) {
      const space = this.currentSpaceForTags;
      space.tags = this.tagModel.asInput();
      const input = this.buildInput();
      this.venue = input.venue;
      this.spaces = input.spaces;
      const success = await this.repo.saveSpace(input, space.id);
      if (success) {
        this.showSpaceTags = false;
        this.currentSpaceForTags = null;
      }
    }
  }

  @action submitVenue = async () => {
    const input = this.buildInput();
    this.venue = input.venue;
    const saveSuccess = await this.repo.saveVenue(input);
    if (this.spacesAreDirty) {
      this.saveSpaces();
    }
    if (saveSuccess) {
      this.loaderFactory(input)();
    } else {
      // TODO: error handling
    }
    return saveSuccess;
  }

  @action submitVenueImage = (image: NewFile) => {
    this.saveImage(image);
    this.submitVenue();
  }

  @action submitSpaceImage = (image: NewFile, space: ListingsV1Space) => {
    this.saveImage(image);
    this.saveSpace(space);
  }

  saveImage = (image: NewFile) => {
    const uploadSuccess = this.repo.uploadImage(image);
    if (!uploadSuccess) {
      // TODO: error handling
    }
  }

  saveSpaces = () => {
    this.spaces.filter(x => spaceKindCatalog.byId[x.kind].assetType !== 'VENUE').forEach((space: ListingsV1Space) => this.saveSpace(space));
    this.setSpacesClean();
  }

  @action submitSpace = async (space: ListingsV1Space) => {
    this.upsertLocalSpace(space);
    await this.saveSpace(space);
  }

  saveSpace = async (space: ListingsV1Space) => {
    const input = this.buildInput();
    this.venue = input.venue;
    this.spaces = input.spaces;
    const success = await this.repo.saveSpace(input, space.id);
    if (success) {
      this.loaderFactory(input)();
      this.spaceBloc.closeSpace();
    } else {
      // TODO: error handling
    }
  }

  @action upsertLocalSpace = (space: ListingsV1Space) => {
    const needle = this.spaces.findIndex(search => search.id === space.id);
    if (needle !== -1) {
      this.spaces.splice(needle, 1, space);
    } else {
      this.spaces.push(space);
    }
  }

  buildInput = () => {
    const location = this.locationBloc.asLocationInput();
    const openingHours = this.planBloc.asDailyHoursInput();
    const packages = this.spaceBloc.asPackageInput();
    const amenities = this.amenityBloc.asAmenityInputs();
    const images = this.imageBloc.images;
    const menus: MenuInput[] = [
      ...this.setMenuBloc.asMenuInputs(),
      ...this.carteBloc.asMenuInputs(),
    ];

    const input: ListingsV1VenueAndSpaces = {
      venue: {
        ...this.venue,
        openingHours,
        location,
        packages,
        menus,
        amenities,
        images,
      },
      spaces: this.spaces,
    };
    return input;
  }

  @action cancelConflict = () => {
    this.showScheduleConflict = false;
  }

  @action confirmScheduleConflict = async () => {
    await this.proceed();
  }

  @action setCurrency = (currencyCode: Currency) => {
    this.venue.currency = currencyCode;
  }

  create = async () => {
    this.venue = {
      id: this.principalId,
      location: {
        address: {
          formattedAddress: '',
          street: '',
          countryCode: '',
        },
        coords: {
          lat: 51.4697499,
          lng: -0.2073111,
        },
        nearbyPlaces: [],
        specialInstructions: '',
      },
      venueTypeId: null,
      description: '',
      name: '',
      currency: Currency.GBP,
      amenities: [],
      packages: [],
      images: [],
      menus: [],
      website: '',
      openingHours: [
        {
          day: DayOfWeek.MONDAY,
          spans: [
            {
              end: 1080,
              start: 540,
            },
          ],
        },
        {
          day: DayOfWeek.TUESDAY,
          spans: [
            {
              end: 1080,
              start: 540,
            },
          ],
        },
        {
          day: DayOfWeek.WEDNESDAY,
          spans: [
            {
              end: 1080,
              start: 540,
            },
          ],
        },
        {
          day: DayOfWeek.THURSDAY,
          spans: [
            {
              end: 1080,
              start: 540,
            },
          ],
        },
        {
          day: DayOfWeek.FRIDAY,
          spans: [
            {
              end: 1080,
              start: 540,
            },
          ],
        },
        {
          day: DayOfWeek.SATURDAY,
          spans: [],
        },
        {
          day: DayOfWeek.SUNDAY,
          spans: [],
        },
      ],
    };
    await this.dispatchCreate();
  }

  @action load = async () => {
    await this.dispatchLoad();
  }

  @action changeStep = (value: number) => {
    this.currentStep = value;
  }

  @action formatWebsite = () => {
    let website = this.venue.website;
    this.websiteError = null;
    if (!website) {
      return;
    }
    if (!website.startsWith('http')) {
      website = 'http://' + website;
    }
    this.venue.website = website;
    this.websiteError = validateWebsite(website);
  }
}

const validateWebsite = (url: string) => {
  if (!url) {
    return null;
  }
  const invalid = ['validation.website_invalid'];
  if (!isURL(url)) {
    return invalid;
  }
  return null;
};

const venueValidator: Validator<ListingsV1Venue> = {
  name: (i) => !i.name ? ['validation.required'] : null,
  description: (i) => !i.description ? ['validation.required'] : null,
  venueTypeId: (i) => !i.venueTypeId ? ['validation.required'] : null,
  website: (i) => validateWebsite(i.website),
};

export default VenueModel;
