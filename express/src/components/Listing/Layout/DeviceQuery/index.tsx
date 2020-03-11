import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

type Props = {
  children: React.ReactNode;
  variant: 'small' | 'smallMedium' | 'medium' | 'mediumLarge' | 'large' ;
};

const DeviceQuery = ({ children, variant }: Props) => (
  <div className={css(styles[variant])}>
    {children}
  </div>
);

export default DeviceQuery;
