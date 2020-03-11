import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Connectors
import { useConfig } from '@src/store/connectors';

// Core
import { resolveUnitSystem } from '@src/core';
import { NearbyPlaceType, walkDistance } from '@src/core/domain';

// Styles
import styles from './styles';

// Components
import PlaceTypeIcon from '@src/components/Listing/Venue/VenueLocationSection/NearbyPlaceWidget/PlaceTypeIcon';
import Spell from '@src/components/Listing/Translate/Spell';

// Types
import { Store } from '@src/typings/types';

type Props = {
  // TODO: move to a central place
  config: Store.Config;
  meters: number; // in meters
  name: string;
  types: NearbyPlaceType[];
};

class NearbyPlaceWidget extends React.Component<Props> {

  render() {
    const { config: { domain }, meters, name, types } = this.props;

    const system = resolveUnitSystem(domain);

    // TODO: fix to unit
    const walk = walkDistance(system, meters);

    return (
      <div className={css(styles.container)}>
        <PlaceTypeIcon types={types} />
        {' '}
        <span>
          {walk}{' '}
          <Spell word={system === 'IMPERIAL' ? 'listing.miles' : 'listing.kms'} />
          {' '}{name}
        </span>
      </div>
    );
  }
}

export default useConfig(NearbyPlaceWidget);
