import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { padding, pagestyles } from '@src/styles';

type Props = {
  children: JSX.Element;
};

const MobileFilterPanelItemInner = ({ children }: Props) => (
  <div className={css(pagestyles.noBottomBorder, padding.topbottom_2)}>
    {children}
  </div>
);

export default MobileFilterPanelItemInner;
