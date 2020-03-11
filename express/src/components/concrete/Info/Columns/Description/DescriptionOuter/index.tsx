import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin } from '@src/styles';

type Props = {
  children: JSX.Element;
};

const DescriptionOuter = ({ children }: Props) => (
  <div>
    <div className={css(margin.top_2)}>
      {children}
    </div>
  </div>
);

export default DescriptionOuter;
