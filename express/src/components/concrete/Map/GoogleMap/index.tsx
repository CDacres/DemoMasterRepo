/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import mapStyles from '../styles';

// Components
import { Magnify } from '@src/components/concrete/Icons/svgs';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';

type Props = {
  closeMapModal?: (e: any) => void;
  height?: number;
  lat?: string | number;
  lon?: string | number;
  openMapModal?: (e: any) => void;
  scale?: number;
  showMapModal?: (e: any) => void;
  showMarker?: boolean;
  width?: number;
  zoom?: number;
};

const GoogleMap: React.FunctionComponent<Props> = ({ closeMapModal, height, lat, lon, openMapModal, scale, showMapModal, showMarker, width, zoom }) => {
  let mapUrl = `//maps.googleapis.com/maps/api/staticmap?scale=${scale}&center=${lat},${lon}&zoom=${zoom}&size=${width}x${height}`;
  if (showMarker) {
    mapUrl += `&markers=${lat},${lon}`;
  } else {
    // TODO: correct formula for circle
    // const radius = 0.01;
    // let points = [];
    // mapUrl += '&path=color:0x00a8db|weight:2|fillcolor:0x0cc6ff80';
    // for (let i = 0; i <= 360; i += 5)
    // {
    //   points.push({
    //     lat: (Number(lat) + (radius * Math.cos(i))).toFixed(7),
    //     lon: (Number(lon) + (radius * Math.sin(i))).toFixed(7),
    //   });
    // }
    // points.map(point => {
    //   mapUrl += `|${point.lat},${point.lon}`;
    // })
  }
  mapUrl += `&key=${process.env.GOOGLE_MAP_API_KEY}`;
  return (
    <div>
      <div id="map">
        <a
          data-toggle="modal"
          data-target="#map_modal"
          data-lat={lat}
          data-long={lon}
          href="#"
          id="google_map"
          onClick={openMapModal}
        >
          <div
            className={css(mapStyles.staticMap)}
            id="static-map"
          >
            <Translatable attributes={{ alt: { transKey: 'common.map' }, title: { transKey: 'common.map' } }}>
              <img
                className={css(mapStyles.staticMap)}
                src={mapUrl}
              />
            </Translatable>
            <div className={css(mapStyles.zoom)}>
              <Magnify stylesArray={[mapStyles.siteZoom]} />
            </div>
          </div>
        </a>
      </div>
      {showMapModal &&
        <div className={css(mapStyles.mapModalOverlay)}>
          <div className={css(mapStyles.mapModal)}>
            <a
              className={css(mapStyles.mapModalClose)}
              href="#"
              onClick={closeMapModal}
              title="Close"
            >
              <span>
                ×
              </span>
            </a>
            <iframe
              frameBorder="0"
              height="100%"
              id="mapIframe"
              src={`//maps.google.com/maps?q=loc:${lat}+${lon}&z=15&output=embed`}
              width="100%"
            />
          </div>
        </div>
      }
    </div>
  );
};

GoogleMap.defaultProps = {
  height: 400,
  lat: 51.528308,
  lon: -0.3817765,
  scale: 1,
  showMarker: true,
  width: 600,
  zoom: 14,
};

export default GoogleMap;
