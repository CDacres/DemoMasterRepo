import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from '../styles';

type Props = {
  children: React.ReactNode;
};

const PhotoGridItem = ({ children }: Props) => (
  <div className={css(styles.list)}>
    {children}
  </div>
);

export default PhotoGridItem;
