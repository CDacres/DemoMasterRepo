import * as React from 'react';
import LazyLoad from 'react-lazyload';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding } from '@src/styles';

// Components
import LoadingAnimation from '@src/components/concrete/LoadingAnimation';
import MapBoxMap from '@src/components/concrete/Map/MapBoxMap';

type Props = {
  location: {
    lat: string;
    lon: string;
  };
};

const SectionMap = ({ location }: Props) => (
  <LazyLoad placeholder={<LoadingAnimation />}>
    <div className={css(margin.bottom_4, margin.bottom_5_small)}>
      <div className={css(styles.container)}>
        <div className={css(styles.inner)}>
          <div className={css(styles.inner, styles.mapWrapper)}>
            <div className={css(styles.inner, styles.mapContainer, styles.mapPosition)}>
              <div className={css(styles.inner, styles.mapInner, styles.mapPosition, margin.all_0, padding.all_0)}>
                <MapBoxMap
                  height={567}
                  lat={location.lat}
                  lon={location.lon}
                  showMarker={false}
                  width={1140}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </LazyLoad>
);

export default SectionMap;
