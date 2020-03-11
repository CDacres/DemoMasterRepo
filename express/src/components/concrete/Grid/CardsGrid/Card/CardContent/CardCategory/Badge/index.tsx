import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import categoryStyles from '../styles';
import { margin, pagestyles } from '@src/styles';

type Props = {
  color: string;
  text: string;
};

const Badge = ({ color, text }: Props) => (
  <div className={css(pagestyles.columnFloat)}>
    <span
      className={css(styles.badge)}
      data-veloute="select-badge"
      style={{ color: color }}
    >
      <span
        className={css(categoryStyles.smallText, margin.all_0)}
        style={{ color: color }}
      >
        <span className={css(styles.badgeChildren)}>
          {text}
        </span>
      </span>
    </span>
  </div>
);

export default Badge;
