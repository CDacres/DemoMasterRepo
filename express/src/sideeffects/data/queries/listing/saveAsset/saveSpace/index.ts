import gql from 'graphql-tag';
import * as T from './types/saveSpace';
import { useMutation } from '../../../../';
import { transformInput, RequiredSpace as RS } from './transformers';
import { mutationResultFragment, MutationResult } from '../../../sharedFragments';

const saveSpaceMutation = gql`
  mutation saveSpace($input: SpaceInput!) {
    upsertSpace(input: $input) {
      ...mutationResultFragment
    }
  }
  ${mutationResultFragment}
`;

export type RequiredSpace = RS;

export default useMutation<RequiredSpace, MutationResult, T.saveSpaceVariables, T.saveSpace>({
  mutation: saveSpaceMutation,
  transformInput,
  transformOutput: result => result.upsertSpace,
});
