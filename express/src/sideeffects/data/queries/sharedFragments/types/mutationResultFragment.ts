/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ProblemType } from "./../../../types";

// ====================================================
// GraphQL fragment: mutationResultFragment
// ====================================================

export interface mutationResultFragment_problems {
  __typename: "MutationProblem";
  type: ProblemType;
  message: string;
}

export interface mutationResultFragment {
  __typename: "MutationResult";
  problems: mutationResultFragment_problems[];
}
