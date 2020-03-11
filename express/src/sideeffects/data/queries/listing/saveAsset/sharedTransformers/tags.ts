import { AssetTagEdge } from '@src/core/domain';
import { TagEdgeInput } from '../../../../types';

export const spaceTagsToGQL = (spaceTags: AssetTagEdge[]): TagEdgeInput[] => {
  return spaceTags.map(tag => tagToGQL(tag));
};

export const tagToGQL = (tag: AssetTagEdge): TagEdgeInput => {
  return {
    tagId: tag.tagId,
    suppressed: !tag.isActive,
  };
};
