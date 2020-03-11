import gqlListingsToLocal from './gqlListingsToLocal';
import { fetchListingsData } from '../../types/fetchListingsData';
import { ListingsV1VenueAndSpaces } from '@src/core/domain';

export default (result: fetchListingsData): ListingsV1VenueAndSpaces[] => {
  return result.listingsVenues ? result.listingsVenues.filter(x => !!x).map(gqlListingsToLocal) : [];
};
