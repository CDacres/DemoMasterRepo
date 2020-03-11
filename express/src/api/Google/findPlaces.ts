/* tslint:disable:max-line-length */
import { GeoLocation, Length, LengthUnit } from '@src/core';
import { Location, NearbyPlace, NearbyPlaceType } from '@src/core/domain';
import { sphericalDistance, toLatLng } from './sphericalDistance';

let placesService = null;
// lazy init
const resolvePlaceService = () => {
  if (!placesService) {
    placesService = new google.maps.places.PlacesService(document.createElement('div'));
  }
  return placesService;
};

const getDetails = (placeId: string): Promise<google.maps.places.PlaceResult> => {
  const service = resolvePlaceService();
  return new Promise((resolve, reject) => {
    service.getDetails({
      placeId,
      fields: ['address_components', 'geometry.location', 'formatted_address'],
    }, (results, status) => {
      if (status !== google.maps.places.PlacesServiceStatus.OK) {
        reject(status);
      }
      resolve(results);
    });
  });
};

const nearbySearch = (query: { location: GeoLocation; type: string; rankBy: google.maps.places.RankBy }): Promise<google.maps.places.PlaceResult[]> => {
  const service = resolvePlaceService();
  return new Promise((resolve, reject) => {
    service.nearbySearch(query, (results, status) => {
      if (status !== google.maps.places.PlacesServiceStatus.OK) {
        reject(status);
      }
      resolve(results);
    });
  });
};

const asPlaceType = (type: string): NearbyPlaceType => {
  switch (type) {
    case 'subway_station':
      return NearbyPlaceType.SUBWAY_STATION;
    case 'train_station':
      return NearbyPlaceType.TRAIN_STATION;
    default:
      return null;
  }
};

export const findNearbyPlaces = async (location: GeoLocation, radius: number = 1000/*1609.34*/): Promise<NearbyPlace[]> => {
  const subway = {
    location,
    type: 'subway_station',
    rankBy: google.maps.places.RankBy.DISTANCE,
  };
  const train = {
    location,
    type: 'train_station',
    rankBy: google.maps.places.RankBy.DISTANCE,
  };

  const from = toLatLng(location);
  const dst = (to: google.maps.LatLng) => sphericalDistance(from, to);
  const nearby = await Promise.all([nearbySearch(subway), nearbySearch(train)]);

  return nearby
    .reduce((r, i) => r.concat(i || []), [])
    .map(i => ({
      name: i.name,
      distance: { value: dst(i.geometry.location), unit: LengthUnit.METER } as Length,
      types: i.types && i.types.map(asPlaceType).filter(t => !!t) || [],
    }))
    .filter(i => i.distance.value < radius)
    .groupBy(i => i.name)
    .map(i => i.items.orderBy(x => x.distance).first())
    .orderBy(i => i.distance.value)
    .slice(0, 4);
};

const find = (components: google.maps.GeocoderAddressComponent[], part: (i: google.maps.GeocoderAddressComponent) => string, ...targets: string[]) => {
  if (!components || !targets) {
    return null;
  }
  for (const target of targets) {
    const component = components.filter(x => x.types.contains(target)).map(part).first();
    if (!!component) {
      return component;
    }
  }
  return null;
};

export const findPlace = async (placeId: string): Promise<Location> => {
  const place = await getDetails(placeId);

  if (!place || !place.address_components || !place.geometry || !place.geometry.location) {
    return null;
  }
  const parts = place.address_components;

  const streetNumber = find(parts, x => x.long_name, 'street_number');
  const street = find(parts, x => x.long_name, 'route');
  const postcode = find(parts, x => x.long_name, 'postal_code');
  const county = find(parts, x => x.long_name, 'administrative_area_level_2');
  const city = find(parts, x => x.long_name, 'locality', 'postal_town');
  const town = city;
  const countryCode = find(parts, x => x.short_name, 'country');
  const country = find(parts, x => x.long_name, 'country');

  const coords = {
    lat: place.geometry.location.lat(),
    lng: place.geometry.location.lng(),
  };

  return {
    address: {
      formattedAddress: place.formatted_address,
      placeId,
      country,
      countryCode,
      county,
      city,
      town,
      postcode,
      street,
      streetNumber,
    },
    coords,
  };
};
