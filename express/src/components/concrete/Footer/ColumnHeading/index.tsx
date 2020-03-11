import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

type Props = {
  children?: JSX.Element | JSX.Element[];
};

const ColumnHeading = ({ children }: Props) => (
  <div className={css(pagestyles.defaultTitle)}>
    <div className={css(styles.headingInner, margin.all_0, padding.topbottom_0)}>
      {children}
    </div>
  </div>
);

export default ColumnHeading;
