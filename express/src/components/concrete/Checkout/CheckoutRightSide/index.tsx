/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

type Props = {
  children: JSX.Element[];
};

const CheckoutRightSide = ({ children }: Props) => (
  <div className={css(pagestyles.column, pagestyles.fullColumn, pagestyles.halfColumnSmallScreen, pagestyles.fiveTwelfthsColumnLargeScreen, pagestyles.columnFloat, padding.leftright_1)}>
    <div className={css(pagestyles.row, pagestyles.clearfix)}>
      <div className={css(styles.inner, pagestyles.column, pagestyles.elevenTwelfthsColumnLargeScreen, padding.leftright_1)}>
        <div>
          <div className={css(styles.content, margin.all_0, padding.leftright_3)}>
            <div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CheckoutRightSide;
