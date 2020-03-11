import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { padding } from '@src/styles';

// Components
import { ProductLargeScreen } from '@src/components/abstract/MediaQuery';
import MapToggle from '@src/components/concrete/FilterBar/MapToggle';
import OptionBlock from '@src/components/concrete/Carousel/OptionBlock';

type Props = {
  children: JSX.Element | JSX.Element[];
  filterIsActive: boolean;
  hasLocation: boolean;
};

const FilterBarComponent = ({ children, filterIsActive, hasLocation }: Props) => (
  <div>
    <div className={css(styles.filterBar)}>
      <div className={css(styles.filterBarInner)}>
        <ProductLargeScreen>
          {matches => {
            if (matches) {
              return (
                <div className={css(styles.filterBarInnerWrapper)}>
                  <div className={css(styles.filterBarInnerContainer)}>
                    <div className={css(filterIsActive ? styles.filterBarInnerActive : styles.filterBarInnerHeight)}>
                      {filterIsActive &&
                        <div className={css(styles.activeFilterOverlay)} />
                      }
                      <div>
                        {children}
                      </div>
                    </div>
                  </div>
                  {hasLocation &&
                    <MapToggle />
                  }
                </div>
              );
            }
            return (
              <div className={css(styles.filterBarInnerWrapperSmall, padding.leftright_3)}>
                <OptionBlock>
                  {children}
                </OptionBlock>
              </div>
            );
          }}
        </ProductLargeScreen>
      </div>
    </div>
    <div className={css(styles.filterBarBottom)} />
  </div>
);

export default FilterBarComponent;
