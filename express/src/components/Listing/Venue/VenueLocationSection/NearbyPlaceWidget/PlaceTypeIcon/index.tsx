import * as React from 'react';

// Core
import { NearbyPlaceType } from '@src/core/domain';

// Components
import Subway from '@src/components/Listing/Icons/Subway';
import Train from '@src/components/Listing/Icons/Train';

type Props = {
  types: NearbyPlaceType[];
};

class PlaceTypeIcon extends React.Component<Props> {
  render() {
    const { types } = this.props;
    return (
      <React.Fragment>
        {types ? (
          <React.Fragment>
            {types.map((i, k) => {
              if (i === 'TRAIN_STATION') {
                return (
                  <Train key={k} />
                );
              } else if (i === 'SUBWAY_STATION') {
                return (
                  <Subway key={k} />
                );
              } else {
                return null;
              }
            })}
          </React.Fragment>
        ) : (
          null
        )}
      </React.Fragment>
    );
  }
}

export default PlaceTypeIcon;
