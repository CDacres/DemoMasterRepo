import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';
import titleStyles from '../styles';
import { margin, padding, pagestyles } from '@src/styles';

// Components
import BrowserLink from '@src/components/abstract/Link';

type Props = {
  href: string;
  text: string;
};

const Badge = ({ href, text }: Props) => (
  <BrowserLink
    className={css(styles.badge)}
    href={href}
  >
    <div className={css(styles.badgeInner, margin.right_1, margin.bottom_1, padding.all_1)}>
      <div className={css(titleStyles.titleWrapper, pagestyles.smallSubtitle, pagestyles.fontMedium, margin.all_0)}>
        {text}
      </div>
    </div>
  </BrowserLink>
);

export default Badge;
