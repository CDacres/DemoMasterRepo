import gql from 'graphql-tag';
import * as T from './types/saveVenue';
import { useMutation } from '../../../../';
import { ListingsV1VenueAndSpaces } from '@src/core/domain';
import { transformInput } from './transformers';
import { mutationResultFragment, MutationResult } from '../../../sharedFragments';

const saveVenueMutation = gql`
  mutation saveVenue($input: VenueInput!) {
    upsertVenue(input: $input) {
      ...mutationResultFragment
    }
  }
  ${mutationResultFragment}
`;

export default useMutation<ListingsV1VenueAndSpaces, MutationResult, T.saveVenueVariables, T.saveVenue>({
  mutation: saveVenueMutation,
  transformInput,
  transformOutput: result => result.upsertVenue,
});
