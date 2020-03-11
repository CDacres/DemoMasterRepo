import * as React from 'react';
import { css } from 'aphrodite/no-important';

// Styles
import styles from './styles';

type Props = {
  children: JSX.Element;
};

const PopupCell = ({ children }: Props) => (
  <div>
    <div className={css(styles.wrapper)}>
      <div>
        {children}
      </div>
    </div>
  </div>
);

export default PopupCell;
