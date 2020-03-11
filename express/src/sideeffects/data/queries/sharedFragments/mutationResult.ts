import gql from 'graphql-tag';

export const mutationResultFragment = gql`
  fragment mutationResultFragment on MutationResult {
    __typename
    problems {
      type
      message
    }
  }
`;
