import * as React from 'react';

// Components
import LandingMapComponent from '@src/components/concrete/LandingMap/LandingMapComponent';

// Types
import { Bounds } from '@src/typings/types';

declare const google: any;

type Props = {
  bounds: Bounds;
  lat: string;
  lon: string;
  pointers?: Array<{
    lat: string;
    lon: string;
  }>;
};

type State = {
  map: any;
};

class LandingMap extends React.PureComponent<Props> {
  state: State = { map: null };

  handleComponentMount = node => {
    if (this.state.map || node === null) {
      return;
    }
    const { bounds, lat, lon, pointers } = this.props;
    const map = new google.maps.Map(node, {
      zoom: 12,
      minZoom: 12,
      scrollwheel: false,
      disableDoubleClickZoom: true,
      navigationControl: false,
      mapTypeControl: false,
      scaleControl: false,
      draggable: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
      center: {
        lat: parseFloat(lat),
        lng: parseFloat(lon),
      },
    });
    if (pointers) {
      pointers.forEach(({ lat, lon }) => {
        const marker = new google.maps.Marker({
          position: new google.maps.LatLng(lat, lon),
          icon: '/_express/images/maps/location-dot.png',
        });
        marker.setMap(map);
      });
    }
    const mapBounds = new google.maps.LatLngBounds();
    const swLatLng = new google.maps.LatLng(bounds.swLat, bounds.swLon);
    mapBounds.extend(swLatLng);
    const neLatLng = new google.maps.LatLng(bounds.neLat, bounds.neLon);
    mapBounds.extend(neLatLng);
    map.fitBounds(mapBounds);
    this.setState({ map });
  }

  render() {
    return (
      <LandingMapComponent handleComponentMount={this.handleComponentMount} />
    );
  }
}

export default LandingMap;
