/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { padding } from '@src/styles';

// Connectors
import { useSearchMap } from '@src/store/connectors';

// Components
import { ProductLargeScreen } from '@src/components/abstract/MediaQuery';

// Types
import { Store, Tag } from '@src/typings/types';

type Props = {
  children: JSX.Element | JSX.Element[];
  filterIsActive: boolean;
  map: Store.Pages.Search.Map;
  vertical: Tag;
};

class FilterBarItemsContainer extends React.Component<Props> {
  shouldComponentUpdate(nextProps: Props) {
    const { map: { isVisible }, vertical: { tagId } } = this.props;
    if (nextProps.map.isVisible !== isVisible) {
      return true;
    }
    if (nextProps.vertical.tagId !== tagId) {
      return true;
    }
    return false;
  }

  render() {
    const { children, filterIsActive, map: { isVisible } } = this.props;
    return (
      <ProductLargeScreen>
        {matches => {
          if (matches) {
            return (
              <div
                aria-expanded={filterIsActive ? 'true' : 'false'}
                className={css(styles.filterBarItemContainer, padding.topbottom_0, padding.leftright_2, padding.right_0_large, !isVisible && [padding.topbottom_0_large, padding.leftright_9_large])}
              >
                {children}
              </div>
            );
          }
          return (
            <React.Fragment>
              {children}
            </React.Fragment>
          );
        }}
      </ProductLargeScreen>
    );
  }
}

export default useSearchMap(FilterBarItemsContainer);
