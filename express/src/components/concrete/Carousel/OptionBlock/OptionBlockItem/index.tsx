/* tslint:disable:max-line-length */
import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { padding, pagestyles } from '@src/styles';

type Props = {
  children: JSX.Element | JSX.Element[] | object[];
  isFirst?: boolean;
  isLarge?: boolean;
  isLast?: boolean;
};

const OptionBlockItem = ({ children, isFirst, isLarge, isLast }: Props) => (
  <div className={css(pagestyles.inlineBlock, isLarge ? [padding.top_0_5, padding.leftright_0_75, padding.bottom_1] : padding.leftright_0_5, isFirst ? padding.left_3 : isLast ? padding.right_3 : null)}>
    {children}
  </div>
);

export default OptionBlockItem;
