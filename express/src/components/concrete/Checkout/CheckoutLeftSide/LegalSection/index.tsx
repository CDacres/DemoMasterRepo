import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import { margin, pagestyles } from '@src/styles';

type Props = {
  text: string;
};

const LegalSection = ({ text }: Props) => (
  <div className={css(margin.top_3)}>
    <div className={css(margin.topbottom_1)}>
      <div className={css(pagestyles.smallText, pagestyles.fontMedium, margin.all_0)}>
        {text}
      </div>
    </div>
  </div>
);

export default LegalSection;
