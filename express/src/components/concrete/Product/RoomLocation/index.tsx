import * as React from 'react';
import LazyLoad from 'react-lazyload';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, pagestyles } from '@src/styles';

// Components
import ContentSeparator from '@src/components/concrete/ContentSeparator';
import { ConnectedTranslatable as Translatable } from '@src/components/abstract/Translatable';
import GoogleMap from '@src/components/concrete/Map/GoogleMap';
import GenericHeader from '@src/components/concrete/GenericHeader';
import LoadingAnimation from '@src/components/concrete/LoadingAnimation';
import Places from '@src/components/concrete/Product/RoomLocation/Places';

// Types
import { RoomLocation as roomLocationType } from '@src/typings/types';

export type RoomLocationProps = {
  location: roomLocationType;
};

const RoomLocation = ({ location }: RoomLocationProps) => (
  <section id="location">
    <div className={css(margin.bottom_2)}>
      <GenericHeader text="common.location" />
    </div>
    {location.around.length > 0 &&
      <div className={css(pagestyles.row, pagestyles.clearfix)}>
        <Places
          around={location.around}
          firstLocKey={0}
          secondLocKey={2}
        />
        <Places
          around={location.around}
          firstLocKey={1}
          secondLocKey={3}
        />
      </div>
    }
    <LazyLoad placeholder={<LoadingAnimation />}>
      <div className={css(margin.bottom_1)}>
        <GoogleMap
          lat={location.lat}
          lon={location.lon}
          showMarker={false}
        />
      </div>
    </LazyLoad>
    <Translatable content={{ transKey: 'room.exact_location_info' }}>
      <span className={css(styles.locationInfo)} />
    </Translatable>
    <ContentSeparator marginNum={4} />
  </section>
);

export default RoomLocation;
