import { saveVenueVariables } from '../types/saveVenue';
import { ListingsV1VenueAndSpaces } from '@src/core/domain';
import assetImagesToGql from '../../sharedTransformers/images';
import { kindMap, kindToGqlCategory } from '../../../sharedTransformers';
import { productToGqlProduct, spaceProductsToGql } from '../../sharedTransformers/products';
import { spaceTagsToGQL } from '../../sharedTransformers/tags';
import { AssetAmenityEdgeInput, UsageInput } from '@src/sideeffects/data';

const venueToUsages = (entireVenue: ListingsV1VenueAndSpaces): UsageInput[] => {
  const relevantSpaces = entireVenue.spaces.filter(candidateSpace => {
    return kindMap.find(item => item.kind === candidateSpace.kind).assetType === 'VENUE';
  });
  const usages = relevantSpaces.map(usageSpace => {
    const amenities = entireVenue.venue.amenities
      .filter(candidateAmenity => candidateAmenity.excludedSpaces.includes(usageSpace.id))
      .map(suppressedAmenity => ({
        amenityId: suppressedAmenity.amenityId,
        suppressed: true,
      })) as AssetAmenityEdgeInput[];
    return {
      description: usageSpace.description,
      name: usageSpace.name,
      category: kindToGqlCategory(usageSpace.kind),
      context: {
        amenities,
        configurations: usageSpace.capacity.configurations,
        tags: spaceTagsToGQL(usageSpace.tags),
      },
      products: spaceProductsToGql(usageSpace.prices, 'SPACE'),
    };
  }) as UsageInput[];
  entireVenue.venue.packages.forEach(orphanPackage => {
    const targetUsage = usages.first(candidateUsage => candidateUsage.category === orphanPackage.category);
    if (targetUsage) {
      targetUsage.products.push(productToGqlProduct(orphanPackage, 'VENUE'));
    } else {
      usages.push({
        description: '',
        name: '',
        category: orphanPackage.category,
        products: [productToGqlProduct(orphanPackage, 'VENUE')],
      });
    }
  });
  return usages;
};

export function transformInput(entireVenue: ListingsV1VenueAndSpaces): saveVenueVariables {
  const amenities = entireVenue.venue.amenities.map(localAmenity => ({
    amenityId: localAmenity.amenityId,
    price: localAmenity.price,
    note: localAmenity.note,
    suppressed: !localAmenity.isActive,
  })) as AssetAmenityEdgeInput[];
  return {
    input: {
      asset: {
        id: entireVenue.venue.id,
        name: entireVenue.venue.name,
        description: entireVenue.venue.description,
        location: entireVenue.venue.location,
        currency: entireVenue.venue.currency,
        context: {
          amenities,
          website: entireVenue.venue.website,
          schedule: {
            days: entireVenue.venue.openingHours,
          },
          menus: entireVenue.venue.menus,
        },
        usages: venueToUsages(entireVenue),
        images: assetImagesToGql(entireVenue.venue.images),
      },
      details: {
        venueTypeId: entireVenue.venue.venueTypeId,
      },
    },
  };
}
