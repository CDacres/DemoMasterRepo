import * as React from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import { css } from 'aphrodite/no-important';

// Core
import { GeoLocation } from '@src/core';

// Styles
import styles from './styles';

// Components
import Button from '@src/components/Listing/Buttons/Button';
import GeoPin from '@src/components/Listing/Icons/GeoPin';
import Strip from '@src/components/Listing/Layout/Strip';
import Spell from '@src/components/Listing/Translate/Spell';

type Props = {
  containerElement?: React.ReactNode;
  draggable?: boolean;
  height?: string | number;
  // hook?: (map: GoogleMap) => void;
  mapElement?: React.ReactNode;
  // on location submitted
  onChanged?: (value: GeoLocation) => void;
  onPreview?: (location: GeoLocation) => void;
  value?: GeoLocation;
  zoom?: number;
  zoomable?: boolean;
};

const GoogleMapWrapper = withGoogleMap<Props>((props) => {

  const handleCenterChanged = () => {
    if (props.onPreview) {
      const mapCenter = map.getCenter();
      const center = { lat: mapCenter.lat(), lng: mapCenter.lng() };
      props.onPreview(center);
    }
  };

  let map: GoogleMap = null;

  const linkMap = (m: GoogleMap) => {
    map = m;
  };

  return (
    <GoogleMap
      center={props.value}
      onCenterChanged={handleCenterChanged}
      options={{
        gestureHandling: 'greedy', // one finger panning
        zoomControl: props.zoomable,
        scrollwheel: false,
        disableDoubleClickZoom: true,
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        disableDefaultUI: true,
        panControl: false,
        draggable: props.draggable,
      }}
      ref={linkMap}
      zoom={props.zoom}
    >
      {/* <Circle center={props.center} radius={50} /> */}
    </GoogleMap>
  );
});

type State = {
  isEditing?: boolean;
  value?: GeoLocation;
};

class GeoInput extends React.Component<Props, State> {

  state: State = {
    isEditing: false,
    value: this.props.value,
  };

  handleCenterChanged = (v: GeoLocation) => {
    this.setState({ value: v }, () => {
      const { onPreview: onCenterChanged } = this.props;
      const { value: center } = this.state;
      if (onCenterChanged) {
        onCenterChanged(center);
      }
    });
  }

  toggleEdit = () => {
    this.setState({ isEditing: !this.state.isEditing }, () => {
      const { onChanged } = this.props;
      const { isEditing, value } = this.state;
      if (!isEditing && onChanged) {
        onChanged(value);
      }
    });
  }

  render() {
    const { height, value, zoom } = this.props;
    const { isEditing } = this.state;
    return (
      <div
        className={css(styles.container)}
        style={{ height: height }}
      >
        <GoogleMapWrapper
          containerElement={
            <div
              className={css(styles.inner)}
              style={{ height: height }}
            />
          }
          draggable={isEditing}
          mapElement={<div className={css(styles.map)} />}
          onPreview={this.handleCenterChanged}
          value={value}
          zoom={zoom}
          zoomable={isEditing}
        />
        <Strip
          col="1"
          itemsHorz="center"
          itemsVert="center"
          row="1"
          style={{ pointerEvents: 'none' }}
          zIndex={1}
        >
          <GeoPin />
        </Strip>
        <Strip
          col="1"
          height="auto"
          horz="end"
          margin="16px"
          row="1"
          vert="start"
          width="auto"
          zIndex={2}
        >
          <Button
            className={css(styles.button)}
            hasLargeText={true}
            onClick={this.toggleEdit}
            variant="contained"
          >
            <Spell word={isEditing && 'common.save' || 'listing.adjust'} />
          </Button>
        </Strip>
      </div>
    );
  }
}

export default GeoInput;
