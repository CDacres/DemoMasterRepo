import { googleApiKey } from './key';
import { GeoLocation, urlQuery } from '@src/core';

export const apiGeocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=${googleApiKey}`;

import axios from 'axios';

type GoogleLocation = {
  address_components: {
    long_name: string;
    short_name: string;
    types: string[];
  };
  formatted_address: string;
  geometry: {
    location: { lat: number; lng: number };
    location_type: string;
  };
  place_id: string;
  types: string[];
};

export const findGeoLocation = async (arg: {
  street?: string;
  extra?: string;
  city?: string;
  country?: string;
  postcode?: string;
  lat?: number;
  lng?: number;
}): Promise<GeoLocation> => {

  const { street, extra, city, country, postcode, lat, lng } = arg;

  const query: any = {};

  const address = [street, extra, city, postcode]
    .filter(x => x)
    .map(x => x.replace(/,/g, ' ').split(' ').filter(i => !!i).join('+'))
    .join('+');

  if (address) {
    Object.assign(query, { address });
  }
  if (lat && lng) {
    Object.assign(query, { latlng: `${lat},${lng}` });
  }
  if (Object.entries(query).length === 0) {
    return null;
  }

  if (country) {
    Object.assign(query, { region: country });
  }

  const url = urlQuery(apiGeocodeUrl, query);
  const results = await axios(url).then(x => x.data.results as GoogleLocation[]);
  // TODO: implement an ats null propagator so we can write some like
  // :D results.first()?.geometry?.location
  if (!results || results.length === 0 || !results[0].geometry) {
    return null;
  }
  return results[0].geometry.location;
};
