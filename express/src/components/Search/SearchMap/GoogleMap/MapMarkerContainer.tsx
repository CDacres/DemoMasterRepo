import * as React from 'react';

// Components
import MapMarkerComponent from '@src/components/Search/SearchMap/GoogleMap/MapMarkerComponent';

// Types
import { SearchMapMarker } from '@src/typings/types';

type Props = {
  currencySymbol: string;
  handleMarkerClick: (marker: SearchMapMarker) => void;
  // hoveredRoomId: number;
  // lastHoveredRoomId: number;
  marker: SearchMapMarker;
};

class MapMarker extends React.Component<Props> {
  // shouldComponentUpdate(nextProps: Props) {
  //   const { marker } = this.props;
  //   if (Number(nextProps.hoveredRoomId) === Number(marker.id)) {
  //     return true;
  //   }
  //   if ((Number(nextProps.hoveredRoomId) !== Number(marker.id)) &&
  //   (Number(nextProps.lastHoveredRoomId) === Number(marker.id))) {
  //     return true;
  //   }
  //   return false;
  // }

  handleMarkerClick = () => {
    const { handleMarkerClick, marker } = this.props;
    handleMarkerClick(marker);
  }

  render() {
    return (
      <MapMarkerComponent
        {...this.props}
        handleMarkerClick={this.handleMarkerClick}
      />
    );
  }
}

export default MapMarker;
