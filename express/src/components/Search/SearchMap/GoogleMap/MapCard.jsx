import * as React from 'react';
import PropTypes from 'prop-types';
import { OverlayView } from 'react-google-maps';

// import MinimalCard from '../../CardSlider/CardContainer/Card/MinimalCard';

function getCardPixelPositionOffset() {
  return { x: -115, y: -258 };
}

class MapCard extends React.Component {
  static propTypes = {
    card: PropTypes.object.isRequired,
    currencySymbol: PropTypes.string.isRequired,
    domain: PropTypes.string.isRequired,
    handleMarkerClick: PropTypes.func.isRequired,
    handleMarkerClose: PropTypes.func.isRequired,
    marker: PropTypes.object.isRequired
  }

  render() {
    const { card, currencySymbol, domain, handleMarkerClick, handleMarkerClose, marker } = this.props;
    return (
      <OverlayView
        getPixelPositionOffset={getCardPixelPositionOffset}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        position={{ lat: marker.position.lat, lng: marker.position.lng }}
        roomId={marker.id}
        {...marker}
      >
        {/* <MinimalCard
          card={card}
          cardId={marker.id}
          cardPadding={66.6667}
          currencySymbol={currencySymbol}
          domain={domain}
          handleMarkerClick={handleMarkerClick}
          handleMarkerClose={handleMarkerClose}
          isAdmin={false}
          isListing
          lang={lang}
        /> */}
      </OverlayView>
    );
  }
}

export default MapCard;
