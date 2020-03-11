import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { padding } from '@src/styles';

type Props = {
  children: JSX.Element | JSX.Element[];
  mapIsVisible: boolean;
};

const SearchContentComponent = ({ children, mapIsVisible }: Props) => (
  <div>
    <div aria-hidden="false">
      {mapIsVisible ? (
        <React.Fragment>
          <div className={css(styles.mainContentWrapper, styles.showMap)}>
            <div className={css(styles.searchContent, padding.leftright_3)}>
              <div>
                <div
                  itemProp="itemList"
                  itemScope={true}
                  itemType="http://schema.org/ItemList"
                >
                  {children}
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      ) : (
        <div className={css(styles.searchContent, padding.leftright_3, padding.leftright_10_large)}>
          <div>
            <div
              itemProp="itemList"
              itemScope={true}
              itemType="http://schema.org/ItemList"
            >
              {children}
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
);

export default SearchContentComponent;
