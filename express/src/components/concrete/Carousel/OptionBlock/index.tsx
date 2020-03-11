import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

type Props = {
  children: JSX.Element | JSX.Element[] | object[];
};

const OptionBlock = ({ children }: Props) => (
  <div className={css(styles.carouselOverflowWrapper)}>
    <div className={css(styles.scrollOverflowWrapper)}>
      <div className={css(styles.scrollOverflowContainer)}>
        <div className={css(styles.scrollOverflowInner)}>
          {children}
        </div>
      </div>
    </div>
  </div>
);

export default OptionBlock;
