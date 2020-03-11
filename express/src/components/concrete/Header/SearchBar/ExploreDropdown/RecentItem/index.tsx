import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import { Clock } from '@src/components/concrete/Icons/svgs';

type Props = {
  index: number;
  subtitle: string;
  title: string;
};

const RecentItem = ({ index, subtitle, title }: Props) => (
  <li
    aria-selected="false"
    className={css(styles.itemWrapper, padding.topbottom_1_5, padding.leftright_3, padding.left_4_small)}
    id={`search_recent_${index}`}
    role="option"
    tabIndex={-1}
  >
    <div className={css(pagestyles.tableCellTop, padding.right_1_5, padding.top_0_5)}>
      <Clock stylesArray={[pagestyles.icon]} />
    </div>
    <div className={css(pagestyles.fullColumn, pagestyles.tableCellTop)}>
      <div className={css(pagestyles.smallText, pagestyles.fontMedium, margin.all_0)}>
        {title}
      </div>
      <div className={css(pagestyles.smallText, margin.all_0)}>
        {subtitle}
      </div>
    </div>
  </li>
);

export default RecentItem;
