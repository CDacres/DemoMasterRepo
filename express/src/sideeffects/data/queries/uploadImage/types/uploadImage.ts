/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { UploadImageInput, ProblemType } from "./../../../types";

// ====================================================
// GraphQL mutation operation: uploadImage
// ====================================================

export interface uploadImage_uploadImage_problems {
  __typename: "MutationProblem";
  type: ProblemType;
  message: string;
}

export interface uploadImage_uploadImage {
  __typename: "MutationResult";
  problems: uploadImage_uploadImage_problems[];
}

export interface uploadImage {
  uploadImage: uploadImage_uploadImage | null;
}

export interface uploadImageVariables {
  input: UploadImageInput;
}
