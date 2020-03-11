import { find, first } from 'lodash';
import { SpaceKind, ProductCategory as InternalCategory } from '@src/core/domain';
import { kindMap } from '../../../sharedTransformers';
import {
  fetchListingsData_listingsVenues_asset_usages as GQLVenueUsage,
  fetchListingsData_listingsVenues_spaces as GQLSpace,
} from '../../types/fetchListingsData';
import { ProductCategory } from '../../../../../types';

export const gqlSpaceToSpaceKind = (space: GQLSpace): SpaceKind => {
  const category = first(space.asset.usages).category;
  const assetType = space.tableCount >= 1 ? 'TABLE' : 'SPACE';
  return find(kindMap, { assetType, category }).kind;
};

export const kindToGqlCategory = (kind: SpaceKind): ProductCategory => {
  return find(kindMap, { kind }).category;
};

export const gqlVenueUsageToSpaceKind = (venueUsage: GQLVenueUsage): SpaceKind => {
  const category = venueUsage.category;
  const assetType = 'VENUE';
  const result = find(kindMap, { assetType, category });
  return result ? result.kind : null;
};

export const gqlSpaceToSpaceCategory = (space: GQLSpace): InternalCategory => {
  const category = first(space.asset.usages).category;
  return find(kindMap, { category }).internalCategory;
};

export const gqlVenueUsageToSpaceCategory = (venueUsage: GQLVenueUsage): InternalCategory => {
  const category = venueUsage.category;
  return find(kindMap, { category }).internalCategory;
};
