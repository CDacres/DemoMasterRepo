/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { padding, pagestyles } from '@src/styles';

type Props = {
  children: JSX.Element[];
};

const CheckoutLeftSide = ({ children }: Props) => (
  <div className={css(pagestyles.column, pagestyles.fullColumn, pagestyles.halfColumnSmallScreen, pagestyles.sevenTwelfthsColumnLargeScreen, pagestyles.columnFloat, padding.leftright_1)}>
    <section>
      {children}
    </section>
  </div>
);

export default CheckoutLeftSide;
