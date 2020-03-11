import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, padding } from '@src/styles';

type Props = {
  children: JSX.Element | JSX.Element[] | Array<string | JSX.Element | JSX.Element[]>;
};

const BodyText = ({ children }: Props) => (
  <div className={css(margin.all_0, padding.topbottom_0)}>
    {children}
  </div>
);

export default BodyText;
