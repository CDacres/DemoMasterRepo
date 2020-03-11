import gql from 'graphql-tag';
import * as T from './types/fetchListingsData';
import { assetFieldsFragment } from './assetFields';
import { useQuery } from '../../../';
import { ListingsV1VenueAndSpaces } from '@src/core/domain';
import transformOutput from './transformers/output';

const fetchListingsDataQuery = gql`
  query fetchListingsData($args: ListingsVenuesArgs!) {
    listingsVenues(args: $args) {
      asset { ...assetFields }
      details { venueTypeId }
      spaces {
        tableCount
        asset { ...assetFields }
        details { styles }
      }
    }
  }
  ${assetFieldsFragment}
`;

export const fetchListingsData = useQuery<
  Ref, ListingsV1VenueAndSpaces[],
  T.fetchListingsDataVariables, T.fetchListingsData
>({
  query: fetchListingsDataQuery,
  transformInput: humanRef => ({ args: { humanRef } }),
  transformOutput,
});
