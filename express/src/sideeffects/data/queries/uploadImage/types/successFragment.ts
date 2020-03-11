/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ProblemType } from "./../../../types";

// ====================================================
// GraphQL fragment: successFragment
// ====================================================

export interface successFragment_problems {
  __typename: "MutationProblem";
  type: ProblemType | null;
  message: string | null;
}

export interface successFragment {
  __typename: "MutationResult";
  problems: successFragment_problems[] | null;
}
