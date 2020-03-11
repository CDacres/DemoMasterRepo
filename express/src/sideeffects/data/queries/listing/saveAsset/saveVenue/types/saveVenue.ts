/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { VenueInput, ProblemType } from "./../../../../../types";

// ====================================================
// GraphQL mutation operation: saveVenue
// ====================================================

export interface saveVenue_upsertVenue_problems {
  __typename: "MutationProblem";
  type: ProblemType;
  message: string;
}

export interface saveVenue_upsertVenue {
  __typename: "MutationResult";
  problems: saveVenue_upsertVenue_problems[];
}

export interface saveVenue {
  upsertVenue: saveVenue_upsertVenue | null;
}

export interface saveVenueVariables {
  input: VenueInput;
}
