import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

type Props = {
  children: React.ReactNode;
  variant?: 'page' | 'overbox';
};

const Container = ({ children, variant }: Props) => {
  switch (variant) {
    default:
      return (
        <div>
          <div className={css(styles.page)}>
            <div className={css(styles.page)}>
              {children}
            </div>
          </div>
        </div>
      );
    case 'overbox':
      return (
        <div>
          <div className={css(styles.overbox)}>
            {children}
          </div>
        </div>
      );
  }
};

export default Container;
