import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import gridStyles from '../styles';
import { padding, pagestyles } from '@src/styles';

type Props = {
  children: JSX.Element | JSX.Element[];
};

const Text = ({ children }: Props) => (
  <div className={css(styles.textGridContainer, pagestyles.column, padding.leftright_1)}>
    <div className={css(styles.cardContainerInner, pagestyles.clearfix, padding.top_1, padding.bottom_1_5)}>
      <div className={css(gridStyles.card)}>
        <div className={css(pagestyles.clearfix)}>
          {children}
        </div>
      </div>
    </div>
  </div>
);

export default Text;
