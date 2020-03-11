import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, pagestyles } from '@src/styles';

type Props = {
  children: JSX.Element | JSX.Element[];
  hasHiddenFont?: boolean;
};

const SectionInner = ({ children, hasHiddenFont }: Props) => (
  <React.Fragment>
    {hasHiddenFont &&
      <span className={css(pagestyles.hideFont)} />
    }
    <div>
      <div className={css(margin.bottom_6, margin.bottom_6_small, margin.bottom_8_large)}>
        {children}
      </div>
    </div>
  </React.Fragment>
);

export default SectionInner;
