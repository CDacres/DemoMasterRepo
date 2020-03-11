import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import trustStyles from '../styles';
import { margin, pagestyles } from '@src/styles';

type Props = {
  icon: object;
  text: string;
  title: string;
};

const TrustSmallItem = ({ icon, text, title }: Props) => (
  <div className={css(margin.top_3, margin.bottom_5)}>
    <div>
      <div className={css(trustStyles.trustIcon, margin.bottom_1_5)}>
        {icon}
      </div>
      <div className={css(pagestyles.text, pagestyles.fontBlack, margin.all_0)}>
        {title}
      </div>
    </div>
    <div>
      {text}
    </div>
  </div>
);

export default TrustSmallItem;
