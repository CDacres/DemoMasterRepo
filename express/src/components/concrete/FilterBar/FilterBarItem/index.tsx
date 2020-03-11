import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

// Components
import { BottomSidebar, ProductLargeScreen } from '@src/components/abstract/MediaQuery';
import OptionBlockItem from '@src/components/concrete/Carousel/OptionBlock/OptionBlockItem';

type Props = {
  children: JSX.Element | JSX.Element[];
  index: number;
  isFirst?: boolean;
  isLast?: boolean;
  length: number;
};

type State = {
  allLimit: number;
  largeLimit: number;
  smallLimit: number;
};

class FilterBarItem extends React.Component<Props, State> {
  state: State = {
    allLimit: -1,
    largeLimit: 4,
    smallLimit: 2,
  };

  shouldComponentUpdate() {
    return false;
  }

  renderLargeItem = (children, index, length, limit) => {
    if ((limit !== -1) && (index >= limit) && (index < length - 1)) {
      return;
    }
    return (
      <span className={css(styles.filterButtonWrapper)}>
        {children}
      </span>
    );
  }

  renderSmallItem = (children, index, isFirst, isLast, length, limit) => {
    if ((index >= limit) && (index < length - 1)) {
      return;
    }
    return (
      <OptionBlockItem
        isFirst={isFirst}
        isLast={isLast}
      >
        {children}
      </OptionBlockItem>
    );
  }

  render() {
    const { children, index, isFirst, isLast, length } = this.props;
    const { allLimit, largeLimit, smallLimit } = this.state;
    return (
      <ProductLargeScreen>
        {matches => {
          if (matches) {
            return (
              <BottomSidebar>
                {matches => {
                  if (matches) {
                    return (
                      <React.Fragment>
                        {this.renderLargeItem(children, index, length, largeLimit)}
                      </React.Fragment>
                    );
                  }
                  return (
                    <React.Fragment>
                      {this.renderLargeItem(children, index, length, allLimit)}
                    </React.Fragment>
                  );
                }}
              </BottomSidebar>
            );
          }
          return (
            <React.Fragment>
              {this.renderSmallItem(children, index, isFirst, isLast, length, smallLimit)}
            </React.Fragment>
          );
        }}
      </ProductLargeScreen>
    );
  }
}

export default FilterBarItem;
