import { kindMap } from '../sharedTransformers';
import { ConnectionsType } from '@src/sideeffects/connections';
import realSaveSpace, { RequiredSpace } from './saveSpace';
import saveVenue from './saveVenue';
import { MutationResult } from '../../sharedFragments';

const saveSpace = (connections: ConnectionsType, reqSpace: RequiredSpace): Promise<MutationResult> => {
  const workingSpace = reqSpace.entireVenue.spaces.find(space => space.id === reqSpace.spaceId);
  const assetType = kindMap.find(item => item.kind === workingSpace.kind).assetType;
  if (assetType === 'VENUE') {
    return saveVenue(connections, reqSpace.entireVenue);
  } else if (assetType === 'SPACE' || assetType === 'TABLE') {
    return realSaveSpace(connections, reqSpace);
  }
};

export {
  saveSpace,
  saveVenue,
};
