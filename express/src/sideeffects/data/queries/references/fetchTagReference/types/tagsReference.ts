/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ProductCategory } from "./../../../../types";

// ====================================================
// GraphQL query operation: tagsReference
// ====================================================

export interface tagsReference_tagsReference_tag {
  __typename: "Tag";
  id: Ref;
  description: string;
}

export interface tagsReference_tagsReference {
  __typename: "TagCatalogItem";
  tag: tagsReference_tagsReference_tag | null;
  orderIndex: number | null;
  productCategory: ProductCategory | null;
}

export interface tagsReference {
  tagsReference: (tagsReference_tagsReference | null)[] | null;
}
