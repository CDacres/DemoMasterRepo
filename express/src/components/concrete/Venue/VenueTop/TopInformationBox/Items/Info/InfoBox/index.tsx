import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

type Props = {
  description: string;
  icon: string;
  title: string;
};

const InfoBox = ({ description, icon, title }: Props) => (
  <div className={css(styles.wrapper, pagestyles.halfColumn, margin.top_2, padding.right_3)}>
    <div className={css(styles.title, pagestyles.text, margin.all_0)}>
      {icon}
    </div>
    <div className={css(margin.top_1)}>
      <div className={css(styles.title, pagestyles.smallText, margin.all_0)}>
        {title}
      </div>
      <div className={css(styles.description, pagestyles.smallText, margin.all_0)}>
        {description}
      </div>
    </div>
  </div>
);

export default InfoBox;
