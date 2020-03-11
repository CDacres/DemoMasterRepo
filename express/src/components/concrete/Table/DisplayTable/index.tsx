import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { padding } from '@src/styles';

// Components
import SectionInner from '@src/components/concrete/Info/Section/SectionInner';
import { FullScreenModal } from '@src/components/abstract/MediaQuery';

type Props = {
  headerItems: {
    large: JSX.Element[];
    small: JSX.Element[];
  };
  rowItems: {
    large: JSX.Element[];
    small: JSX.Element[];
  };
};

const DisplayTable = ({ headerItems, rowItems }: Props) => (
  <SectionInner hasHiddenFont={true}>
    <div className={css(styles.tableWrapper)}>
      <FullScreenModal>
        {matches => {
          if (matches) {
            return (
              <div>
                <div className={css(styles.smallScreenContainer)}>
                  <table className={css(styles.table, padding.topbottom_1_small)}>
                    <thead>
                      {headerItems.small.map(smallHeaderItem => (
                        smallHeaderItem
                      ))}
                    </thead>
                    <tbody>
                      {rowItems.small.map(smallRowItem => (
                        smallRowItem
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          }
          return null;
        }}
      </FullScreenModal>
      <div className={css(styles.tableContainer)}>
        <table className={css(styles.table, padding.topbottom_1_small)}>
          <thead>
            {headerItems.large.map(largeHeaderItem => (
              largeHeaderItem
            ))}
          </thead>
          <tbody>
            {rowItems.large.map(largeRowItem => (
              largeRowItem
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </SectionInner>
);

export default DisplayTable;
