/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin } from '@src/styles';

type Props = {
  bottomMargin?: boolean;
  children: JSX.Element | JSX.Element[];
  topMargin?: boolean;
};

const Block = ({ bottomMargin, children, topMargin }: Props) => (
  <div {...((bottomMargin || topMargin) ? { className: css(bottomMargin && margin.bottom_10, topMargin && margin.top_10) } : {})}>
    {children}
  </div>
);

export default Block;
