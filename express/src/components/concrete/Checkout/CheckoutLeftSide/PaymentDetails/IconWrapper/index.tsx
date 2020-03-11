import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

type Props = {
  children: JSX.Element;
};

const IconWrapper = ({ children }: Props) => (
  <span className={css(styles.iconWrapper)}>
    <span className={css(styles.iconContainer)}>
      {children}
    </span>
  </span>
);

export default IconWrapper;
