/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles.js';

// Components
import { Fang } from '@src/components/concrete/Icons/svgs';
import OverlayView from '@src/components/Search/SearchMap/GoogleMap/CustomOverlayView';

// Types
import { SearchMapMarker } from '@src/typings/types';

type Props = {
  currencySymbol?: string;
  handleMarkerClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  // hoveredRoomId: number;
  lastHoveredRoomId?: number;
  marker: SearchMapMarker;
};

function getMarkerPixelPositionOffset() {
  return { x: -25, y: -38 };
}

const MapMarkerComponent = ({ currencySymbol, handleMarkerClick, marker }: Props) => (
  <OverlayView
    {...marker}
    // roomId={marker.id}
    position={{ lat: marker.position.lat, lng: marker.position.lng }}
    getPixelPositionOffset={getMarkerPixelPositionOffset}
    mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
  >
    <div
      onClick={handleMarkerClick}
      className={css(styles.overlayView)}
      // {Number(hoveredRoomId) === Number(marker.id) ? css(styles.overlayViewHighlighted) : css(styles.overlayView)}
    >
      <span className={css(styles.priceText)}>
        {marker.price ? (
          <span>
            <span dangerouslySetInnerHTML={{ __html: currencySymbol }} />
            {Number(marker.price) < 100 ? Number(marker.price).toFixed(2) : Number(marker.price)}
          </span>
        ) : (
          '-'
        )}
      </span>
      <Fang stylesArray={[styles.fang]} />
      {/* {Number(hoveredRoomId) === Number(marker.id) ? css(styles.fangShapeHovered) : css(styles.fangShape)} */}
    </div>
  </OverlayView>
);

export default MapMarkerComponent;
