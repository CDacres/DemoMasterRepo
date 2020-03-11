import { action, computed, observable } from 'mobx';

// Core
import { Catalog, DependentModel, Errors, GeoLocation, validate } from '@src/core';
import { Country, Address, LocationInput } from '@src/core/domain';
import { addressMeta, AddressTemplate, countryCatalog } from '@src/core/meta';

// Models
import { VenueModel } from '@src/components/Listing/Models';

// Api
import { findNearbyPlaces, findPlace } from '@src/api';

class VenueLocationModel extends DependentModel<VenueModel> {
  @observable expanded: boolean = false;

  country: Catalog<Country> = countryCatalog;
  topCountries: Country[] = [
    'GB',
    'IE',
    'FR',
    'DE',
    'US',
  ].pair(this.country.items, x => x, x => x.id).map(x => x.right);

  @observable addressErrors: Errors<Address> = null;

  // we ensure we don't annoy the customer with location requests
  _getCurrentLocationInvoked: boolean = false;
  _currentLocation: any = null;

  @computed get address() {
    return this.venue.location.address;
  }

  @computed get countryCode() {
    return this.address.countryCode;
  }

  @action setCountryCode = (countryCode: string) => {
    const country = this.findCountry(countryCode);
    this.applyChanges(this.address, {
      autocomplete: '',
      city: '',
      country: (country && (country.native || country.description)) || '',
      countryCode,
      county: '',
      formattedAddress: '',
      placeId: '',
      postcode: '',
      street: '',
      streetNumber: '',
      town: '',
    });

    if (!!country.currency) {
      this.parent.setCurrency(country.currency);
    }
  }

  @computed get meta() {
    return addressMeta[this.countryCode] || addressMeta.def;
  }

  @computed get currency() {
    return this.parent.currency;
  }

  findCountry = (countryCode: string) => {
    const country = !!this.country ? this.country.byId[countryCode] : null;
    return !!country ? country : null;
  }

  @action create = async () => {
    this.expand();
  }

  @action expand = () => {
    this.expanded = true;
  }

  @computed get venue() {
    return this.parent.venue;
  }

  @computed get countryDisplay() {
    if (!this.country || !this.countryCode) {
      return null;
    }
    const country = this.findCountry(this.countryCode);
    return (country && (country.native || country.description)) || null;
  }

  validateAddress = () => {
    this.addressErrors = validate(this.venue.location.address, addressValidation(this.meta));
  }

  @action getCurrentLocation = (callbackFn: (e: any) => void) => {

    if (!!this._currentLocation && !!callbackFn) {
      callbackFn(this._currentLocation);
    }
    if (this._getCurrentLocationInvoked) {
      return;
    }
    this._getCurrentLocationInvoked = true;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        this._currentLocation = pos;
        if (!!callbackFn) {
          callbackFn(this._currentLocation);
        }
      });
    }
  }

  @action setLocationCoords = async (coords: GeoLocation) => {
    const nearbyPlaces = await findNearbyPlaces(coords);
    this.applyChanges(this.venue.location, { coords, nearbyPlaces });
  }

  @action setLocationStreet = async (autocomplete: string, placeId: string) => {
    this.venue.location.address.autocomplete = autocomplete;
    this.venue.location.address.placeId = placeId;
    if (!!placeId) {
      try {
        const previousLocation = this.venue.location;
        const location = await findPlace(placeId);
        if (!location) {
          return;
        }
        this.venue.location = location;
        this.venue.location.address.autocomplete = previousLocation.address.autocomplete;
        this.venue.location.specialInstructions = previousLocation.specialInstructions;
      } catch (e) {
        this.setCountryCode(this.venue.location.address.countryCode);
      }
      try {
        const nearbyPlaces = await findNearbyPlaces(this.venue.location.coords);
        if (!nearbyPlaces) {
          return;
        }
        this.venue.location.nearbyPlaces = nearbyPlaces;
      } catch (e) {
        // console.log('something went wrong', e);
      }
    }
  }

  asLocationInput = () => {
    const {
      location: {
        address,
        coords,
        nearbyPlaces,
        specialInstructions,
      },
    } = this.venue;

    const location: LocationInput = {
      address: {
        autocomplete: address.autocomplete,
        city: address.city,
        country: address.country,
        countryCode: address.countryCode,
        county: address.county,
        extra: address.extra,
        formattedAddress: address.formattedAddress,
        placeId: address.placeId,
        postcode: address.postcode,
        streetNumber: address.streetNumber,
        street: address.street,
        town: address.town,
      },
      coords: {
        lat: coords.lat,
        lng: coords.lng,
      },
      nearbyPlaces: nearbyPlaces && nearbyPlaces.map(
        ({ name, distance, types }) => ({
          name,
          distance: {
            unit: distance.unit,
            value: distance.value,
          },
          types,
        })) || [],
      specialInstructions,
    };
    return location;
  }
}

const addressValidation = (meta: AddressTemplate) => ({
  countryCode: (i) => meta.requiredFields.contains('countryCode') && !i.countryCode ? ['validation.required'] : null,
  city: (i) => meta.requiredFields.contains('city') && !i.city ? ['validation.required'] : null,
  street: (i) => meta.requiredFields.contains('street') && !i.street ? ['validation.required'] : null,
  postcode: (i) => meta.requiredFields.contains('postcode') && !i.postcode ? ['validation.required'] : null,
  extra: (i) => meta.requiredFields.contains('extra') && !i.extra ? ['validation.required'] : null,
  county: (i) => meta.requiredFields.contains('county') && !i.county ? ['validation.required'] : null,
});

export default VenueLocationModel;
