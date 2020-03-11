import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, padding, pagestyles } from '@src/styles';

type Props = {
  title: string;
};

const HeaderTitle = ({ title }: Props) => (
  <div>
    <div className={css(margin.right_4)}>
      <div className={css(pagestyles.textNoWrap)}>
        <div className={css(pagestyles.subtitle, pagestyles.fontBlack, margin.all_0, padding.topbottom_0_25)}>
          {title}
        </div>
      </div>
    </div>
  </div>
);

export default HeaderTitle;
