import { Ref } from '@src/core';
import { VenueImageTypes } from '@src/core/domain';

export type NewFile = {
  file: File;
  id: Ref;
  type: VenueImageTypes;
};
