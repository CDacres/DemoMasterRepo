import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { pagestyles } from '@src/styles';

const LinkListComponent = ({ children }) => (
  <div className={css(styles.row, pagestyles.clearfix)}>
    <div className={css(styles.colSm12)}>
      <div
        className={css(styles.container)}
        role="tabpanel"
      >
        {children}
      </div>
    </div>
  </div>
);

export default LinkListComponent;
