/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

type Props = {
  children: React.ReactNode;
  stylesArray?: object[];
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
};

const Headings = ({ children, stylesArray, tag }: Props) => (
  <div className={css((tag === 'h1') ? [styles.h1_container, styles.h1] : (tag === 'h2') ? styles.h2 : (tag === 'h3') ? styles.h3 : (tag === 'h4') ? styles.h4 : (tag === 'h5') ? styles.h5 : null, stylesArray)}>
    {children}
  </div>
);

export default Headings;
