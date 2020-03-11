import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, pagestyles } from '@src/styles';

type Props = {
  title: string;
};

const CardTitle = ({ title }: Props) => (
  <div className={css(margin.top_0_5)}>
    <div className={css(styles.cardTitleContainer, pagestyles.textMap)}>
      <div className={css(styles.cardTitle)}>
        {title}
      </div>
    </div>
  </div>
);

export default CardTitle;
