import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

type Props = {
  children: React.ReactNode;
  span: number;
};

const Cell = ({ children, span }: Props) => (
  <div className={css(styles.container, styles[`grid${span}`])}>
    {children}
  </div>
);

export default Cell;
