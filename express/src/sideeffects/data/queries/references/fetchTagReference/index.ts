import gql from 'graphql-tag';
import * as T from './types/tagsReference';

import { useQuery } from '../../../';
import { TagCatalogItem, ProductCategory } from '@src/core/domain';
import { ProductCategory as GqlPC } from '../../../types';

const fetchTagReferenceQuery = gql`
  query tagsReference {
    tagsReference {
      tag {
        id
        description
      }
      orderIndex
      productCategory
    }
  }
`;

const convertProductCategory = (gqlPC: GqlPC): ProductCategory => {
  switch (gqlPC) {
    case GqlPC.DEDICATEDDESK:
    case GqlPC.HOTDESK:
    case GqlPC.OFFICE:
      return ProductCategory.OFFICE;
    case GqlPC.MEETING:
      return ProductCategory.MEETING;
    case GqlPC.PARTY:
      return ProductCategory.PARTY;
    case GqlPC.DINING:
      return ProductCategory.DINING;
    case GqlPC.WEDDING:
      return ProductCategory.WEDDING;
  }
};

const transformOutput = (gqlResult: T.tagsReference): TagCatalogItem[] => {
  return gqlResult.tagsReference.map(item => ({
    ...item,
    productCategory: convertProductCategory(item.productCategory),
  }));
};

export const fetchTagReference = useQuery<
  null, TagCatalogItem[],
  null, T.tagsReference
>({
  query: fetchTagReferenceQuery,
  transformInput: () => null,
  transformOutput,
});
