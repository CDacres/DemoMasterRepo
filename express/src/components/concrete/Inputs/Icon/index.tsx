import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { padding } from '@src/styles';

type Props = {
  children: JSX.Element;
};

const Icon = ({ children }: Props) => (
  <div className={css(styles.iconWrapper, padding.top_1_5, padding.right_1_5)}>
    {children}
  </div>
);

export default Icon;
