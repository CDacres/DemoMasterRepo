import * as React from 'react';

// Connectors
import { useSearch, useSearchMap } from '@src/store/connectors';

// Components
import MapCard from '@src/components/Search/SearchMap/GoogleMap/MapCard';

// Types
import { SearchMapMarker } from '@src/typings/types';

type Props = {
  card: object;
  currencySymbol: string;
  domain: string;
  handleMarkerClick: () => void;
  handleMarkerClose: () => void;
  marker: SearchMapMarker;
};

class MapCardHOC extends React.Component<Props> {
  render() {
    const { card, currencySymbol, domain, handleMarkerClick, handleMarkerClose, marker } = this.props;
    return (
      <MapCard
        card={card}
        currencySymbol={currencySymbol}
        domain={domain}
        handleMarkerClick={handleMarkerClick}
        handleMarkerClose={handleMarkerClose}
        marker={marker}
      />
    );
  }
}

export default useSearch(useSearchMap(MapCardHOC));
