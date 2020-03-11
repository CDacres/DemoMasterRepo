import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

type Props = {
  children: React.ReactNode;
};

const OptionButton = ({ children }: Props) => (
  <div className={css(styles.container)}>
    {children}
  </div>
);

export default OptionButton;
