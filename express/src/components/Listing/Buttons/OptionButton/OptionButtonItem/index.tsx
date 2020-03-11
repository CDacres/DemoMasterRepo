import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

type Props = {
  children: React.ReactNode;
  isLarge?: boolean;
  onClick: VoidFunction;
};

const OptionButtonItem = ({ children, isLarge, onClick }: Props) => (
  <button
    className={css(styles.option, isLarge && styles.large)}
    onClick={onClick}
  >
    <span>
      {children}
    </span>
  </button>
);

export default OptionButtonItem;
