import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, pagestyles } from '@src/styles';

type Props = {
  children: JSX.Element | JSX.Element[];
};

const Label = ({ children }: Props) => (
  <small className={css(pagestyles.block, pagestyles.fontMedium, margin.top_2, margin.bottom_0_5)}>
    {children}
  </small>
);

export default Label;
