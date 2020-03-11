import { saveSpaceVariables } from '../types/saveSpace';
import { ListingsV1VenueAndSpaces } from '@src/core/domain';
import assetImagesToGql from '../../sharedTransformers/images';
import { kindToGqlCategory } from '../../../sharedTransformers';
import { spaceProductsToGql } from '../../sharedTransformers/products';
import { spaceTagsToGQL } from '../../sharedTransformers/tags';
import { AssetAmenityEdgeInput } from '@src/sideeffects/data';

export type RequiredSpace = {
  entireVenue: ListingsV1VenueAndSpaces;
  spaceId: Ref;
};

export function transformInput(reqSpace: RequiredSpace): saveSpaceVariables {
  const space = reqSpace.entireVenue.spaces.first(candidate => candidate.id === reqSpace.spaceId);
  const amenities = reqSpace.entireVenue.venue.amenities
    .filter(candidateAmenity => candidateAmenity.excludedSpaces.includes(space.id))
    .map(suppressedAmenity => ({
      amenityId: suppressedAmenity.amenityId,
      suppressed: true,
    })) as AssetAmenityEdgeInput[];
  return {
    input: {
      tableCount: space.instances,
      parentId: reqSpace.entireVenue.venue.id,
      asset: {
        id: space.id,
        name: space.name,
        description: space.description,
        currency: space.currency,
        area: {
          value: space.capacity.area.value,
          unit: space.capacity.area.unit,
        },
        usages: [
          {
            category: kindToGqlCategory(space.kind),
            products: spaceProductsToGql(space.prices, 'SPACE'),
            context: {
              amenities,
              configurations: space.capacity.configurations,
              tags: spaceTagsToGQL(space.tags),
            },
          },
        ],
        images: assetImagesToGql(space.images),
      },
    },
  };
}
