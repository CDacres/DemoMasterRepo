import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

type Props = {
  children: string | JSX.Element;
};

const Coin = ({ children }: Props) => (
  <div className={css(styles.inline, styles.border)}>
    {children}
  </div>
);

export default Coin;
