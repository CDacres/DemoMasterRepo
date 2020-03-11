/* tslint:disable:max-line-length */
import * as React from 'react';
import Sticky from 'react-stickynode';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

// Components
import GoogleMap from '@src/components/Search/SearchMap/GoogleMap';
import SearchOnMapMove from '@src/components/Search/SearchMap/SearchOnMapMove';

// Types
import { Store } from '@src/typings/types';

type Props = {
  hasBanner: boolean;
  isServer: boolean;
  map: Store.Pages.Search.Map;
  results: Store.Pages.Search.Results;
  startFetch: () => void;
};

const SearchMapComponent = ({ hasBanner, isServer, map: { isStable }, results: { isFetching }, startFetch }: Props) => (
  <div
    className={css(styles.mapWrapper)}
    style={{ top: hasBanner ? '528px' : '48px' }}
  >
    <Sticky
      bottomBoundary={0}
      innerZ={1}
      top={128}
    >
      <div className={css(styles.mapInnerWrapper)}>
        <div className={css(styles.mapInnerContainer)}>
          {(isFetching || !isStable) &&
            <div className={css(styles.mapOverlay)} />
          }
          {!isServer &&
            <GoogleMap />
          }
          <SearchOnMapMove startFetch={startFetch} />
        </div>
      </div>
    </Sticky>
  </div>
);

export default SearchMapComponent;
