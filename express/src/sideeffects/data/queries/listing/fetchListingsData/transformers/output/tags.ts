import {
  fetchListingsData_listingsVenues_asset_context_tags as GQLTagEdge,
} from '../../types/fetchListingsData';

import { AssetTagEdge } from '@src/core/domain';

export default (gqlEdges: GQLTagEdge[]): AssetTagEdge[] => {
  return gqlEdges.map(edge => {
    return ({
      tagId: edge.tag.id,
      isActive: !edge.suppressed,
    });
  });
};
