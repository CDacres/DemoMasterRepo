import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

type Props = {
  children: React.ReactNode;
};

const MiddleText = ({ children }: Props) => (
  <div className={css(styles.container)}>
    <div className={css(styles.outside)} />
    <div>
      <span className={css(styles.text)}>
        {children}
      </span>
    </div>
    <div className={css(styles.outside)} />
  </div>
);

export default MiddleText;
