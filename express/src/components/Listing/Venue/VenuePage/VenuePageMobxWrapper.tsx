import * as React from 'react';

// Sideeffects
import { ConnectionsContext, ConnectionsType } from '@src/sideeffects/connections';
import { fetchListingsData, saveSpace, saveVenue, uploadImage } from '@src/sideeffects/listings';
import { fetchTagReference } from '@src/sideeffects/references';
// horrible hack until we sort out canonical way of handling state and side effects.
import { MutationResult } from '@src/sideeffects/data/queries/sharedFragments';
import { ProblemType } from '@src/sideeffects/data/types';

// Core
import { ListingsV1VenueAndSpaces, NewFile, TagCatalogItem } from '@src/core/domain';

// Components
import VenueModel, { SideEffectsInterface } from '@src/components/Listing/Models/VenueModel';
import VenuePage from '@src/components/Listing/Venue/VenuePage';

const authHack = (result: MutationResult): boolean => {
  if (result.problems && result.problems.filter(problem => problem.type === ProblemType.AUTHENTICATION).length > 0) {
    window.location.assign(`/users/signin`);
    return false;
  } else {
    return true;
  }
};

const generateVenueSideEffects = (connections: ConnectionsType, domain: string): SideEffectsInterface => {
  // TODO: make domain getting better
  return {
    uploadImage: (newFile: NewFile): Promise<boolean> => {
      return uploadImage(connections, newFile).then(result => authHack(result));
    },
    fetchListingsData: (humanRef: Ref): Promise<ListingsV1VenueAndSpaces[]> => {
      return fetchListingsData(connections, humanRef);
    },
    fetchTagReference: (): Promise<TagCatalogItem[]> => {
      return fetchTagReference(connections);
    },
    saveSpace: (entireVenue: ListingsV1VenueAndSpaces, spaceId: Ref): Promise<boolean> => {
      return saveSpace(connections, { entireVenue, spaceId }).then(result => authHack(result));
    },
    saveVenue: (entireVenue: ListingsV1VenueAndSpaces): Promise<boolean> => {
      return saveVenue(connections, entireVenue).then(result => authHack(result));
    },
    scrollPage: (): Promise<boolean> => {
      window.scrollTo(0, 0);
      return;
    },
    finish: (): Promise<boolean> => {
      window.location.href = `/${domain}/dashboard/listings`;
      return;
    },
  };
};

type Props = {
  domain: string;
  url: string;
};

const VenuePageMobxWrapper = ({ domain, url }: Props) => {
  url = url || '';
  const split = url.split('/');
  const splits = split.skipWhile(x => x !== 'venues').skip(2);
  const venueId = splits.first();
  return (
    <ConnectionsContext.Consumer>
      {connections => {
        const sideEffects = generateVenueSideEffects(connections, domain);
        const model = new VenueModel(sideEffects);
        return (
          <VenuePage
            model={model}
            venueId={venueId}
          />
        );
      }
      }
    </ConnectionsContext.Consumer>
  );
};

export default VenuePageMobxWrapper;
