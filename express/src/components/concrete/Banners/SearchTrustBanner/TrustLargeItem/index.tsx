import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import trustStyles from '../styles';
import { margin, padding, pagestyles } from '@src/styles';

type Props = {
  icon: object;
  text: string;
  title: string;
};

const TrustLargeItem = ({ icon, text, title }: Props) => (
  <div className={css(pagestyles.column, pagestyles.thirdColumn, pagestyles.columnFloat, padding.leftright_1_5)}>
    <div className={css(margin.bottom_1)}>
      <div className={css(styles.trustLargeContainer)}>
        <div>
          <div className={css(trustStyles.trustIcon, margin.bottom_1_5)}>
            {icon}
          </div>
          <div className={css(pagestyles.subtitle, pagestyles.fontBlack, margin.all_0)}>
            {title}
          </div>
        </div>
      </div>
    </div>
    <div className={css(styles.trustLargeContainer)}>
      <div className={css(styles.trustLargeText)}>
        {text}
      </div>
    </div>
  </div>
);

export default TrustLargeItem;
