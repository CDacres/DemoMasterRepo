/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { SpaceInput, ProblemType } from "./../../../../../types";

// ====================================================
// GraphQL mutation operation: saveSpace
// ====================================================

export interface saveSpace_upsertSpace_problems {
  __typename: "MutationProblem";
  type: ProblemType;
  message: string;
}

export interface saveSpace_upsertSpace {
  __typename: "MutationResult";
  problems: saveSpace_upsertSpace_problems[];
}

export interface saveSpace {
  upsertSpace: saveSpace_upsertSpace | null;
}

export interface saveSpaceVariables {
  input: SpaceInput;
}
