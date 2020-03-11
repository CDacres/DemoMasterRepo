import * as React from 'react';
import shortid from 'shortid';
import { GoogleMap } from 'react-google-maps';
import { MAP } from 'react-google-maps/lib/constants';

// Styles
import mapStyles from './mapStyles';

// Connectors
import { useAuth, useConfig, useSearch, useSearchMap, useSearchResults } from '@src/store/connectors';

// Components
import MapMarker from '@src/components/Search/SearchMap/GoogleMap/MapMarkerContainer';
// import MapCardHOC from '@src/components/Search/SearchMap/GoogleMap/MapCardHOC.jsx';

// Types
import { Bounds, SearchMapMarker, Store } from '@src/typings/types';

type Props = {
  auth: Store.Auth;
  // config: Store.Config;
  currencySymbol: string;
  map: Store.Pages.Search.Map;
  mapMarkers: SearchMapMarker[];
  results: Store.Pages.Search.Results;
  setMapBounds: (bounds: object) => void;
  toggleMapBoundsHaveChanged: (haveChanged: boolean) => void;
  toggleMapStable: (isStable?: boolean) => void;
  toggleRequiresRefit: (requiresRefit?: boolean) => void;
};

type State = {
  activeCard: number;
  zoom: number;
};

type MapOptions = {
  clickableIcons: boolean;
  fullscreenControl: boolean;
  gestureHandling: 'greedy' | 'cooperative' | 'none' | 'auto';
  mapTypeControl: boolean;
  maxZoom?: number;
  streetViewControl: boolean;
  styles: object[];
  zoomControl: true;
  zoomControlOptions: {
    position: any;
  };
};

declare const google: any;

class MapClass extends React.Component<Props, State> {
  state: State = {
    activeCard: null,
    zoom: 14,
  };

  protected _map;
  protected boundsChangedListener;
  protected functionTimer;
  protected idleListener;

  componentDidMount() {
    const { toggleMapBoundsHaveChanged, toggleMapStable, toggleRequiresRefit } = this.props;
    const mapInstance = this._map && this._map.context[MAP];
    this.idleListener = google.maps.event.addListener(mapInstance, 'idle', () => {
      toggleRequiresRefit(false);
      toggleMapStable(true);
    });
    this.boundsChangedListener = google.maps.event.addListener(mapInstance, 'bounds_changed', () => {
      const { map: { isStable } } = this.props;
      if (isStable) {
        toggleMapBoundsHaveChanged(true);
      }
    });
  }

  shouldComponentUpdate(nextProps: Props) {
    if (nextProps.results.isFetching || !nextProps.map.isStable) {
      return false;
    }
    return true;
  }

  componentDidUpdate() {
    const { map: { requiresRefit } } = this.props;
    if (requiresRefit) {
      this.fitMapToBounds();
    }
  }

  componentWillUnmount() {
    google.maps.event.removeListener(this.idleListener);
  }

  fitMapToBounds = () => {
    const { map: { isStable }, mapMarkers, toggleMapStable } = this.props;
    const mapInstance = this._map && this._map.context[MAP];
    if (isStable) {
      toggleMapStable(false);
      if (mapMarkers && mapMarkers.length) {
        const bounds = this.getBoundsFromMarkers(mapMarkers);
        this._map.fitBounds(bounds);
      } else {
        mapInstance.setCenter(this.getCenter());
      }
    }
  }

  getBoundsFromMarkers = markers => {
    const bounds = new google.maps.LatLngBounds();
    markers.forEach((marker) => {
      const position = new google.maps.LatLng(marker.position.lat, marker.position.lng);
      bounds.extend(position);
    });
    return bounds;
  }

  getCenter = () => {
    const { mapMarkers } = this.props;
    if (mapMarkers && mapMarkers.length) {
      const bounds = this.getBoundsFromMarkers(mapMarkers);
      return this.getCenterFromBounds(bounds);
    } else {
      return this.getCenterFromSearchObject();
    }
  }

  getCenterFromBounds = bounds => {
    return bounds.getCenter();
  }

  getCenterFromSearchObject = () => {
    const { results: { searchObject: { lat, long } } } = this.props;
    return new google.maps.LatLng({ lat, lng: long });
  }

  getMapBounds = () => {
    return this._map.getBounds();
  }

  getMapCenter = () => {
    return this._map.getCenter();
  }

  handleMapChanged = () => {
    const { map: { isStable }, results: { isFetching } } = this.props;
    if (!isFetching && isStable) {
      clearTimeout(this.functionTimer);
      this.functionTimer = setTimeout(this.handleSearch, 500);
    }
  }

  handleMapMounted = map => {
    this._map = map;
    if (this._map) {
      this.fitMapToBounds();
    }
  }

  handleMarkerClick = marker => {
    this.setState({ activeCard: marker });
  }

  handleMarkerClose = () => {
    const { activeCard } = this.state;
    if (activeCard !== null) {
      this.setState({ activeCard: null });
    }
  }

  handleSearch = () => {
    const { map: { isStable }, setMapBounds } = this.props;
    if (isStable) {
      const bounds: Bounds = {};
      bounds.swLat = this.getMapBounds().getSouthWest().lat();
      bounds.swLon = this.getMapBounds().getSouthWest().lng();
      bounds.neLat = this.getMapBounds().getNorthEast().lat();
      bounds.neLon = this.getMapBounds().getNorthEast().lng();
      setMapBounds(bounds);
    }
  }

  render() {
    const { auth: { user: { isAdmin } }, currencySymbol, mapMarkers, results: { isFetching } } = this.props;
    const { zoom } = this.state;
    const options: MapOptions = {
      clickableIcons: false,
      fullscreenControl: false,
      gestureHandling: 'greedy',
      mapTypeControl: false,
      streetViewControl: false,
      styles: mapStyles,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.LEFT_TOP,
      },
    };
    if (!isAdmin) {
      options.maxZoom = 16;
    }
    return (
      <GoogleMap
        defaultCenter={this.getCenter()}
        defaultOptions={{
          clickableIcons: false,
        }}
        defaultZoom={14}
        onDragEnd={this.handleMapChanged}
        onZoomChanged={this.handleMapChanged}
        options={options}
        ref={this.handleMapMounted}
        zoom={zoom}
      >
        {!isFetching &&
          // isStable &&
          <div>
            {
              mapMarkers.map(marker => (
                <MapMarker
                  currencySymbol={currencySymbol}
                  handleMarkerClick={this.handleMarkerClick}
                  key={shortid.generate()}
                  marker={marker}
                />
              ))
            }
          </div>
        }
        {/* { activeCard &&
          <MapCardHOC
            domain={domain}
            handleMarkerClick={handleMarkerClick}
            handleMarkerClose={handleMarkerClose}
            marker={activeCard}
          />
        } */}
      </GoogleMap>
    );
  }
}

export default useAuth(useConfig(useSearch(useSearchMap(useSearchResults(MapClass)))));
