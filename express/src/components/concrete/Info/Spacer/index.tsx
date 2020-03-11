import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

type Props = {
  isLarge?: boolean;
};

const Spacer = ({ isLarge }: Props) => (
  <div>
    <div className={css(isLarge ? styles.bigSpace : styles.smallSpace)} />
  </div>
);

export default Spacer;
