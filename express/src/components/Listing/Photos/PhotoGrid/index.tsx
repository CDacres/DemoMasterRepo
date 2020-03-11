import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

type Props = {
  children: React.ReactNode;
};

const PhotoGrid = ({ children }: Props) => (
  <div className={css(styles.list, styles.grid)}>
    {children}
  </div>
);

export default PhotoGrid;
