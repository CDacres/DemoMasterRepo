/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, padding, pagestyles } from '@src/styles';

type Props = {
  children: JSX.Element | JSX.Element[];
};

const Section = ({ children }: Props) => (
  <div>
    <div>
      <div className={css(pagestyles.pageContainer, pagestyles.pageContainerAutoWidth, pagestyles.pageContainerChangeableWidthSmall, pagestyles.pageContainerChangeableWidthLarge, padding.leftright_3)}>
        <div className={css(margin.all_0)}>
          {children}
        </div>
      </div>
    </div>
  </div>
);

export default Section;
