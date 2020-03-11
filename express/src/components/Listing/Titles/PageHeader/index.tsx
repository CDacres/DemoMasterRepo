import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

type Props = {
  title: React.ReactNode;
  trailing?: React.ReactNode;
};

const PageHeader = ({ title, trailing }: Props) => (
  <div className={css(styles.pageHeader)}>
    <span className={css(styles.pageHeaderTitle)}>
      {title}
    </span>
    {trailing}
  </div>
);

export default PageHeader;
