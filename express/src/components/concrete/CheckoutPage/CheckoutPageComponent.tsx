/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, padding, pagestyles } from '@src/styles';

type Props = {
  children: JSX.Element[];
};

const CheckoutPageComponent = ({ children }: Props) => (
  <div>
    <div className={css(pagestyles.relativePosition)}>
      <div className={css(pagestyles.pageContainer, pagestyles.pageContainerAutoWidth, pagestyles.pageContainerChangeableWidthSmall, pagestyles.pageContainerChangeableWidthLarge, pagestyles.pageContainerWithSelectors, padding.leftright_1_5, padding.leftright_3_small)}>
        <div className={css(margin.all_0)}>
          <div className={css(margin.bottom_4)}>
            <div />
          </div>
          <div className={css(pagestyles.row, pagestyles.clearfix)}>
            {children}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CheckoutPageComponent;
