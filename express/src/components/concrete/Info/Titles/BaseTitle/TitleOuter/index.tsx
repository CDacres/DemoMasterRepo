import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, pagestyles } from '@src/styles';

type Props = {
  children: JSX.Element;
};

const TitleOuter = ({ children }: Props) => (
  <div className={css(pagestyles.text, pagestyles.fontMedium, margin.all_0)}>
    {children}
  </div>
);

export default TitleOuter;
