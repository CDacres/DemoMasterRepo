import gql from 'graphql-tag';
import * as T from './types/uploadImage';
import { NewFile } from '@src/core/domain';
import { useMutation } from '../../';
import { mutationResultFragment, MutationResult } from '../sharedFragments';

const uploadImageMutation = gql`
  mutation uploadImage($input: UploadImageInput!) {
    uploadImage(input: $input) {
      ...mutationResultFragment
    }
  }
  ${mutationResultFragment}
`;

type UploadImageInput = T.uploadImageVariables;
type UploadImageOutput = T.uploadImage;

export const uploadImage = useMutation<
NewFile, MutationResult,
UploadImageInput, UploadImageOutput>({
    mutation: uploadImageMutation,
    transformInput: input => ({ input: { file: input.file, image: { id: input.id, type: input.type } } }),
    transformOutput: result => result.uploadImage,
  });
